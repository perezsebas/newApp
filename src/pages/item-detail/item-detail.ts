import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';

import { ListMasterPage } from '../list-master/list-master';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  constructor(public navCtrl: NavController,
    navParams: NavParams,
    items: Items,
    public db: AngularFireDatabase) {
    this.item = navParams.get('item') || items.defaultItem;
  }

  updateItem(key: string, newText: string) {
    this.db.list('users').update(key, { about: newText });
  }

  deleteItem(key: string) {    
    this.db.list('users').remove(key);
    this.navCtrl.push(ListMasterPage);
  }

}
