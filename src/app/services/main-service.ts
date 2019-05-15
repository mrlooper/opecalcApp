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

    @Output() eventos: EventEmitter<BPEvent> = new EventEmitter();

    constructor(private uniqueDeviceID: UniqueDeviceID,
        private storage: Storage,
        private http: HttpClient,
        public loadingCtrl: LoadingController,
        public dlgService: DialogService,
        public fcmService: FcmService
    ) {

        console.log('Inicializando servicio MainService');
        this.argsQueue = [];
        this.pageArgs = new PageArgs();

        /* Cargamos datos almacenados */
        this.cargar_datos();

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
                    })
                    .catch((error: any) => {
                        console.log(error);
                        this.generar_DID();
                    });
            }

        });

        return;
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
            'cid': this.did,
            'fcmtk': this.fcmService.token
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_alta_plantilla_usuario(id_examen, nombre, cb = null, mostrar_dialogo = true) {
        let args = {
            'cid': this.did,
            'fcmtk': this.fcmService.token,
            'id-examen': id_examen,
            'nombre': nombre
        };

        this.http_post_api('alta-plantilla-usuario', args, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_calculadoras(cb = null, mostrar_dialogo = true) {
        let args = {
            'cid': this.did,
            'fcmtk': this.fcmService.token
        };

        this.http_post_api('obtener-calculadoras', args, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_examenes(id_especialidad = null, cb = null, mostrar_dialogo = true) {
        let args = {
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

    api_obtener_opes(id_administracion = null, cb = null, mostrar_dialogo = true) {
        let args = {
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

    api_obtener_plantilla_usuario(id_plantilla, cb = null, mostrar_dialogo = true) {
        this.http_post_api('obtener-plantilla-usuario', {
            'cid': this.did,
            'fcmtk': this.fcmService.token,
            'id-plantilla': id_plantilla
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_plantillas_usuario(cb = null, mostrar_dialogo = true) {
        this.http_post_api('obtener-plantillas-usuario', {
            'cid': this.did,
            'fcmtk': this.fcmService.token
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_obtener_tipos_acceso(cb = null, mostrar_dialogo = true) {
        this.http_post_api('obtener-tipos-acceso', {
            'cid': this.did,
            'fcmtk': this.fcmService.token
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    isNormalInteger(str) {
        return /^\+?(0|[1-9]\d*)$/.test(str);
    }
}
