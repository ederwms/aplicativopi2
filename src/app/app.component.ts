import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroPage;
  mostrou: any = localStorage.getItem("mostrouIntro");

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    localStorage.setItem("mostrouIntro", 's');

    if(this.mostrou == 's') {
      this.rootPage = HomePage;
    }
    else {
      this.rootPage = IntroPage;
    }
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.show();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

