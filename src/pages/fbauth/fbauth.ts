import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import firebase from "firebase";


var userId: string;

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
  facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    
    var user = firebase.auth().currentUser;
    
    if (user != null) {
      this.navCtrl.push(HomePage);
    }
      

  }
}
export var global = userId
