import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerguntasPage } from '../pages/perguntas/perguntas';
import { ListaPage } from '../pages/lista/lista';
import { IntroPage } from '../pages/intro/intro';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


var config = {
  apiKey: "AIzaSyC2G2zXMuDjhkfe1Vfq5gbWRNbOgU0l9TM",
  authDomain: "projetopi2-unipam.firebaseapp.com",
  databaseURL: "https://projetopi2-unipam.firebaseio.com",
  projectId: "projetopi2-unipam",
  storageBucket: "projetopi2-unipam.appspot.com",
  messagingSenderId: "928373403336"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerguntasPage,
    ListaPage, 
    IntroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PerguntasPage,
    ListaPage, 
    IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
