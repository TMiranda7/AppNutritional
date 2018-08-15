import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { ApresentacaoPage } from './../apresentacao/apresentacao';
import { DicasPage } from './../dicas/dicas';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  DicasPage = DicasPage;
  ApresentacaoPage = ApresentacaoPage;

}
