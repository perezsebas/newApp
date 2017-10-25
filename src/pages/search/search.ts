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

  filteredItems: any = [];
  currentItems: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public items: Items,
    public db: AngularFireDatabase) {

    this.currentItems = this.db.list('users').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  /**
   * Perform a service for the proper items.
   */

  getItems(ev) {
    let val = ev.target.value;
    if ((val !== "") && (val !== undefined)) {
      this.currentItems.subscribe(res => {
        this.filteredItems = [];
        res.forEach((item: any) => {
          if ((item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)) {
            this.filteredItems.push(item);
          }
        });
      });
    } else {
      this.filteredItems = [];
    }

  }

  // getItems(ev) {
  //   let val = ev.target.value;
  //   if (!val || !val.trim()) {
  //     this.currentItems = [];
  //     return;
  //   }
  //   this.currentItems = this.items.query({
  //     name: val
  //   });
  // }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
