import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  items: Observable<any[]>;

  imageDataFB: any = null;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera,
    public st: FirebaseApp,
    public db: AngularFireDatabase) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewDidLoad() {

  }

  getPicture() {
    // if (Camera['installed']()) {
    //   this.camera.getPicture({
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     targetWidth: 96,
    //     targetHeight: 96
    //   }).then((data) => {
    //     this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
    //   }, (err) => {
    //     alert('Unable to take photo');
    //   })
    // } else {
    this.fileInput.nativeElement.click();
    //}
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
      this.imageDataFB = imageData;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }

    //Create register in Firebase DB
    this.db.list('users').push({
      name: this.form.controls['name'].value,
      about: this.form.controls['about'].value,
      profilePic: this.form.controls['profilePic'].value
    });

    //Create file in Firebase storage
    if (this.imageDataFB !== null) {
      let storageRef = this.st.storage().ref();
      let imageName = 'speakers/' + this.form.controls['name'].value;
      let uploadTask = storageRef.child(imageName).putString(this.imageDataFB, 'data_url');
    }

    //Close modal and back to view
    this.viewCtrl.dismiss(this.form.value);
  }
}
