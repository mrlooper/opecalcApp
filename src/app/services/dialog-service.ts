import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AlertInput } from '@ionic/core';


@Injectable()
export class DialogService {

    private isLoading = false;
    private loading;
    private loadingP;
    private alert;

    constructor(private alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController
    ) { }

    async presentAlert(titulo, texto, cb_aceptar = null) {
        let alert = await this.alertCtrl.create({
            header: titulo,
            message: texto,
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => {
                        cb_aceptar && cb_aceptar();
                    }
                }
            ]
        });

        return await alert.present();
    }

    async presentConfirm(titulo, texto, cb_aceptar = null, cb_cancelar = null) {
        let alert = await this.alertCtrl.create({
            header: titulo,
            message: texto,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        cb_cancelar && cb_cancelar();
                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        cb_aceptar && cb_aceptar();
                    }
                }
            ]
        });

        return await alert.present();
    }

    async presentToast(texto) {
        let toast = await this.toastCtrl.create({
            message: texto,
            duration: 3000
        });


        return await toast.present();
    }

    async presentLoading(mensaje) {
        this.isLoading = true;
        console.log('Presenting...');
        return await this.loadingCtrl.create({
            message: mensaje,
            duration: 5000,
        }).then(a => {
            a.present().then(() => {
                console.log('presented');
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });
    }

    async dimissLoading() {
        this.isLoading = false;
        return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }

    async presentDiasReparto(cb = null) {
        let cb_aceptar = cb;
        let inputs: Array<AlertInput> = [
            {
                type: 'checkbox',
                label: 'Lunes',
                value: 'l',
                checked: true
            },
            {
                type: 'checkbox',
                label: 'Martes',
                value: 'm',
                checked: true
            },
            {
                type: 'checkbox',
                label: 'Miércoles',
                value: 'x',
                checked: true
            },
            {
                type: 'checkbox',
                label: 'Jueves',
                value: 'j',
                checked: true
            },
            {
                type: 'checkbox',
                label: 'Viernes',
                value: 'v',
                checked: true
            },
            {
                type: 'checkbox',
                label: 'Sabado',
                value: 's',
                checked: true
            },
            {
                type: 'checkbox',
                label: 'Domingo',
                value: 'd',
                checked: true
            }
        ];
        let buttons = [
            {
                text: 'Cancelar',
                role: 'cancel'
            },
            {
                text: 'Aceptar',
                handler: (data: any) => {
                    let dias = {
                        'l': data.indexOf('l') >= 0,
                        'm': data.indexOf('m') >= 0,
                        'x': data.indexOf('x') >= 0,
                        'j': data.indexOf('j') >= 0,
                        'v': data.indexOf('v') >= 0,
                        's': data.indexOf('s') >= 0,
                        'd': data.indexOf('d') >= 0
                    };

                    cb_aceptar && cb_aceptar(dias);
                }
            }
        ];

        let alert = await this.alertCtrl.create({
            header: 'Días de reparto',
            cssClass: 'alert-dias-reparto',
            inputs: inputs,
            buttons: buttons
        });

        return await alert.present();
    }

    async presentAvisoProductoPeriodico(cb = null) {
        let cb_aceptar = cb;
        let inputs: Array<AlertInput> = [
            {
                type: 'checkbox',
                label: 'No mostrar más',
                value: 'ocultar',
                checked: false
            }
        ];
        let buttons = [
            {
                text: 'Cancelar',
                role: 'cancel'
            },
            {
                text: 'Aceptar',
                handler: (data: any) => {
                    cb_aceptar && cb_aceptar(data);
                }
            }
        ];

        let alert = await this.alertCtrl.create({
            header: 'Producto periódico',
            cssClass: 'alert-producto-periodico',
            message: 'Este producto se puede programar para pedirlo automáticamente los días que usted desee',
            inputs: inputs,
            buttons: buttons
        });

        return await alert.present();
    }
}
