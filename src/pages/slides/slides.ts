import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
})
export class SlidesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  abrindoApp(){
    this.navCtrl.setRoot(TabsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidesPage');
  }

}
