import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let pergunta1: any = "1";

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  primeiraPergunta: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pegaDados();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
  }

  pegaDados() {
    this.primeiraPergunta = localStorage.getItem(pergunta1);
  }

}
