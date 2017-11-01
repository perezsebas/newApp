import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { Items } from '../../providers/providers';

import { ListMasterPage } from '../list-master/list-master';

import { AngularFireDatabase } from 'angularfire2/database';

import { FirebaseApp } from 'angularfire2';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  updateMessage: string;
  deleteMessages: string[];

  constructor(public navCtrl: NavController,
    navParams: NavParams,
    items: Items,
    public db: AngularFireDatabase,
    public st: FirebaseApp,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private translate: TranslateService) {

    this.item = navParams.get('item') || items.defaultItem;

  }

  updateItem(key: string, newText: string) {
    //Update values in Firebase DB
    this.db.list('users').update(key, { about: newText });

    //Get translated value
    this.translate.get('USER_UPDATED').subscribe((res: string) => {
      this.updateMessage = res;
    });

    //Show toast with confirmation message
    let toast = this.toastCtrl.create({
      message: this.updateMessage,
      duration: 2000,
      position: 'top',
      cssClass: 'greenBG'
    });
    toast.present();

  }

  deleteItem(name: string, key: string) {

    //Get translated values
    this.translate.get(['DELETE_BUTTON', 'DELETE_USER_CONFIRMATION', 'CANCEL_BUTTON', 'CONFIRMATION' ]).subscribe((res: string[]) => {
      this.deleteMessages = res;
    });

    //Show alert with confirmation message
    let alert = this.alertCtrl.create({
      title: this.deleteMessages['CONFIRMATION'],
      message: this.deleteMessages['DELETE_USER_CONFIRMATION'],
      buttons: [
        {
          text: this.deleteMessages['CANCEL_BUTTON'],
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.deleteMessages['DELETE_BUTTON'],
          cssClass: 'deleteButton',
          handler: () => {

            //Delete from Firebase DB
            this.db.list('users').remove(key);

            //Delete from Firebase storage
            let storageRef = this.st.storage().ref();
            let imageName = 'speakers/' + name;
            storageRef.child(imageName).delete()
              .then(function () {
                console.log('succes');
              }).catch(function (error) {
                console.log(error);
              });;

            //Send to ListerMasterPage view
            this.navCtrl.push(ListMasterPage);
          }
        }
      ]
    });
    alert.present();
  }

}
