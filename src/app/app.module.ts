import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerguntasPage } from '../pages/perguntas/perguntas';
import { ListaPage } from '../pages/lista/lista';
import { IntroPage } from '../pages/intro/intro';
import { FbauthPage } from '../pages/fbauth/fbauth';

import firebase from 'firebase';
import { HttpClientModule } from '@angular/common/http';


var config = {
  apiKey: "AIzaSyC2G2zXMuDjhkfe1Vfq5gbWRNbOgU0l9TM",
  authDomain: "projetopi2-unipam.firebaseapp.com",
  databaseURL: "https://projetopi2-unipam.firebaseio.com",
  projectId: "projetopi2-unipam",
  storageBucket: "projetopi2-unipam.appspot.com",
  messagingSenderId: "928373403336"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerguntasPage,
    ListaPage, 
    IntroPage,
    FbauthPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PerguntasPage,
    ListaPage, 
    IntroPage,
    FbauthPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScreenOrientation
  ]
})
export class AppModule {}
