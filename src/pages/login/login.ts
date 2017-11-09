import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../pages';
import { WelcomePage } from '../welcome/welcome';

import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
    // email: 'testing@example.com',
    // password: '123456'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private facebook: Facebook,
    public afAuth: AngularFireAuth) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

  }

  // Attempt to login in through our User service
  doLogin() {
    //Log in to Firebase Authentication
    this.afAuth.auth.signInWithEmailAndPassword(this.account.email, this.account.password)
      .then((res) => {
        this.navCtrl.push(MainPage);
      }).catch((err) => {
        this.showToast(this.loginErrorString);
      });

    // this.user.login(this.account).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //   //Redirect to Main Page
    //   // this.navCtrl.push(MainPage);
    //   // Unable to log in
    //   let toast = this.toastCtrl.create({
    //     message: this.loginErrorString,
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });

  }

  logInWithGoogle() {
    //Sign up with Google
    let provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/plus.login');

    this.afAuth.auth.signInWithRedirect(provider)
    // this.afAuth.auth.signInWithPopup(provider)
    // this.afAuth.auth.getRedirectResult()
    // .then(() => {
    //   console.log('entro aca');
    //   this.navCtrl.push(MainPage);
    // }).catch((err) => {
    //   this.showToast(err);
    // });
  }

  logInWithFacebook() {

    this.facebook.login(['public_profile'])
      .then((response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
            this.navCtrl.push(MainPage);
          })
          .catch((error) => {
            this.showToast('calling Auth: ' + error);
          });
      })
      .catch((error) => {
        this.showToast('FB login: ' + error);
      });

    // //Sign up with Facebook
    // let provider = new firebase.auth.FacebookAuthProvider();

    // provider.addScope('user_birthday');

    // // this.afAuth.auth.signInWithRedirect(provider)
    // this.afAuth.auth.signInWithPopup(provider)
    // // this.afAuth.auth.getRedirectResult()
    //   .then(() => {
    //     console.log('entro aca');
    //     this.navCtrl.push(MainPage);
    //   }).catch((err) => {
    //     this.showToast(err);
    //   });

  }

  signOut() {
    //Sign out
    this.afAuth.auth.signOut()
      .then((res) => {
        this.navCtrl.push(WelcomePage);
      }).catch((err) => {
        this.showToast(err);
      });
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
