import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the PerguntasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let pergunta1: any = "1";

@IonicPage()
@Component({
  selector: 'page-perguntas',
  templateUrl: 'perguntas.html',
})
export class PerguntasPage {

  arrData = []
  resposta

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
  
    this.fdb.list("/meusDados/").subscribe(_data => {
      this.arrData = _data;

      console.log(this.arrData)
    })
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerguntasPage');
  }

  respostaSim() {
    this.resposta = 's'
    this.fdb.list("/meusDados/perguntas/").push(this.resposta)
  }

  respostaNao() {
    this.resposta = 'n'
    this.fdb.list("/meusDados/perguntas/").push(this.resposta)
  }

  goLista() {
    this.navCtrl.push(ListaPage);
  }
}
