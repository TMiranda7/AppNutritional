import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
   public email;
   public senha;

   tabBar: any;
   
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams ,
    public toastCtrl:ToastController,
    public fire : AngularFireAuth  
  ) {
      this.tabBar = document.querySelector(".show-tabbar") ;
   }

   ionViewWillEnter(){
     let tab = document.querySelectorAll(".show-tabbar") ;
     if (tab == null){
       this.tabBar.style.display='none';
     }
   }

   ionViewWillLeave(){
    let tab = document.querySelectorAll(".show-tabbar");
    if (tab !== null){
      Object.keys(tab).map( res => tab[res].style.display = 'none' );
    }
   }

  cadastrarNew(){
    console.log('Teste')
    let toast = this.toastCtrl.create({
      duration:3000,
      position:'bottom'
    })
     
    this.fire.auth.createUserAndRetrieveDataWithEmailAndPassword(this.email,this.senha)
    .then(data => {
      console.log(data)
      toast.setMessage("Cadastrado com sucesso !")
      toast.present()

      this.navCtrl.setRoot(HomePage)
    })
    .catch((error:any) => {
      if (error.code == 'auth/email-already-in-use'){ toast.setMessage('Existe uma conta com esse E-mail !') }
      if (error.code == 'auth/invalid-email'){ toast.setMessage('E-mail invalido !') }
      if (error.code == 'auth/operation-not-allowed'){toast.setMessage('email ou senha não autorizado !') }
      if (error.code == 'auth/weak-password'){ toast.setMessage('senha muito fraca !') }       
      
      toast.present()
    })

  }  

}
