import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerguntasPage } from '../perguntas/perguntas';

import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrData = []
  destino

  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.fdb.list("/meusDados/").subscribe(_data => {
      this.arrData = _data;

      console.log(this.arrData)
    })
  }

  perguntas() {
    this.fdb.list("/meusDados/perguntas/destino").push(this.destino)
    this.navCtrl.push(PerguntasPage);
  }

}
