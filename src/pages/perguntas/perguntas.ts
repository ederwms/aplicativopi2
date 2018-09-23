import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-perguntas',
  templateUrl: 'perguntas.html',
})
export class PerguntasPage {

  arrData = []
  resposta: any;
  private path: string = "meusDados/";

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
  
    this.fdb.list(this.path).subscribe(_data => {
      this.arrData = _data;

      //console.log(this.arrData)
    })
  
  }

  respostaSim() {
    this.resposta = 'sim'
    this.fdb.list(this.path + "respostas/").push(this.resposta)
  }

  respostaNao() {
    this.resposta = 'nao'
    this.fdb.list(this.path + "respostas/").push(this.resposta)
  }

  goLista() {
    this.navCtrl.push(ListaPage);
  }
}
