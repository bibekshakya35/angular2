import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { GenericService } from "../../services/generic.service";
import { Observable } from "rxjs/Observable";
import { UrlConfig } from "../../_config/url.cofig";
import { Response } from "../../models/response";
import { Router, ActivatedRoute } from "@angular/router";
import { PreCondition } from '../../_utils/precheckcondition';
declare var $: any;
@Component({
  selector: 'app-intro-user',
  templateUrl: './intro-user.component.html',
  styleUrls: ['./intro-user.component.css']
})
export class IntroUserComponent implements OnInit, AfterViewInit, AfterContentInit {
  user: any;
  show:boolean=false;
  IMAGEURL: string;
  answeredPost: any[] = [];
  askedPost: any[] = [];
  categories: any[] = [];
  BASE_URL: string;
  favCategories: any[] = [];
  constructor(private generic: GenericService, private _router: Router) {
    this.IMAGEURL = location.protocol + "//" + location.hostname.replace(":4200", "");
    this.BASE_URL = location.protocol + '//' + location.hostname + "/api/";
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.user);
  }
  loadQuestionAnswerAndCategory() {
    let userId = this.user.userid;
    Observable.forkJoin(
      this.generic.getAllResources(this.BASE_URL + UrlConfig.ALL_QUESTION + userId),
      this.generic.getAllResources(this.BASE_URL + UrlConfig.ALL_ANSWER + userId),
      this.generic.getAllResources(this.BASE_URL + UrlConfig.ALL_CATEGORY + userId),
      this.generic.getAllResources(this.BASE_URL + UrlConfig.USER_FAVOURITES + this.user._id)
    ).subscribe(res => {
      this.askedPost = JSON.parse(res[0].data);
      this.answeredPost = JSON.parse(res[1].data);
      this.categories = JSON.parse(res[2].data);
      this.favCategories = JSON.parse(res[3].data);
    });
  }
  ngOnInit() {

  }
  ngAfterContentInit() {
    this.loadQuestionAnswerAndCategory();
  }

  ngAfterViewInit() {
    $(".hover").mouseleave(
      function () {
        $(this).removeClass("hover");
      }
    );
  }
  boxClick(name) {
    if (name) {
      console.log(name);
      this._router.navigateByUrl('/prasna?category=' + name);
    }
  }
}
