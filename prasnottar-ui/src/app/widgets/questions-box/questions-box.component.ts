import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy, OnChanges, AfterViewInit, NgZone
} from '@angular/core';
import { Post } from '../../models/post';
import { GenericService } from '../../services/generic.service';
import { UrlConfig } from "../../_config/url.cofig";
import { Response } from "../../models/response";
import { PreCondition } from "../../_utils/precheckcondition";
import { TruncatePipe } from './truncate-pipes';
import { Observable } from "rxjs/Observable";
import { User } from '../../models/user';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
declare var $: any;
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'questions-box',
  templateUrl: './questions-box.component.html',
  styleUrls: ['./questions-box.component.css']
})
export class QuestionsBoxComponent implements OnInit, AfterViewInit, OnDestroy {
  public html: string;
  show: boolean = false;
  interestingTopic: string;
  isClicked: boolean = false;
  posts: Post[] = [];
  sideCategories: any[] = [];
  topCategories: any[] = [];
  response: Response;
  isLoading: boolean = true;
  user: any;
  userId: string;
  title: string;
  date: Date;
  categoriesList: any[];
  categorySearch: any;
  categorySearchTemp: any;
  _timeout: any = null;
  isPostForCatgories: boolean = false;
  pre: PreCondition;
  public rowsOnPage = 10;
  BASE_URL: string;
  favCategories: any[] = [];
  constructor(private genericSer: GenericService, myElement: ElementRef, private lc: NgZone,
    private _route: ActivatedRoute,
    private _router: Router, private globalSer: GlobalService) {
    this.BASE_URL = this.globalSer.getValue();
  }
  loadCatgories() {
    this.genericSer.getAllResources(this.BASE_URL + UrlConfig.NOCOUNT)
      .subscribe(
      res => {
        this.response = <Response>res;
        if (this.pre.checkResponseValid(this.response)) {
          this.categoriesList = JSON.parse(this.response.data);
        }
      });
  }
  loadFavouriteCategories() {
    this.genericSer.getAllResources(this.BASE_URL + UrlConfig.USER_FAVOURITES + this.user._id)
      .subscribe(res => {
        this.response = <Response>res;
        if (this.response.data) {
          this.favCategories = JSON.parse(this.response.data);
        }
        else {
          return;
        }
      });
  }
  onstart() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if (this.user) {
      this.loadFavouriteCategories();
    }
    this._route.queryParams.subscribe((params: Params) => {
      this.interestingTopic = params['category'];
      this.title = params['title'];
      this.date = params['date'];
      if (this.title && this.date) {
        this.showQuestions(this.title, this.date);
      }
      if (this.interestingTopic) {
        this.getCategory(this.interestingTopic);
      }
      else {
        this.getPosts();
      }
    });
  }
  showQuestions(title, date) {
    this.genericSer.getAllResources(this.BASE_URL + UrlConfig.POST + "/" + title + "/" + date)
      .subscribe(
      res => {
        this.response = <Response>res;
        let postID = JSON.parse(this.response.data)[0]._id;
        this._router.navigate(['/prasna/uttar', postID]);
      }
      );
  }
  ngOnInit() {
    this.pre = new PreCondition();
    this.onstart();
    this.loadTopCatgories();
    this.loadCatgories();
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      $('.tooltippedForQuestionRow').find('tr').hover(function () {
        $('.qbox').tooltip({ delay: 50 });
      });
    });
  }
  ngOnDestroy() {

  }
  onCategoryChange() {
    console.log(this.categorySearch);
    this.categorySearchTemp = null;
    this._timeout = null;
    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.lc.runOutsideAngular(() => {
        this.lc.run(() => {
          console.log("VALUE", this.categorySearch);
          this.getCategory(this.categorySearch);
        });
      });

    }, 1000);

  }
  onCategoryClick(name) {
    this.isClicked = true;
    this.getCategory(name);
  }

  getCategory(name) {

    this.genericSer.getAllResources(this.BASE_URL + UrlConfig.POSTS + "/" + UrlConfig.CATEGORIES + "/" + name)
      .subscribe(
      response => {
        this.isPostForCatgories = true;
        this.response = response;
        if (this.pre.checkResponseValid(this.response)) {
          this.posts = JSON.parse(this.response.data);
          this.isLoading = false;
        }
      }
      );


  }
  loadTopCatgories() {
    this.genericSer.getAllResources(this.BASE_URL + UrlConfig.CATEGORIES + "/most/5").subscribe(
      res => {
        this.response = <Response>res;
        this.topCategories = JSON.parse(this.response.data);
      }
    );
  }
  onAddQuestion() {
    if (this.user.connected) {
      this._router.navigateByUrl("/login");
    }
    else {
      this._router.navigateByUrl("/sodumprasna")
    }
  }
  question(id) {
    this._router.navigate(["/prasna/uttar/", id]);
  }
  public getPosts() {
    this.genericSer.getAllResources(this.BASE_URL + UrlConfig.POSTS)
      .subscribe(
      response => {
        this.response = response;

        if (this.pre.checkResponseValid(this.response)) {
          this.posts = JSON.parse(this.response.data);

          for (const post of this.posts) {
            post.categories = post.category.split(",");
            this.sideCategories = this.sideCategories.concat(post.categories);
            let boj = [];
            post.categories.forEach((i, index) => {
              boj.push(i);
            });
            this.sideCategories = this.sideCategories.concat(boj.filter((i) => {
              return this.sideCategories.indexOf(i) < 0;
            }));

          }
          this.isLoading = false;
          this.show = true;
        }
      }
      )
  }
}
