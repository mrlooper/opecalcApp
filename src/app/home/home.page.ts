import { Component } from '@angular/core';
import { MainService } from '../services/main-service';
import { DialogService } from '../services/dialog-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public mS: MainService,
    public dialogCtrl: DialogService) {
  }
}
