import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main-service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public mS: MainService) { }

  ngOnInit() {
  }

}
