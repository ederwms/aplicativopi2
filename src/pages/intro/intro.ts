import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FbauthPage } from '../fbauth/fbauth';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  pularMsg: string = "Pular";

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  pular() {
    this.navCtrl.push(FbauthPage);
  }

  slideChanged() {
    if(this.slides.isEnd()) {
      this.pularMsg = "Vamos lá!";
    }
    
  }

}
