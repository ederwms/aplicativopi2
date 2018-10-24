import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { ViewChild } from '@angular/core';
import firebase from 'firebase';
import { Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-perguntas',
  templateUrl: 'perguntas.html',
})
export class PerguntasPage {

  arrData = []
  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }
  
  responder(pergunta: string,resposta: string) {
    console.log(resposta)
    firebase.database().ref('meusDados/respostas'/* + userId*/).update({
      [pergunta]: resposta,
    })
    this.slides.lockSwipes(false)
    this.slides.slideNext(500)
    this.slides.lockSwipes(true)
  }

  goLista() {
    this.navCtrl.push(ListaPage);
  }

  ionViewDidLoad(){
    this.slides.lockSwipes(true)
  }
}
