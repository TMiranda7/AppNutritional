import { LeiaMaisPage } from './../leia-mais/leia-mais';
import { ServiceUserProvider } from './../../providers/service-user/service-user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {

  posts : Array<any> = new Array<any>();
  morePage : boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire : AngularFireAuth,
    public loadingCtrl : LoadingController,
    public servico : ServiceUserProvider
  ) { 
      
   }

  ionViewWillEnter() {
    this.morePage = true;

    if(!(this.posts.length > 0 )){
      let carregar = this.loadingCtrl.create();
      carregar.present();

      this.servico.getRecentPosts().subscribe(data => {
        console.log(data)
        for(let post of data){       
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0]+ "<p>";
          this.posts.push(post)
        }  
      carregar.dismiss();
      });
    }
  }

  abrirLeiaMais( post ){
    console.log(event);
    this.navCtrl.push(LeiaMaisPage,{ 
      item:post 
    });
  }

  doInfinite(infiniteScroll){
    let pagina = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true ;

    this.servico.getRecentPosts(pagina).subscribe( data => {
      for(let post of data){
        if(!loading){
          infiniteScroll.complete();
        }
        else{
          this.posts.push(post)
          loading = false;
        }
      }
    },err => {
      this.morePage = false ;
    }
  )}

  doRefresh(event){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

    setTimeout(()=>{
      event.complete();
    },4000)
  }
} 
