import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import { MainPage } from '../pages';

import { AngularFireAuth } from 'angularfire2/auth';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController,
  public afAuth: AngularFireAuth) { }

  ionViewDidLoad() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // console.log(user);
        this.redirectToMain();
      } else {
        // No user is signed in.
        console.log('No user is signed in');
      }
    });
  }

  redirectToMain() {
    this.navCtrl.push(MainPage);
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
