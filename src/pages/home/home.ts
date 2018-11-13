import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerguntasPage } from '../perguntas/perguntas';

import { ListaPage } from '../lista/lista';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  destino: any;
  myDate: any;

  constructor(public navCtrl: NavController) {
    
  }

  perguntas() {
    localStorage.setItem('destino', this.destino);
    localStorage.setItem('data', this.myDate);
    this.navCtrl.push(PerguntasPage);
  }

  goLista() {
    this.navCtrl.push(ListaPage);
  }

}
