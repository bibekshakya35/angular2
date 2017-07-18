import { Component, Input, OnInit, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { TranslateService } from 'ng2-translate';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { GenericService } from '../../services/generic.service';
import { UrlConfig } from "../../_config/url.cofig";
@Component({
  selector: 'app-header',
  styleUrls: ['./app-header.component.css'],
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {
  currentUser: any;
  loggers: any;

  userImage: string;
  userId: string;


  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userGet();
    this.showReputation();

  }
  showReputation() {
    if (this.currentUser && this.currentUser !== null || this.currentUser !== undefined) {
      let timer = Observable.timer(4000, 50000);
      timer.subscribe(() => {
        this.genericSer.getAllResources(UrlConfig.BASE_URL + UrlConfig.LOG + "/" + this.currentUser.userid + "/" + UrlConfig.NOTIFICATION)
          .subscribe(
          res => {
            this.loggers = JSON.parse(res.data);
          });

      });

    }
  }
  constructor(private genericSer: GenericService) {

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }



  public userGet() {
    if (this.currentUser) {
      this.userImage = this.currentUser.avatarUrl;
      console.log("image", this.userImage);
      this.userId = this.currentUser._id;
    }
  }



}
