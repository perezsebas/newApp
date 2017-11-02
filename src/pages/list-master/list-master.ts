import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';

// import { Items } from '../../providers/providers';
import { Items } from '../../mocks/providers/items';
import { Item } from '../../models/item';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

// import { FirebaseApp } from 'angularfire2';


@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  // currentItems: Item[];
  currentItems: Observable<any[]>;
  // image: any;

  constructor(
    public navCtrl: NavController,
    public items: Items,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    // public st: FirebaseApp,
    public db: AngularFireDatabase) {
    // this.currentItems = this.items.query();
    // this.currentItems = db.list('users').valueChanges();

    // this.currentItems = db.list('users').snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });

    // this.currentItems.forEach(element => {
    //   element.forEach(element => {
    //     const storage = st.storage();
    //     const ref = storage.ref().child(element.profilePic);
    //     ref.getDownloadURL().then(url => element.FBimage = url);
    //     // this.db.list('users').update(element.key, { image: element.image });
    //     console.log(element);
    //   });
    // });

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {

    let loader = this.loadingCtrl.create();

    loader.present().then(() => {
      this.currentItems = this.db.list('users').snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
      loader.dismiss();
    });
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
        console.log(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
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
