import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home'
import { IntroPage } from '../pages/intro/intro';
import { FbauthPage } from '../pages/fbauth/fbauth'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = IntroPage;
  mostrou: any = localStorage.getItem("mostrouIntro");

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private screenOrientation: ScreenOrientation) {
    localStorage.setItem("mostrouIntro", 's');


    var user = firebase.auth().currentUser;

    if (user) {
      this.rootPage = HomePage;
    } else {
      if (this.mostrou == 's') {
        this.rootPage = FbauthPage;
      }
      else {
        this.rootPage = IntroPage;
      }

    }

  //  this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);

    platform.ready().then(() => {
   //   splashScreen.show();
     // statusBar.styleDefault();
     // splashScreen.hide();
    });
  }
}

