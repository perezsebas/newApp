import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { Item } from '../../models/item';

import { Items } from '../../providers/providers';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];
  // currentItems: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public items: Items,
    public db: AngularFireDatabase) {

  }

  /**
   * Perform a service for the proper items.
   */

  // getItems(ev) {

  //   this.currentItems.query = this.db.list('users/', ref => {
  //     console.log(ref);
  //     return ref//.orderByChild('name').equalTo('Burt Bear');
  //   });
 
  // }

  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
