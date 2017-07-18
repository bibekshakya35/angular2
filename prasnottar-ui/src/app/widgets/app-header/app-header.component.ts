import { Component, Input, OnInit, AfterViewInit, AfterContentInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { TranslateService } from 'ng2-translate';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { GenericService } from '../../services/generic.service';
import { UrlConfig } from "../../_config/url.cofig";
import { PreCondition } from '../../_utils/precheckcondition';
import { Response } from "../../models/response";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GlobalService } from '../../services/global.service';
declare var $: any;
@Component({
  selector: 'app-header',
  styleUrls: ['./app-header.component.css'],
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit, AfterViewInit, AfterContentInit {
  user: any;
  response: Response;

  loggers: any;
  isNoLog: boolean = false;
  userImage: string;

  userId: string;

  precondition: PreCondition;
  BASE_URL: string;
  ngOnInit() {

  }
  constructor(
    private genericSer: GenericService,
    private userSer: UserService, private _route: ActivatedRoute,
    private _router: Router, private global: GlobalService) {
    this.BASE_URL = this.global.getValue();
    this.precondition = new PreCondition();
  }
  onStart() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this._route.queryParams.subscribe((params: Params) => {
      this.userId = params['id'];
      if (this.user) {
        this.userId = this.user._id;
        this.showReputation();
        return;
      }
      else if (this.userId) {
        localStorage.clear();
        this.showReputation();
        this.getUserById(this.userId);
      }
      else {
      }
    });

  }
  ngAfterContentInit() {
    this.onStart();
  }
  ngAfterViewInit() {


  }

  showReputation() {
    this.genericSer.getAllResources(this.BASE_URL + UrlConfig.LOG + "/" + this.userId + "/" + UrlConfig.NOTIFICATION)
      .subscribe(
      res => {
        this.loggers = JSON.parse(res.data);
        console.log(JSON.stringify(this.loggers), this.loggers.length);
        if (this.loggers.length === 0) {
          this.isNoLog = true;
        }
      });

  }

  getUserById(id) {

    this.genericSer.getResourceByUniqueCode(this.BASE_URL + UrlConfig.USER,
      id).subscribe(
      response => {
        this.response = response;
        let pre = new PreCondition();
        if (pre.checkResponseValid(this.response)) {
          this.user = JSON.parse(this.response.data);
          this.userId = this.user.userid;

          this.showReputation();
          switch (this.user.userType) {
            case "local": {
              this.user.connected = true;
              this.user.avatarUrl = "/assets/img/imagenotfound.png";
              localStorage.clear();
              localStorage.setItem("currentUser", JSON.stringify(this.user));
              break;
            }
            case "facebook": {
              this.genericSer.getImageFromFacebook("https://graph.facebook.com/" + this.user.userid + "/picture?redirect=false&height=200&width=200")
                .subscribe(
                res => {
                  let data = res.data;
                  this.user.avatarUrl = data.url;
                  localStorage.clear();
                  localStorage.setItem("currentUser", JSON.stringify(this.user));

                }
                );

              this.user.connected = true;
              break;
            }
            case "twitter": {
              this.user.connected = true;
              localStorage.clear();
              localStorage.setItem("currentUser", JSON.stringify(this.user));
              break;
            }
            case "google": {
              this.user.connected = true;
              localStorage.clear();
              localStorage.setItem("currentUser", JSON.stringify(this.user));
              break;
            }
            default: {
              this.user.connected = false;
              break;
            }
          }

        }
      });



  }
}
