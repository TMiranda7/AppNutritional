import { user } from './../user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Config from '../nutritionAPI';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServiceUserProvider {
  public URL_API ="http://api.meuatendimento.com.br";
  public URL_Res ="/ajax-public/login";
  public headers = new Headers({'Content-type':'aplication/json'})

constructor(public http: Http  ) {  }

  logar(usuer:string,pass:string){

    let dado : user = {
      email: usuer,
      senha: pass  
    }
    this.http.post(this.URL_API+this.URL_Res, dado)
    .subscribe( resposta => console.log(resposta) ) 

  }

  getRecentPosts( page:number = 1 ){
    return this.http.get( Config.API_REST_NUTRI +'posts?page='+ page ).map(res => res.json());
  }

  getAuthor( author ){
    return this.http.get( Config.API_REST_NUTRI + 'users/' + author ).map(rest => rest.json());
  }
  
  postCategory(post){
    let observableBatch = [];
    
    post.categories.forEach(categoria => 
      observableBatch.push(this.getCategory(categoria))
    )
      return Observable.forkJoin(observableBatch);
  };

  getCategory(category){
    return  this.http.get( Config.API_REST_NUTRI + 'categories/'+ category).map(rest => rest.json());
  }

}