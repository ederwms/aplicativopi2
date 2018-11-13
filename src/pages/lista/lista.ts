import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { createElement } from '@angular/core/src/view/element';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  // Chaves das API
  forecastKey: any = 'd6930b3aaccb1375812ce727ea86dbfc';
  geocodingKey: any = 'ZPPzipVJfjQixqkURm75wzqnAnVZzRL9';
  crossOrigin = 'https://cors-anywhere.herokuapp.com/';
  // Variavel que armazena o objeto que contem as coordenadas. Mais facil de manipular o objeto com essa variavel.
  coordenadas;
  // Variavel que armazena o objeto da previsao do tempo.
  previsao;
  // Variaveis input
  myDate: any;
  cidade: any;


  // --------------------------------------------------------------------------------------------------
  teste: any;
  path: any = "meusDados/"
  busca: any;
  userId: string = firebase.auth().currentUser.uid;
  newItem: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.myDate = localStorage.getItem('data');
    this.cidade = localStorage.getItem('destino');

    this.buscaClima(this.cidade, this.myDate);
    this.pegaDados();
    this.escreveLista();
  }

  // Método para buscar os dados de clima com as APIs Geocoding(para coordenadas) e DarkSky Weather API 
  buscaClima(destino: string, data: any) {
    return this.http.get('http://www.mapquestapi.com/geocoding/v1/address?key=' + this.geocodingKey + '&location=' + destino + '&maxResults=1').subscribe(geo => {
      this.coordenadas = geo;
      let lat = this.coordenadas.results['0'].locations['0'].latLng.lat; // Latitude
      let long = this.coordenadas.results['0'].locations['0'].latLng.lng; // Longitude

      let url = this.crossOrigin + 'https://api.darksky.net/forecast/' + this.forecastKey + '/' + lat + ',' + long + ',' + data + 'T00:00:00?units=si&lang=pt&exclude=minutely,flags&outFormat=json';
      this.http.get(url).subscribe(data => {
        this.previsao = data;
        let info = document.querySelector('ion-content h1.rj');
        let infoText = document.createTextNode(this.cidade + ', ' + Math.floor(this.previsao.currently.temperature) + '°');
        info.appendChild(infoText);
        //console.log(this.previsao);
      });
    });
  }

  pegaDados() {
    firebase.database().ref('meusDados/respostas/' + this.userId + '/lista').set({ esportes: null })
    var novoItemKey = firebase.database().ref('meusDados/respostas/' + this.userId).child('lista');
    var proBanco = firebase.database().ref('meusDados/respostas/' + this.userId + '/lista')
    firebase.database().ref('meusDados/respostas/' + this.userId).once('value', function (snap) {
      var pergunta = snap.val()
      if (pergunta.esportes == 'sim') {
        proBanco.update({
          [novoItemKey.push().key]: 'Camisa regata',
          [novoItemKey.push().key]: 'Shorts',
          [novoItemKey.push().key]: 'Tênis para esportes',
        })
      }

      if (pergunta.parqueAq == 'sim') {
        proBanco.update({
          [novoItemKey.push().key]: 'Roupa de banho',
          [novoItemKey.push().key]: 'Toalha',
          [novoItemKey.push().key]: 'Chinelo',
        })
      }


      if (pergunta.passeioN == 'sim') {
        proBanco.update({
          [novoItemKey.push().key]: 'Roupa de passeio',
          [novoItemKey.push().key]: 'Câmera fotográfica',
          [novoItemKey.push().key]: 'Colete a prova de balas',
          [novoItemKey.push().key]: 'AK-47'
        })
      }


      if (pergunta.trabalho == 'sim') {
        proBanco.update({
          [novoItemKey.push().key]: 'Roupa social'
        })
      }
    })
  }

  escreveLista() {
    firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').on('child_added', function (snap) {
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

    firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').on('child_changed', function (snap) {
      const liAlterou = document.getElementById(snap.key)
      liAlterou.innerText = snap.val()
    })
    firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').on('child_removed', function (snap) {
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
