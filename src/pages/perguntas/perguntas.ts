import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { AngularFireDatabase } from 'angularfire2/database';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-perguntas',
  templateUrl: 'perguntas.html',
})
export class PerguntasPage {

  arrData = []
  private path: string = "meusDados/";
  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
  
    this.fdb.list(this.path).subscribe(_data => {
      this.arrData = _data;

      //console.log(this.arrData)
    })
  
  }
  
  responder(pergunta: string,resposta: string) {
    let slideAtual = this.slides.getActiveIndex().toString()
    this.path = "meusDados/respostas/"
    console.log(this.path)
    console.log(resposta)
    this.fdb.list(this.path).push({
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
