import { Injectable } from '@angular/core';

import {
    AdMobFree,
    AdMobFreeBannerConfig,
    AdMobFreeInterstitialConfig,
    AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';
import { AppSettings } from './app-settings';


@Injectable()
export class AdmobFreeService {

    // Interstitial Ad's Configurations
    interstitialConfig: AdMobFreeInterstitialConfig = {
        //  add your config here
        //  for the sake of this example we will just use the test config
        isTesting: AppSettings.ADMOB_TESTING,
        autoShow: false,
        id: AppSettings.ADMOB_INTERSITIAL_ID
    };

    constructor(
        private admobFree: AdMobFree,
        public platform: Platform
    ) {

        if (!AppSettings.SHOW_ADS) {
            console.warn('Ads disabled');
            return;
        }

        platform.ready().then(() => {

            //  Load ad configuration
            this.admobFree.interstitial.config(this.interstitialConfig);
            // Prepare Ad to Show
            this.admobFree.interstitial.prepare()
                .then(() => {
                    console.log('Intersitial ad ready');
                }).catch(e => console.log(e));

        });

        // Handle interstitial's close event to Prepare Ad again
        this.admobFree.on('admob.interstitial.events.CLOSE').subscribe(() => {
            this.admobFree.interstitial.prepare()
                .then(() => {
                    console.log('Interstitial CLOSE');
                }).catch(e => console.log(e));
        });

    }

    BannerAd() {
        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: AppSettings.ADMOB_TESTING, //  Remove in production
            autoShow: true,
            id: AppSettings.ADMOB_BANNER_ID
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare().then(() => {
            //  success
        }).catch(e => console.log(e));
    }

    InterstitialAd() {
        // Check if Ad is loaded
        this.admobFree.interstitial.isReady().then(() => {
            // Will show prepared Ad
            this.admobFree.interstitial.show().then(() => {
            })
                .catch(e => console.log('show ' + e));
        })
            .catch(e => console.log('isReady ' + e));
    }

}
