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
  newItem: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pegaDados();
    this.escreveLista();
  }

  pegaDados() {
    console.log(this.userId)
    firebase.database().ref('meusDados/respostas/' + this.userId + '/lista').set({esportes: null})
    var novoItemKey = firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').push();
    var proBanco = firebase.database().ref('meusDados/respostas/' + this.userId + '/lista')
    firebase.database().ref('meusDados/respostas/' + this.userId).once('value', function(snap){
      var pergunta = snap.val()
      if (pergunta.esportes == 'sim')
        proBanco.update({[novoItemKey.key]: 'Camisa regata'})

      if (pergunta.parqueAq == 'sim')
        proBanco.update({[novoItemKey.key]:'Roupa de banho'})


      if (pergunta.passeioN == 'sim')
        proBanco.update({[novoItemKey.key]:'Roupa de passeio'})

      
      if (pergunta.trabalho == 'sim')
        proBanco.update({[novoItemKey.key]:'Roupa social'})
      
    })
  }

  escreveLista() {
    firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').on('child_added', function(snap){
      const li = document.createElement("li");
      li.innerText = snap.val()
      li.id = snap.key;
      document.getElementById("lista").appendChild(li);
    })

    firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').on('child_changed', function(snap){
      const liAlterou = document.getElementById(snap.key)
      liAlterou.innerText = snap.val()
    })
    firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').on('child_removed', function(snap){
      const liRemovida = document.getElementById(snap.key)
      liRemovida.remove();
    })
  }

  adicionarItem() {
    var novoItemKey = firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').push().key;
    firebase.database().ref('meusDados/respostas/' + this.userId + '/lista').update({
      [novoItemKey]: this.newItem,
    })
    console.log(this.newItem)
    this.newItem = null
  }

}
