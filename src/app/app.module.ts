import { TabsPage } from './../pages/tabs/tabs';
import { LeiaMaisPage } from './../pages/leia-mais/leia-mais';
import { DicasPage } from './../pages/dicas/dicas';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroPage } from './../pages/cadastro/cadastro';
import { ApresentacaoPage } from './../pages/apresentacao/apresentacao';
import { ServiceUserProvider } from '../providers/service-user/service-user';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'

const configAuth = {
  apiKey: "AIzaSyCLAJZ8CWJ1azMIZbA-a_M6JObI2IDV9z8",
  authDomain: "meuacesso-3efc0.firebaseapp.com",
  databaseURL: "https://meuacesso-3efc0.firebaseio.com",
  projectId: "meuacesso-3efc0",
  storageBucket: "meuacesso-3efc0.appspot.com",
  messagingSenderId: "616174725916"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ApresentacaoPage,
    DicasPage,
    LeiaMaisPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(configAuth)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ApresentacaoPage,
    DicasPage,
    LeiaMaisPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceUserProvider
  ]
})
export class AppModule {}