import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaPage } from '../lista/lista';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerguntasPage');
  }

  respostaSim() {
    localStorage.setItem(pergunta1, "s");
    let resposta1 = localStorage.getItem(pergunta1);
    console.log(resposta1);
  }

  respostaNao() {
    localStorage.setItem(pergunta1, "n");
    let resposta1 = localStorage.getItem(pergunta1);
    console.log(resposta1);
  }

  goLista() {
    this.navCtrl.push(ListaPage);
  }
}
