import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  teste: any;
  path: any = "meusDados/"

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
    this.pegaDados();
  }

  pegaDados() {
    this.fdb.list(this.path + 'destinos').subscribe(data => {
      this.teste = data.map(item => item);
      //console.log(this.teste);
    });
  }

}
