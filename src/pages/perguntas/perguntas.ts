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
  resposta: any;
  private path: string = "meusDados/";
  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
  
    this.fdb.list(this.path).subscribe(_data => {
      this.arrData = _data;

      //console.log(this.arrData)
    })
  
  }

  respostaSim() {
    let slideAtual = this.slides.getActiveIndex()
    if(slideAtual == 0){
      this.path = "meusDados/respostas/esportes"
    }
    else if(slideAtual == 1){
      this.path = "meusDados/respostas/trabalho"
    }
    else if(slideAtual == 2){
      this.path = "meusDados/respostas/passeioNot"
    }
    else if(slideAtual == 3){
      this.path = "meusDados/respostas/parque"
    }
    this.resposta = 'sim'
    this.fdb.list(this.path).push(this.resposta)
    this.slides.lockSwipes(false)
    this.slides.slideNext(500)
    this.slides.lockSwipes(true)
    console.log(this.slides.getActiveIndex())
    console.log(this.path)
  }

  respostaNao() {
    let slideAtual = this.slides.getActiveIndex()
    if(slideAtual == 0){
      this.path = "meusDados/respostas/esportes"
    }
    else if(slideAtual == 1){
      this.path = "meusDados/respostas/trabalho"
    }
    else if(slideAtual == 2){
      this.path = "meusDados/respostas/passeioNot"
    }
    else if(slideAtual == 3){
      this.path = "meusDados/respostas/parque"
    }
    this.resposta = 'nao'
    this.fdb.list(this.path + "respostas/").push(this.resposta)
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
