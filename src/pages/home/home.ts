import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PerguntasPage } from '../perguntas/perguntas';

import { ListaPage } from '../lista/lista';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  destino: any;
  myDate: any;

  constructor(public navCtrl: NavController, public alertControl: AlertController) {

  }

  perguntas() {
    if ((this.destino == '') || (this.myDate == null)) {
      let alerta = this.alertControl.create({
        title: 'Erro',
        message: 'Por favor, preencha todos os campos.',
        buttons: ['OK']
      });

      alerta.present();
    }
    else {
      localStorage.setItem('destino', this.destino);
      localStorage.setItem('data', this.myDate);
      this.navCtrl.push(PerguntasPage);
    }
  }

  goLista() {
    this.navCtrl.push(ListaPage);
  }

}
