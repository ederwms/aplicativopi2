import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  teste: any;
  path: any = "meusDados/"

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pegaDados();
  }

  pegaDados() {
    
  }

}
