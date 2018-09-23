import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PerguntasPage } from '../perguntas/perguntas';

import { AngularFireDatabase } from 'angularfire2/database'
import { ListaPage } from '../lista/lista';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrData = [];
  destino: any;
  private path: string = "meusDados/";

  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.fdb.list("/meusDados/").subscribe(_data => {
      this.arrData = _data;

      //console.log(this.arrData)
    })
  }

  perguntas() {
    this.fdb.list(this.path + "destinos").push(this.destino)
    this.navCtrl.push(PerguntasPage);
  }

  goLista() {
    this.navCtrl.push(ListaPage);
  }

}
