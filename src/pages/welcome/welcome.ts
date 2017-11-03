import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth) { }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create();
    loader.present().then(() => {
      this.afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          // console.log(user);
          this.redirectToMain();
        } else {
          // No user is signed in.
        }
      });
      loader.dismiss();
    });
  }

  redirectToMain() {
    // this.navCtrl.push(MainPage);
    this.navCtrl.setRoot(MainPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
