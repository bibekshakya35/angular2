import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { AdminLTETranslateService } from './services/translate.service';
import { GlobalService } from './services/global.service';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: any;
  constructor(
    private toastr: ToasterService,
    private globalSer: GlobalService,
    private meta:Meta
  ) {
    
    this.meta.addTag({name:"keywords",content:"Nepal,nepal,question in nepal,prasnottar,q&a,knowledge nepal"});
    let domainApi = location.protocol + '//' + location.hostname + "/api/";
    console.log("you are connected to ", domainApi);
    this.globalSer.setValue(domainApi);
  }

  public ngOnInit() {

    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }


}
