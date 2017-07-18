import { Component, OnInit, OnChanges, AfterContentInit } from '@angular/core';
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
@Component({
  selector: 'questions-box',
  templateUrl: './questions-box.component.html',
  styleUrls: ['./questions-box.component.css']
})
export class QuestionsBoxComponent implements OnInit {
  public html: string;
  interestingTopic: string;
  isClicked : boolean = false;
  posts: Post[] = [];
  sideCategories: any[] = [];
  categories: any[] = [];
  response: Response;
  user: any;
  userId: string;
  isPostForCatgories: boolean = false;
  public rowsOnPage = 10;
  constructor(private genericSer: GenericService,
    private _user_serv: UserService,
    private _route: ActivatedRoute,
    private _router: Router, ) {

  }
  onstart() {
    this._user_serv.currentUser.subscribe((user: any) => this.user = user);
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if (!this.user) {
      this._route.queryParams.subscribe((params: Params) => {
        this.userId = params['id'];
        if (this.userId) {
          this.getUserById(this.userId);
        }
      });
    }
    this._route.queryParams.subscribe((params: Params) => {
      this.interestingTopic = params['category'];
      if (this.interestingTopic) {
        this.getCategory(this.interestingTopic);
      }
      else{
        this.getPosts();
      }
    });
  }
  ngOnInit() {
    this.onstart();
    if (this.user) {

      setInterval(() => {
        if (JSON.parse(localStorage.getItem("currentUser"))._id !== null) {
          this.userId = JSON.parse(localStorage.getItem("currentUser"))._id;
          if (this.userId || this.userId !== null || this.userId !== undefined) {
            this.getUserById(this.userId);
          }
        }
      }, 5000);
    }
    this.loadCategories();
  }

  getUserById(id) {
    if (id !== null) {

      this.genericSer.getResourceByUniqueCode(UrlConfig.BASE_URL + UrlConfig.USER,
        id).subscribe(
        response => {
          this.response = response;

          let pre = new PreCondition();
          if (pre.checkResponseValid(this.response)) {
            this.user = JSON.parse(this.response.data);
            this.user.connected = true;

            if (this.user.userType === 'local') {
              this.user.avatarUrl = "https://bibekshakya35.github.io/img/men_age_group_21600.png";
              localStorage.clear();
              localStorage.setItem("currentUser", JSON.stringify(this.user));
            }
            if (this.user.userType === 'facebook') {
              this.genericSer.getImageFromFacebook("https://graph.facebook.com/" + this.user.userid + "/picture?redirect=false&height=200&width=200")
                .subscribe(
                res => {
                  let data = res.data;
                  this.user.avatarUrl = data.url;
                  localStorage.clear();
                  localStorage.setItem("currentUser", JSON.stringify(this.user));
                }
                );
            }
            else if (this.user.userType === "twitter") {
              localStorage.clear();
              localStorage.setItem("currentUser", JSON.stringify(this.user));
            }
            else if (this.user.userType === "google") {
              localStorage.clear();
              localStorage.setItem("currentUser", JSON.stringify(this.user));
            }
            else {
              localStorage.clear();
              localStorage.setItem("currentUser", JSON.stringify({
                "name": "Mr. Nepali",
                "avatarUrl": "https://bibekshakya35.github.io/img/men_age_group_21600.png"
              }));
            }
          }
        }

        );

    }



  }
  onCategoryClick(name) {
    this.isClicked = true;
    this.getCategory(name);
  }

  getCategory(name) {
    this.genericSer.getAllResources(UrlConfig.BASE_URL + UrlConfig.POSTS + "/" + UrlConfig.CATEGORIES + "/" + name)
      .subscribe(
      response => {
        this.isPostForCatgories = true;
        this.response = response;
        this.posts = JSON.parse(this.response.data);
      }
      );
  }
  loadCategories() {
    this.genericSer.getAllResources(UrlConfig.BASE_URL + UrlConfig.CATEGORIES + "/most/10").subscribe(
      res => {
        this.response = <Response>res;
        this.categories = JSON.parse(this.response.data);

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
    this.genericSer.getAllResources(UrlConfig.BASE_URL + UrlConfig.POSTS)
      .subscribe(
      response => {
        this.response = response;
        let pre = new PreCondition();
        if (pre.checkResponseValid(this.response)) {
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

        }
      }
      )
  }






}
