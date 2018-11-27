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
    if (pergunta == 'parqueAq') {
      this.navCtrl.push(ListaPage);
    }
    else if (resposta == 'sim') {
      this.maisOpcoes(pergunta)
    }
    else {
      this.slides.lockSwipes(false)
      this.slides.slideNext(500)
      this.slides.lockSwipes(true)
    }
  }

  maisOpcoes(pergunta: string) {
    let alert = this.alertCtrl.create();
    // Alert personalizado para cada pergunta

    // Esportes
    if (pergunta == 'esportes') {
      alert.setTitle('Qual tipo de esporte você irá praticar?');

      alert.addInput({
        type: 'checkbox',
        label: 'Natação',
        value: 'nat'
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
    }

    // Trabalho
    if (pergunta == 'trabalho') {
      alert.setTitle('Que tipo de trabalho?');

      alert.addInput({
        type: 'checkbox',
        label: 'Social',
        value: 'soc'
      });

      alert.addInput({
        type: 'checkbox',
        label: 'Casual',
        value: 'cas'
      });
    }

    // Passeio Noturno
    if (pergunta == 'passeioN') {
      alert.setTitle('Que tipo de passeio?');

      alert.addInput({
        type: 'checkbox',
        label: 'Jantar sofisticado',
        value: 'jan'
      });

      alert.addInput({
        type: 'checkbox',
        label: 'Balada',
        value: 'bal'
      });
    }

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Continuar',
      handler: data => {
        if ((data == '') || (data == null)) {
          this.slides.lockSwipes(false);
          this.slides.slideNext(500);
          this.slides.lockSwipes(true);

          this.slides.lockSwipes(false);
          this.slides.slidePrev(500);
          this.slides.lockSwipes(true);
        }
        else {
          console.log('Checkbox data:', data);
          firebase.database().ref('meusDados/respostas/' + this.userId + '/' + pergunta).update(data);
          this.slides.lockSwipes(false);
          this.slides.slideNext(500);
          this.slides.lockSwipes(true);
        }
      }
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true)
  }
}
