import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { ServiceUserProvider } from './../../providers/service-user/service-user';  
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@IonicPage()

@Component({
  selector: 'page-leia-mais',
  templateUrl: 'leia-mais.html',
})

export class LeiaMaisPage {

  postagem:any;
  user:string;
  categories:Array<any> = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public servico : ServiceUserProvider,
    public loadCtrl :LoadingController
  ) {  }

  ionViewWillEnter() {
    
    let carregar = this.loadCtrl.create();
    carregar.present();
    this.postagem = this.navParams.get('item');

    Observable.forkJoin( 
      this.getAuthData(),
      this.getCategories())
      .subscribe(data => {
        this.user = data[0].name;
        this.categories = data[1];
        carregar.dismiss();
      });
  }

  getAuthData(){
    return this.servico.getAuthor(this.postagem.author);
  }

  getCategories(){
    return this.servico.postCategory(this.postagem);
  }

}