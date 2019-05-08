import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FcmService {

    public token: string;

    constructor(private firebase: Firebase,
        private afs: AngularFirestore,
        private platform: Platform) {
            this.token = '';
        }

    async getToken() {

        if (this.platform.is('android')) {
            this.token = await this.firebase.getToken();
        }

        if (this.platform.is('ios')) {
            this.token = await this.firebase.getToken();
            await this.firebase.grantPermission();
        }

        console.log('Token FCM: ' + this.token);
        this.saveToken(this.token);
    }

    private saveToken(token) {
        if (!token) { return; }

        const devicesRef = this.afs.collection('devices');

        const data = {
            token,
            userId: 'testUserId'
        };

        return devicesRef.doc(token).set(data);
    }

    onNotifications() {
        return this.firebase.onNotificationOpen();
    }
}
