import { Component, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import { Post } from '../../models/post';
import { GenericService } from '../../services/generic.service';
import { UrlConfig } from "../../_config/url.cofig";
import { Response } from "../../models/response";
import { PreCondition } from "../../_utils/precheckcondition";
import { Observable } from "rxjs/Observable";
import { User } from '../../models/user';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from '../../services/user.service';
import {GlobalService} from '../../services/global.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['/category.component.css']
})
export class CategoryComponent implements OnInit {
  postMost: any;
  BASE_URL:string;
  categoryMost: any;
  constructor(private genericSer: GenericService, private _route: ActivatedRoute,
    private _router: Router,private globalServ:GlobalService) {this.BASE_URL = this.globalServ.getValue() }

  response: Response;

  categories: any[] = [];
  ngOnInit() {
    this.getMostCategories();
  }
  boxClick(name) {
    if (name) {
      this._router.navigateByUrl('/prasna?category=' + name);
    }
  }

  public getMostCategories() {
    this.genericSer.getAllResources(this.BASE_URL + UrlConfig.CATEGORIES + "/most/4").subscribe(
      response => {
        this.response = response;

        this.categoryMost = JSON.parse(this.response.data)[0];

        this.genericSer.getAllResources(this.BASE_URL + UrlConfig.POSTS + "/" + UrlConfig.CATEGORIES + "/" + this.categoryMost.name)
          .subscribe(
          response => {
            this.response = response;
            this.postMost = JSON.parse(this.response.data)[0];
          }
          );
      }

    );
  }
}
