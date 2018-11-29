import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';

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
  // Icone
  icone: string = "";

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
        let infoClima = document.querySelector('ion-content h2.weather');
        let infoClimaText = document.createTextNode(this.previsao.currently.summary);
        let infoText = document.createTextNode(this.cidade + ', ' + Math.floor(this.previsao.currently.temperature) + '°');
        info.appendChild(infoText);
        infoClima.appendChild(infoClimaText);
        /**
         * Definição do ícone
         * 1 - Dia limpo
         */
        if (this.previsao.currently.icon == 'clear-day') {
          this.icone = 'sunny';
        }
        // 2 - Noite limpa
        if (this.previsao.currently.icon == 'clear-night') {
          this.icone = 'moon';
        }
        // 3 - Chuva
        if (this.previsao.currently.icon == 'rain') {
          this.icone = 'rainy';
        }
        // 4 - Neve
        if (this.previsao.currently.icon == 'snow') {
          this.icone = 'snow';
        }
        // 5 - Nublado
        if (this.previsao.currently.icon == 'cloudy') {
          this.icone = 'cloud';
        }
        // 6 - Dia parcialmente nublado
        if (this.previsao.currently.icon == 'partly-cloudy-day') {
          this.icone = 'partly-sunny';
        }
        // 7 - Noite parcialmente nublada
        if (this.previsao.currently.icon == 'partly-cloudy-night') {
          this.icone = 'cloudy-night';
        }
        // 8 - Caso vier "wind", "sleet" ou "fog" na resposta da API, o icone fica vazio.
        if ((this.previsao.currently.icon == 'sleet') || (this.previsao.currently.icon == 'wind') || (this.previsao.currently.icon == 'fog')) {
          this.icone = '';
        }
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
        })
      }
      else if (cidadeDestino == 'Gramado') {
        proBanco.update({
          [novoItemKey.push().key]: 'Muitos agasalhos',
        })
      }
      else if (cidadeDestino == 'Salvador') {
        proBanco.update({
          [novoItemKey.push().key]: 'Berimbau',
        })
      }
      else if (cidadeDestino == 'Patos de Minas') {
        proBanco.update({
          [novoItemKey.push().key]: 'Escudo contra mulheres bonitas'
        })
      }

      // Lista Séria

      // Se responder sim para esportes, temos os seguintes itens gerais.
      if (pergunta.esportes == 'sim') {
        proBanco.update({
          [novoItemKey.push().key]: 'Camisa regata',
          [novoItemKey.push().key]: 'Shorts',
        })
      }
      // Se responder que irá jogar futebol
      if (pergunta.esportes.includes('fut')) {
        proBanco.update({
          [novoItemKey.push().key]: 'Camisa do seu time',
          [novoItemKey.push().key]: 'Bola de futebol',
          [novoItemKey.push().key]: 'Chuteira',
        })
      }
      // Se responder que irá jogar basquete
      if (pergunta.esportes.includes('nat')) {
        proBanco.update({
          [novoItemKey.push().key]: 'Touca',
          [novoItemKey.push().key]: 'Óculos de natação',
          [novoItemKey.push().key]: 'Traje de natação',
        })
      }
      // Se responder que irá jogar tênis
      if (pergunta.esportes.includes('ten')) {
        proBanco.update({
          [novoItemKey.push().key]: 'Raquete de tênis',
          [novoItemKey.push().key]: 'Bola de tênis',
        })
      }

      // Se responder que irá ao parque aquático
      if (pergunta.parqueAq == 'sim') {
        proBanco.update({
          [novoItemKey.push().key]: 'Roupa de banho',
          [novoItemKey.push().key]: 'Toalha',
          [novoItemKey.push().key]: 'Chinelo',
          [novoItemKey.push().key]: 'Óculos de sol',
          [novoItemKey.push().key]: 'Protetor solar',
        })
      }

      // Se o passeio noturno for um jantar sofisticado
      if (pergunta.passeioN.includes('jan')) {
        proBanco.update({
          [novoItemKey.push().key]: 'Roupa sofisticada',
          [novoItemKey.push().key]: 'Cartão de crédito',
        })
      }
      // Se o passeio noturno for uma balada
      if (pergunta.passeioN.includes('bal')) {
        proBanco.update({
          [novoItemKey.push().key]: 'Engov',
          [novoItemKey.push().key]: 'Amigos para te carregar',
          [novoItemKey.push().key]: 'Dorflex',
        })
      }
      // Se responder que irá fazer um passeio noturno
      if (pergunta.passeioN == 'sim') {
        proBanco.update({
          [novoItemKey.push().key]: 'Câmera fotográfica',
          [novoItemKey.push().key]: 'Carregador da câmera'
        })
      }

      // Se responder que será uma viagem a trabalho
      if (pergunta.trabalho == 'sim') {
        proBanco.update({
          [novoItemKey.push().key]: 'Celular do trabalho',
          [novoItemKey.push().key]: 'Carregador do celular do trabalho',
          [novoItemKey.push().key]: 'Crachá'
        })
      }
      // Tipo de trabalho: Social
      if (pergunta.trabalho.includes('soc')) {
        proBanco.update({
          [novoItemKey.push().key]: 'Calça social',
          [novoItemKey.push().key]: 'Camisa social',
          [novoItemKey.push().key]: 'Sapato social',
          [novoItemKey.push().key]: 'Meias',
          [novoItemKey.push().key]: 'Relógio',
          [novoItemKey.push().key]: 'Laptop',
          [novoItemKey.push().key]: 'Carregador do laptop',
        })
      }
      // Tipo de trabalho: Casual
      if (pergunta.trabalho.includes('cas')) {
        proBanco.update({
          [novoItemKey.push().key]: 'Calça jeans',
          [novoItemKey.push().key]: 'Camiseta casual',
          [novoItemKey.push().key]: 'Sapato confortável',
          [novoItemKey.push().key]: 'Meias',
          [novoItemKey.push().key]: 'Relógio',
          [novoItemKey.push().key]: 'Laptop',
          [novoItemKey.push().key]: 'Carregador do laptop',
        })
      }
    })
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  carregando() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde, estamos montando sua mala...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 6000);
  }

  async escreveLista() {
    // Função para previsão de clima
    this.buscaClima(this.cidade, this.myDate);
    // As duas funções abaixo fazem o efeito de espera para mostrar a lista.
    // Delay de 5s
    this.carregando();
    await this.delay(6000);

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

  novaViagem() {
    this.navCtrl.push(HomePage);
  }

}
