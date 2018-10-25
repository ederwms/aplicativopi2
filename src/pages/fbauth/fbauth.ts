import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-fbauth',
  templateUrl: 'fbauth.html',
})
export class FbauthPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FbauthPage');
  }

  home() {
    this.navCtrl.push(HomePage);
  }
}
