import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerguntasPage } from '../perguntas/perguntas';

import { ListaPage } from '../lista/lista';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrData = [];
  destino: any;

  constructor(public navCtrl: NavController) {
    
  }

  perguntas() {
    this.navCtrl.push(PerguntasPage);
  }

  goLista() {
    this.navCtrl.push(ListaPage);
  }

}
