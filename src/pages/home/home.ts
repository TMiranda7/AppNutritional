import { DicasPage } from './../dicas/dicas';
import { ServiceUserProvider } from './../../providers/service-user/service-user';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { user } from './../../providers/user';
import { ApresentacaoPage } from '../apresentacao/apresentacao';
import { CadastroPage } from './../cadastro/cadastro';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario:user;
  


  constructor(
    public navCtrl: NavController,
    public servico :ServiceUserProvider ,
    public fire : AngularFireAuth,
    public toastCtrl:ToastController
  ) {
    this.usuario = new user();
    this.usuario.email 
    this.usuario.senha

  }

  entrar(){
        
    this.fire.auth.signInAndRetrieveDataWithEmailAndPassword(this.usuario.email,this.usuario.senha)
    .then((data:any) => {
      console.log(data)
      this.servico.logar(this.usuario.email,this.usuario.senha) ;
      //this.navCtrl.setRoot(ApresentacaoPage);   
      this.navCtrl.setRoot(DicasPage);
    })
    .catch((error:any)=> this.erroLogin(error) )
  }

  cadastrar(){
    console.log("teste");
    this.navCtrl.push(CadastroPage.name)
  }

  erroLogin(error:any){
    let toast = this.toastCtrl.create({
      duration:3000,
      position:'bottom'
    })

    if(error.code=='auth/invalid-email'){ toast.setMessage("Email incorreta !")}
    if(error.code=='auth/user-disabled'){ toast.setMessage("Usuario desativado !")}
    if(error.code=='auth/user-not-found'){ toast.setMessage("Usuario não encontrado !")}
    if(error.code=='auth/wrong-password'){toast.setMessage("senha incorreta !")}

    toast.present();
  }

  enterFacebook(){
    this.fire.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider).then(data =>{
      
      console.log(data);
//       this.navCtrl.setRoot(ApresentacaoPage);
      this.navCtrl.setRoot(DicasPage);
      
    })
  }

}
