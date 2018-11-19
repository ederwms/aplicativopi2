import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {
  /**
   * Variavel que armazena o objeto que contem as coordenadas.
   * É mais facil de manipular o objeto com essa variavel.
   */
  coordenadas;
  // Variavel que armazena o objeto da previsao do tempo.
  previsao;
  // Variaveis input
  myDate: any;
  cidade: any;
  horario: any = new Date();


  // --------------------------------------------------------------------------------------------------
  userId: string = firebase.auth().currentUser.uid;
  newItem: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public loadingCtrl: LoadingController) {
    this.myDate = localStorage.getItem('data');
    this.cidade = localStorage.getItem('destino');

    //this.buscaClima(this.cidade, this.myDate);
    this.pegaDados();
    this.escreveLista();
  }

  // Método para buscar os dados de clima com as APIs Geocoding(para coordenadas) e DarkSky Weather API 
  buscaClima(destino: string, data: any) {
    // Requisição a MapQuest API para obter as coordenadas da cidade digitada.
    return this.http.get('http://www.mapquestapi.com/geocoding/v1/address?key=ZPPzipVJfjQixqkURm75wzqnAnVZzRL9&location=' + destino + '&maxResults=1').subscribe(geo => {
      this.coordenadas = geo;
      let lat = this.coordenadas.results['0'].locations['0'].latLng.lat; // Latitude
      let long = this.coordenadas.results['0'].locations['0'].latLng.lng; // Longitude

      // Variaveis que pegam  o tempo do sistema em HH:MM:SS.
      let horas = this.horario.getHours() < 10 ? '0' + this.horario.getHours() : this.horario.getHours();
      let minutos = this.horario.getMinutes() < 10 ? '0' + this.horario.getMinutes() : this.horario.getMinutes();
      let segundos = this.horario.getSeconds() < 10 ? '0' + this.horario.getSeconds() : this.horario.getSeconds();

      // Requisição a DarkSky API
      let url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d6930b3aaccb1375812ce727ea86dbfc/' + lat + ',' + long + ',' + data + 'T' + horas + ':' + minutos + ':' + segundos + '?units=si&lang=pt&exclude=minutely,flags&outFormat=json';
      this.http.get(url).subscribe(data => {
        this.previsao = data;
        let info = document.querySelector('ion-content h1.rj');
        let infoClima = document.querySelector('ion-content h5.weather');
        let infoClimaText = document.createTextNode(this.previsao.currently.summary);
        let infoText = document.createTextNode(this.cidade + ', ' + Math.floor(this.previsao.currently.temperature) + '°');
        info.appendChild(infoText);
        infoClima.appendChild(infoClimaText);
        console.log(this.previsao);
      });
    });
  }

  pegaDados() {
    let cidadeDestino = this.cidade;
    firebase.database().ref('meusDados/respostas/' + this.userId + '/lista').set({ esportes: null })
    var novoItemKey = firebase.database().ref('meusDados/respostas/' + this.userId).child('lista');
    var proBanco = firebase.database().ref('meusDados/respostas/' + this.userId + '/lista')
    firebase.database().ref('meusDados/respostas/' + this.userId).once('value', function (snap) {
      var pergunta = snap.val();
      // Zoeira das cidades
      if (cidadeDestino == 'Rio de Janeiro') {
        proBanco.update({
          [novoItemKey.push().key]: 'Colete a prova de balas',
          [novoItemKey.push().key]: 'AK-47',
          [novoItemKey.push().key]: 'Item zoando a cidade'
        })
      }
      else if (cidadeDestino == 'Belo Horizonte') {
        proBanco.update({
          [novoItemKey.push().key]: 'Pão de Queijo', // Mudaremos essa depois, pão de queijo fica meio ruim kkkk
        })
      }
      else if (cidadeDestino == 'Goiânia') {
        proBanco.update({
          [novoItemKey.push().key]: 'Berrante',
          [novoItemKey.push().key]: 'Item zoando a cidade'
        })
      }
      else if (cidadeDestino == 'Gramado') {
        proBanco.update({
          [novoItemKey.push().key]: 'Muitos agasalhos',
          [novoItemKey.push().key]: 'Item zoando a cidade'
        })
      }
      else if (cidadeDestino == 'Salvador') {
        proBanco.update({
          [novoItemKey.push().key]: 'Berimbau',
          [novoItemKey.push().key]: 'Item zoando a cidade'
        })
      }
      else if (cidadeDestino == 'São Paulo') {
        proBanco.update({
          [novoItemKey.push().key]: 'Item zoando a cidade'
        })
      }

      // Lista Séria
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
          [novoItemKey.push().key]: 'Óculos de sol',
          [novoItemKey.push().key]: 'Protetor solar',
        })
      }


      if (pergunta.passeioN == 'sim') {
        proBanco.update({
          [novoItemKey.push().key]: 'Roupa de passeio',
          [novoItemKey.push().key]: 'Câmera fotográfica',
          [novoItemKey.push().key]: 'Carregador da câmera',
        })
      }


      if (pergunta.trabalho == 'sim') {
        proBanco.update({
          [novoItemKey.push().key]: 'Calça formal',
          [novoItemKey.push().key]: 'Camisa social',
          [novoItemKey.push().key]: 'Cinto formal',
          [novoItemKey.push().key]: 'Meias',
          [novoItemKey.push().key]: 'Relógio formal',
          [novoItemKey.push().key]: 'Roupa social',
          [novoItemKey.push().key]: 'Laptop',
          [novoItemKey.push().key]: 'Carregador do laptop',
          [novoItemKey.push().key]: 'Celular do trabalho',
          [novoItemKey.push().key]: 'Carregador do celular do trabalho',
          [novoItemKey.push().key]: 'Crachá'
        })
      }
    })
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  carregando() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde, estamos montando sua lista...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  async escreveLista() {
    // Função para previsão de clima
    this.buscaClima(this.cidade, this.myDate);
    // As duas funções abaixo fazem o efeito de espera para mostrar a lista.
    // Delay de 5s
    this.carregando();
    await this.delay(5000);

    // Mostra a lista na tela
    firebase.database().ref('meusDados/respostas/' + this.userId).child('lista').on('child_added', function (snap) {
      var itemId = snap.key + "Item";
      const label = document.createElement("ion-label");
      const ionItem = document.createElement("ion-item");
      const check = document.createElement("input");
      check.type = "checkbox";
      check.className = "chek";
      label.innerHTML = snap.val();
      label.id = snap.key;
      ionItem.id = itemId;
      document.getElementById("lista").appendChild(ionItem);
      document.getElementById(itemId).appendChild(check);
      document.getElementById(itemId).appendChild(label);
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
