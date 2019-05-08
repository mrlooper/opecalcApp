import { EventEmitter, Injectable, Output } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { BPEvent } from '../classes/bpevent';
import { AppSettings } from './app-settings';
import { DialogService } from './dialog-service';


/*
  Generated class for the BuzonpackService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({ providedIn: 'root' })
export class MainService {
    public did: string; /* Device ID */
    public cid: string; /* Client ID */
    public datos_usuario = null;
    public argsQueue: Array<any>;

    @Output() eventos: EventEmitter<BPEvent> = new EventEmitter();

    constructor(private uniqueDeviceID: UniqueDeviceID,
        private storage: Storage,
        private http: HttpClient,
        public loadingCtrl: LoadingController,
        public dlgService: DialogService
    ) {

        console.log('Inicializando servicio MainService');
        this.argsQueue = [];

        /* Cargamos datos almacenados */
        this.cargar_datos();

        // this.cargar_categorias();

        this.uniqueDeviceID.get()
            .then((uuid: any) => console.log(uuid))
            .catch((error: any) => {
                console.log(error);
                // this.generar_DID();
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

            /* Generamos DID si no lo tenemos */
            if (!did) {
                this.generar_DID();
            }

            /* Referencias locales */
            this.cid = cid;
            this.did = did;

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

    api_obtener_plantillas_usuario(cb = null, mostrar_dialogo = true) {
        this.http_post_api('obtener-plantillas-usuario', {
            'cid': this.cid
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

}
