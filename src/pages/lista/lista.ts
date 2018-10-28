import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { createElement } from '@angular/core/src/view/element';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  teste: any;
  path: any = "meusDados/"
  busca: any;
  userId: string = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pegaDados();
    this.escreveLista();
  }

  pegaDados() {
    console.log(this.userId)
    var proBanco = firebase.database().ref('meusDados/respostas/' + this.userId + '/lista')
    firebase.database().ref('meusDados/respostas/' + this.userId).once('value', function(snap){
      var pergunta = snap.val()
      if (pergunta.esportes == 'sim')
        proBanco.update({esportes: 'Equipamentos esportivos'})
      else
        proBanco.update({esportes: null})

      if (pergunta.parqueAq == 'sim')
        proBanco.update({parqueAq:'Roupa de banho'})
      else
        proBanco.update({parqueAq: null})

      if (pergunta.passeioN == 'sim')
        proBanco.update({passeioN:'Roupa de passeio'})
      else
        proBanco.update({passeioN: null})
      
      if (pergunta.trabalho == 'sim')
        proBanco.update({trabalho:'Roupa social'})
      else
        proBanco.update({trabalho: null})
    })
  }

  escreveLista() {
    firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').on('child_added', function(snap){
      const li = document.createElement("li")
      li.innerText = snap.val()
      document.getElementById("lista").appendChild(li);
    })
  }

}
