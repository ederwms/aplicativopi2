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
    firebase.database().ref('meusDados/respostas/' + this.userId + '/lista').set({esportes: null})
    var novoItemKey = firebase.database().ref('meusDados/respostas/' + this.userId).child('lista');
    var proBanco = firebase.database().ref('meusDados/respostas/' + this.userId + '/lista')
    firebase.database().ref('meusDados/respostas/' + this.userId).once('value', function(snap){
      var pergunta = snap.val()
      if (pergunta.esportes == 'sim')
        proBanco.update({
          [novoItemKey.push().key]: 'Camisa regata',
          [novoItemKey.push().key]: 'Shorts',
          [novoItemKey.push().key]: 'Tênis para esportes',
      })

      if (pergunta.parqueAq == 'sim')
        proBanco.update({
          [novoItemKey.push().key]:'Roupa de banho',
          [novoItemKey.push().key]:'Toalha',
          [novoItemKey.push().key]:'Chinelo',
        })


      if (pergunta.passeioN == 'sim')
        proBanco.update({
          [novoItemKey.push().key]:'Roupa de passeio'
      })

      
      if (pergunta.trabalho == 'sim')
        proBanco.update({
          [novoItemKey.push().key]:'Roupa social'
      })
    })
  }

  escreveLista() {
    firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').on('child_added', function(snap){
      var itemId = snap.key + "Item";
      const li = document.createElement("ion-label");
      const ionItem = document.createElement("ion-item");
      const check = document.createElement("input");
      check.type = "checkbox";
      check.className = "chek"
      li.innerText = snap.val();
      li.id = snap.key;
      ionItem.id = itemId;
      document.getElementById("lista").appendChild(ionItem);
      document.getElementById(itemId).appendChild(check);
      document.getElementById(itemId).appendChild(li);
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
