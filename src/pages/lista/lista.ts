import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  teste: any;
  path: any = "meusDados/"
  busca: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pegaDados();
  }

  pegaDados() {
    let banco = firebase.database().ref('meusDados/respostas');
    banco.once('value', function(result) {
      result.forEach(function(resultado) {
        let childKey = resultado.key;
        let childValue = resultado.val();
        console.log("Key" + childKey);
        console.log("Valor: " + childValue);
      })
    })
  }

}
