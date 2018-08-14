import { HomePage } from './../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-apresentacao',
  templateUrl: 'apresentacao.html',
})
export class ApresentacaoPage {

  public temfoto:boolean;
  public email:string;

  public facebook = {
    login:'',
    fotoUrl:''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fireCtrl:AngularFireAuth) {
      this.email = fireCtrl.auth.currentUser.email;

      this.facebook.login = fireCtrl.auth.currentUser.displayName;
      this.facebook.fotoUrl = fireCtrl.auth.currentUser.photoURL;

      if ( this.facebook.fotoUrl == null){
        this.temfoto = false;
      }else{
        this.temfoto = true;
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApresentacaoPage');
  }

  saindo(){
    this.fireCtrl.auth.signOut()
    this.navCtrl.setRoot(HomePage)
  }

}
