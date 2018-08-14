import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApresentacaoPage } from './../pages/apresentacao/apresentacao';
import { HomePage } from './../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    atAuth:AngularFireAuth
  ){
    const autorized = atAuth.authState.subscribe(usuario =>{
      if(usuario){
        this.rootPage = ApresentacaoPage;
        autorized.unsubscribe();
      }
      else{
        this.rootPage = HomePage;
        autorized.unsubscribe();
      }
    })

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

