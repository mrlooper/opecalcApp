import { EventEmitter, Injectable, Output } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { BPEvent } from '../classes/bpevent';
import { AppSettings } from './app-settings';
import { DialogService } from './dialog-service';
import { FcmService } from './fcm.service';
import { PageArgs } from '../classes/page-args';
import { AdmobFreeService } from '../services/admobfree.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Mensaje } from '../classes/mensaje';
import { Market } from '@ionic-native/market/ngx';
import { Platform } from 'ionic-angular';



/*
  Generated class for the BuzonpackService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({ providedIn: 'root' })
export class MainService {
    public did: string; /* Device ID */
    public cid: string; /* Client ID */
    public fcmToken: string; /* Token FCM */
    public datos_usuario = null;
    public argsQueue: Array<any>;
    public pageArgs: PageArgs;
    public ts_intersitial_ad: number;
    public version: string;
    public mensajes: Array<Mensaje>;
    public num_mensajes_pendientes;

    @Output() eventos: EventEmitter<BPEvent> = new EventEmitter();

    constructor(private uniqueDeviceID: UniqueDeviceID,
        private storage: Storage,
        private http: HttpClient,
        public loadingCtrl: LoadingController,
        public dlgService: DialogService,
        public fcmService: FcmService,
        private admobFreeService: AdmobFreeService,
        private appVersion: AppVersion,
        private market: Market,
        private platform: Platform,
    ) {

        console.log('Inicializando servicio MainService');
        this.ts_intersitial_ad = 0;
        this.argsQueue = [];
        this.pageArgs = new PageArgs();
        this.mensajes = [];
        this.num_mensajes_pendientes = 0;

        /* Cargamos datos almacenados */
        this.cargar_datos();

        /* Version */
        this.version = '-';
        this.appVersion.getVersionNumber().then(version => {
            this.version = version;
            console.log('APP-VERSION-NUMBER-LOCAL: ' + version);

            this.api_obtener_version_apk((data) => {
                let version_rem = data.version;
                let comp = this.compararVersiones(this.version, version_rem);

                console.log('APP-VERSION-NUMBER-REMOTA: ' + version_rem);

                if (comp < 0) {
                    this.dlgService.presentConfirm('Actualizar version', 'Hay una nueva version ¿Desea actualizar?', () => {
                        this.gotoMarket();
                    });
                }
            }, false);

        });

    }

    nuevoEvento(evento) {
        this.eventos.emit(evento);
    }

    generar_DID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        this.did = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

        console.log('Generando DID: ' + this.did);

        this.storage.set('did', this.did);
    }

    set_cid(cid) {
        this.cid = cid;
        this.storage.set('cid', cid);
        this.cargar_perfil_cliente();
        console.log('Seteando CID=' + cid);
    }

    cargar_datos() {
        console.log('Cargando datos desde almacenamiento');

        let p_did = this.storage.get('did');
        let p_cid = this.storage.get('cid');

        let did, cid;

        Promise.all([
            p_did,
            p_cid
        ]).then((vals) => {
            [did, cid] = vals;

            /* Referencias locales */
            this.cid = cid;
            this.did = did;

            /* Generamos DID si no lo tenemos */
            if (!did) {
                this.uniqueDeviceID.get()
                    .then((uuid: any) => {
                        console.log('Device UUID: ' + uuid);
                        this.did = uuid;
                        this.didListo();
                    })
                    .catch((error: any) => {
                        console.log(error);
                        this.generar_DID();
                        this.didListo();
                    });
            } else {
                this.didListo();
            }

        });

        return;
    }

    cargar_mensajes(cb = null) {
        this.api_obtener_mensajes((data) => {
            if (data.codigo == 0) {
                let i: number;
                let m: Mensaje;

                this.mensajes = [];
                this.num_mensajes_pendientes = 0;
                for (i = 0; i < data.mensajes.length; i++) {
                    m = new Mensaje();
                    m.cargarJson(data.mensajes[i]);
                    this.mensajes.push(m);

                    if (m.pendiente) {
                        this.num_mensajes_pendientes++;
                    }
                }

                cb && cb(this.mensajes);
            } else {
                console.error('Error cargando mensajes: ' + data.desc);
            }
        });
    }

    cargar_perfil_cliente(cb = null) {
    }

    usuario_registrado() {
        return this.cid != null;
    }

    private http_post_api(method, params, cb, mostrar_dialogo = true) {
        const url = AppSettings.API_URL + method;

        /* Dialogo espera */
        mostrar_dialogo && this.dlgService.presentLoading('Realizando operación...');

        this.http
            .post(url, params)
            .subscribe(data => { this.dlgService.dimissLoading(); cb(data); },
                error => {
                    this.dlgService.dimissLoading();
                    this.dlgService.presentToast('Se produjo un error inesperado');
                });
    }

    api_actualizar_plantilla_usuario(id_plantilla, preguntas, cb = null, mostrar_dialogo = true) {
        this.http_post_api('actualizar-plantilla-usuario', {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token,
            'id-plantilla': id_plantilla,
            'preguntas': preguntas
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_administraciones(cb = null, mostrar_dialogo = true) {
        this.http_post_api('obtener-administraciones', {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_alta_plantilla_usuario(id_examen, nombre, cb = null, mostrar_dialogo = true) {
        let args = {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token,
            'id-examen': id_examen,
            'nombre': nombre
        };

        this.http_post_api('alta-plantilla-usuario', args, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_leer_mensaje(id_mensaje, cb = null, mostrar_dialogo = true) {
        let args = {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token,
            'id-mensaje': id_mensaje
        };

        this.http_post_api('leer-mensaje', args, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_calculadoras(cb = null, mostrar_dialogo = true) {
        let args = {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token
        };

        this.http_post_api('obtener-calculadoras', args, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_examenes(id_especialidad = null, cb = null, mostrar_dialogo = true) {
        let args = {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token
        };

        if (id_especialidad) {
            args['id-especialidad'] = id_especialidad;
        }

        this.http_post_api('obtener-examenes', args, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_especialidades(id_ope = null, tipo_acceso = null, cb = null, mostrar_dialogo = true) {
        let args = {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token
        };

        if (id_ope) {
            args['id-ope'] = id_ope;
        }
        if (tipo_acceso) {
            args['tipo-acceso'] = tipo_acceso;
        }

        this.http_post_api('obtener-especialidades', args, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_mensajes(cb = null, mostrar_dialogo = true) {
        let args = {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token
        };

        this.http_post_api('obtener-mensajes', args, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_opes(id_administracion = null, cb = null, mostrar_dialogo = true) {
        let args = {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token
        };

        if (id_administracion) {
            args['id-administracion'] = id_administracion;
        }

        this.http_post_api('obtener-opes', args, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_plantilla(id_plantilla, cb = null, mostrar_dialogo = true) {
        this.http_post_api('obtener-plantilla', {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token,
            'id-plantilla': id_plantilla
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_plantilla_usuario(id_plantilla, cb = null, mostrar_dialogo = true) {
        this.http_post_api('obtener-plantilla-usuario', {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token,
            'id-plantilla': id_plantilla
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_plantillas_usuario(cb = null, mostrar_dialogo = true) {
        this.http_post_api('obtener-plantillas-usuario', {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_tipos_acceso(cb = null, mostrar_dialogo = true) {
        this.http_post_api('obtener-tipos-acceso', {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_version_apk(cb = null, mostrar_dialogo = true) {
        this.http_post_api('obtener-version-apk', {
            'version': this.version,
            'cid': this.did,
            'fcmtk': this.fcmService.token
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    isNormalInteger(str) {
        return /^\+?(0|[1-9]\d*)$/.test(str);
    }

    showBanner() {
        console.log('Mostrando Banner');
        this.admobFreeService.BannerAd();
    }

    showInterstitial() {
        console.log('Mostrando Intersitial');
        this.admobFreeService.InterstitialAd();
    }

    showAds() {

        if (AppSettings.SHOW_ADS) {
            let diff: number;
            let ts_now: number;

            ts_now = Math.floor(Date.now() / 1000);
            diff = ts_now - this.ts_intersitial_ad;

            if (diff > AppSettings.TIME_BETWEEN_INTERSITIALAD) {
                this.showInterstitial();
                this.ts_intersitial_ad = ts_now;
            } else {
                console.log('Tiempo desde el ultimo intersitial ad insuficiente: ' + diff + 's');
                this.showBanner();
            }
        } else {
            console.warn('Anuncios desactivados');
        }

    }

    private didListo() {
        console.log('DID LISTO!');
        this.cargar_mensajes();
    }

    private gotoMarket() {
        let appId = 'com.survoz.opecalc';

        if (this.platform.is('android')) {
            this.market.open(appId);
        } else {
            // TODO: Añadir id IOS
            this.market.open('id123456789');
        }

    }


    compararVersiones(v1, v2, options = null) {
        let lexicographical = options && options.lexicographical,
            zeroExtend = options && options.zeroExtend,
            v1parts = v1.split('.'),
            v2parts = v2.split('.');

        function isValidPart(x) {
            return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
        }

        if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
            return NaN;
        }

        if (zeroExtend) {
            while (v1parts.length < v2parts.length) v1parts.push('0');
            while (v2parts.length < v1parts.length) v2parts.push('0');
        }

        if (!lexicographical) {
            v1parts = v1parts.map(Number);
            v2parts = v2parts.map(Number);
        }

        for (let i = 0; i < v1parts.length; ++i) {
            if (v2parts.length == i) {
                return 1;
            }

            if (v1parts[i] == v2parts[i]) {
                continue;
            }
            else if (v1parts[i] > v2parts[i]) {
                return 1;
            }
            else {
                return -1;
            }
        }

        if (v1parts.length != v2parts.length) {
            return -1;
        }

        return 0;
    }
}
