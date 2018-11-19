import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  }
  userId: string = firebase.auth().currentUser.uid;
  responder(pergunta: string, resposta: string) {

    console.log(resposta)
    firebase.database().ref('meusDados/respostas/' + this.userId).update({
      [pergunta]: resposta,
    })
    if (resposta == 'sim') {
      this.maisOpcoes(pergunta)
    }
    else {
      this.slides.lockSwipes(false)
      this.slides.slideNext(500)
      this.slides.lockSwipes(true)
      if (pergunta == 'parqueAq') {
        this.navCtrl.push(ListaPage);
      }
    }
  }

  maisOpcoes(pergunta: string) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Qual tipo de esporte você irá praticar?');

    alert.addInput({
      type: 'checkbox',
      label: 'Basquete',
      value: 'bas'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Futebol',
      value: 'fut'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Tênis',
      value: 'ten'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        firebase.database().ref('meusDados/respostas/' + this.userId + '/teste').update(data);

        this.slides.lockSwipes(false)
        this.slides.slideNext(500)
        this.slides.lockSwipes(true)
        if (pergunta == 'parqueAq') {
          this.navCtrl.push(ListaPage);
        }
      }
    });
    alert.present();
  }

  goLista() {
    this.navCtrl.push(ListaPage);
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true)
  }
}
