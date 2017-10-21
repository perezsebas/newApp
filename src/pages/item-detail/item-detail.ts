import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';

import { ListMasterPage } from '../list-master/list-master';

import { AngularFireDatabase } from 'angularfire2/database';

import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  image: string;

  constructor(public navCtrl: NavController,
    navParams: NavParams,
    items: Items,
    public db: AngularFireDatabase,
    public st: FirebaseApp) {
    this.item = navParams.get('item') || items.defaultItem;
  }

  updateItem(key: string, newText: string) {
    this.db.list('users').update(key, { about: newText });
  }

  deleteItem(name: string, key: string) {
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
