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

    // const ref = storage.ref().child('speakers/lion.jpg');
    const ref = st.storage().ref().child(this.item.profilePic); 
    ref.getDownloadURL().then(url => this.image = url);
  }

  updateItem(key: string, newText: string) {
    this.db.list('users').update(key, { about: newText });
  }

  deleteItem(key: string) {    
    this.db.list('users').remove(key);
    this.navCtrl.push(ListMasterPage);
  }

}
