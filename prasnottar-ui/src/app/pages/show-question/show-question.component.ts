import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { AlertService, GenericService } from "../../services/index";
import { UrlConfig } from "../../_config/url.cofig";
import { Response } from "../../models/response";
import { PreCondition } from "../../_utils/precheckcondition";
import { Subscription } from "rxjs/Subscription";
import { Post } from "../../models/post";
import { Answer } from '../../models/answer';
import { Logger } from '../../models/logger';
import { Observable } from "rxjs/Observable";
import { GlobalService } from '../../services/global.service';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent implements OnInit, AfterContentInit, OnDestroy {
  pageUrl: string;
  response: Response;
  logger: Logger;
  user: any;
  public post: any;
  isLoading: boolean = true;
  isQuestionVoteClicked: boolean;
  isUpvoteClicked: boolean = false;
  isDownVoteClicked: boolean = false;
  isAnswerVoteChecked: boolean = false;
  BASE_URL: string;
  title: string;
  author: string;
  isDownVoteClickedAns: boolean = false;
  isUpvoteClickedAns: boolean = false;
  answers: Answer[] = [];
  showAnswer: boolean = true;
  id: string;
  warnText: string;
  isItGuest: boolean = false;
  pre: PreCondition;
  public body: AbstractControl;
  public answerForm: FormGroup;
  private sub: Subscription;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _questionShowServ: GenericService,
    private _alertService: AlertService,
    private fb: FormBuilder,
    private globalSer: GlobalService,
    private meta: Meta
  ) {
    this.pageUrl = window.location.href;
    this.meta.removeTag("description");
    this.BASE_URL = this.globalSer.getValue();
    this.pre = new PreCondition();

    if (this.user) {
      this.sub = this._route.params.subscribe(
        params => {
          this.title = params['title'];
          this.author = params['author'];
          this.getPostByTitleAndAuthor(this.title, this.author);
        }
      );
    }
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.buildForm();



  }
  onReadId() {
    this.sub = this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.getPostById(this.id);
      }
    );
  }
  ngAfterContentInit() {
    this.onReadId();
  }
  private getPostByTitleAndAuthor(title, author) {
    this._questionShowServ.getAllResources(this.BASE_URL + UrlConfig.POST + "/" + title + "/" + author).subscribe(
      res => {
        this.response = <Response>res;
        this.post = this.response.data;
      }
    );
  }
  private buildForm() {
    this.answerForm = this.fb.group(
      {
        body: ['', [Validators.minLength(50), Validators.required]],
        postId: [this.id],
        date: [new Date().toISOString],
        author: [''],
        score: [0],
        userid: [''],
        createdOn: ['']
      }
    );
    this.body = this.answerForm.controls['body'];
    this.answerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    this._alertService.clear();
    if (!this.answerForm) { return; }
    const form = this.answerForm;

    for (const field in this.answerError) {
      // clear previous error message (if any)
      this.answerError[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.answerError[field] += messages[key] + ' ';
        }
      }
    }
  }
  answerError = {
    body: ""
  }

  validationMessages = {
    'body': {
      'required': ' Body is required.',
      'minlength': ' Body must be at least 50 characters long.'
    }
  };
  boxClick(name) {
    if (name) {
      console.log(name);
      this._router.navigateByUrl('/prasna?category=' + name);
    }
  }
  public editorConfig = {
    theme: 'snow',
    placeholder: "Enter your answer briefly",
    modules: {

      toolbar: [
        [{ 'size': ['small', false, 'large', 'huge'] }], ,
        ['bold', 'italic'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],

      ]
    }
  };

  getPostById(id: string) {
    this._questionShowServ.getResourceByUniqueCode(this.BASE_URL + UrlConfig.POST, id)
      .subscribe(
      response => {
        this.response = <Response>response;
        if (this.pre.checkResponseValid(this.response)) {
          this.post = JSON.parse(this.response.data);
          this.isLoading = false;
          this.post.categories = this.post.category.split(",");
          let bodyFor = this.removeHtmlTag(this.post.body);
          let data = this.post.title + " : " + bodyFor;
          // this.meta.addTag({
          //   property: "og:title",
          //   content: this.post.title
          // });
          // this.meta.addTag({
          //   property: "og:image",
          //   content: "http://www.prasnottar.com/assets/img/prasna.png"
          // });
          // this.meta.addTag({
          //   property: "og:description",
          //   content: bodyFor
          // });
          // this.meta.addTag({
          //   property: "og:url",
          //   content: this.pageUrl
          // });
          // this.meta.addTag({
          //   property: "og:type",
          //   content: "article"
          // })
          // this.meta.addTag(
          //   {
          //     name: 'description',
          //     content: data
          //   }
          // );

        }
        else {
          this._router.navigateByUrl("/prasna");
        }
      }
      );
  }
  ngOnDestroy() {
    // this.meta.removeTag("og:title");

    // this.meta.removeTag("og:description");
    // this.meta.removeTag("og:type");

    // this.meta.removeTag("og:url");
    // this.meta.removeTag("og:image");



  }
  removeHtmlTag(value) {
    return value.replace(/<[^>]*>/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
  addAnswer() {
    if (this.user) {
      this.answerForm.value.userid = this.user.userid;
      this.answerForm.value.author = this.user.name;
      this.answerForm.value.imageUrl = this.user.avatarUrl;
    }
    else {
      this.answerForm.value.userid = 0;
      this.answerForm.value.author = "Guest";
      this.answerForm.value.imageUrl = "/assets/img/imagenotfound.png";
    }
    this.answerForm.value.createdOn = new Date();
    this.logger = this.makeLoggerForAnswer(this.answerForm.value.author + " added an answer to <br><b>your question</b>", "NOTIFICATION", this.post.userid);
    this.saveLogger(this.logger);
    this._questionShowServ.
      editRes(this.BASE_URL + UrlConfig.POST + "/" + this.id + UrlConfig.ADDANSWER, JSON.stringify(this.answerForm.value))
      .subscribe(
      res => {
        this.response = <Response>res;
        let precheck = new PreCondition();
        let pre = precheck.checkResponseValid(this.response);
        if (pre) {
          this.getPostById(this.id);
          this.buildForm();
        }
        else {
          this._alertService.error(this.response.message);
        }
      }
      );

  }
  public makeLoggedForVote(userid, postId) {
    return {
      "userid": userid,
      "postid": postId,
      "type": "VOTE",
      "status": true
    };
  }
  public makeLoggedForVoteAnswer(userid, answerid) {
    return {
      "userid": userid,
      "answerid": answerid,
      "type": "VOTE",
      "status": true
    };
  }

  public makeLoggerForAnswer(msg, type, userid): Logger {
    let logger = new Logger();
    logger.pageLink = window.location.href;
    logger.type = type;
    logger.userid = userid;
    logger.body = msg;
    logger.status = true;
    return logger;
  }
  upvote() {
    if (!this.user) {
      this.warnText = "Please login to use voting system";
    }
    if (this.post.userid === this.user.userid) {
      this.warnText = "You cant cast to vote to your own post.";
    }
    else {
      if (!this.isQuestionVoteClicked) {
        this.checkIfVoteInPostAlreadyExists(this.user.userid, this.post._id,
          "Your reputation is increased by 5<br> <b>due to upvote in your question</b>",
          "upvote"
        );
      }
      else {
        this.warnText = "Dont submit your vote multiple time.";
      }

    }

  }
  checkIfVoteInPostAlreadyExists(userid, postid, loggerMsg, type): any {

    return this._questionShowServ.getAllResources(this.BASE_URL + UrlConfig.LOGS + "/" + UrlConfig.POST + "/" + userid + "/" + postid)
      .subscribe(
      res => {
        this.response = <Response>res;
        this.isQuestionVoteClicked = JSON.parse(this.response.data).status;
        if (this.isQuestionVoteClicked) {
          if (type === "upvote") {
            this.isUpvoteClicked = true;
            this.post.score++;
            this.vote(this.post.userid, +5);
          }
          else {
            this.isDownVoteClicked = true;
            this.post.score--;
            this.vote(this.post.userid, -2);
          }
          this.logger = this.makeLoggerForAnswer(loggerMsg
            , "NOTIFICATION", this.post.userid);
          this.makeUpdate(this.post);
          this.saveLogger([
            this.logger,
            this.makeLoggedForVote(this.user.userid, this.id)
          ]);

        }
        else {
          console.log("chiryo .........");
          this.warnText = "you already place a vote for this post";
        }
      }
      );
  }

  downvote() {
    if (!this.user) {
      this.warnText = "Please login to use voting system";
    }
    if (this.post.userid === this.user.userid) {
      this.warnText = "You cant cast to vote to your own post.";
    }
    else {
      if (!this.isQuestionVoteClicked) {
        this.checkIfVoteInPostAlreadyExists(this.user.userid, this.post._id,
          "Your reputation is decreased by 2<br> <b>due to downvote in your question</b>",
          "upvote"
        );
      }
      else {
        this.warnText = "Dont submit your vote multiple time.";
      }
    }
  }


  upvoteans(userid, answerid) {
    if (!this.isAnswerVoteChecked) {

      let index = this.post.answers.findIndex(ans => ans.userid === userid);
      if (this.post.answers[index].userid === this.user.userid) {
        this.warnText = "You cant cast to vote to your own answer.";
      }
      else {
        if (this.user) {
          this.checkIfVoteInAnswerAlreadyExists(userid, answerid,
            "Your reputation score is increase by 10<br><b> due to upvote in your answer</b>",
            "upvote"
          );
        }
      }
    }
    else {
      this.warnText = "Dont submit your vote multiple time.";
    }
  }









  checkIfVoteInAnswerAlreadyExists(userid, answerid, loggerMsg, type): any {

    return this._questionShowServ.getAllResources(this.BASE_URL + UrlConfig.LOGS + "/" + UrlConfig.ANSWER + "/" + userid + "/" + Answer)
      .subscribe(
      res => {
        this.response = <Response>res;
        this.isAnswerVoteChecked = JSON.parse(this.response.data).status;
        if (this.isAnswerVoteChecked) {
          let index = this.post.answers.findIndex(ans => ans.userid === userid);
          console.log("index +++ " + index);
          if (type === "upvote") {
            this.isUpvoteClickedAns = true;
            this.vote(this.post.answers[index].userid, +10);
            this.post.answers[index].score++;
          }
          else {
            this.isDownVoteClickedAns = true;
            this.vote(this.post.answers[index].userid, -2);
            this.post.answers[index].score--;
          }

          this.makeUpdate(this.post);
          this.logger = this.makeLoggerForAnswer(
            loggerMsg, "NOTIFICATION", userid);
          this.saveLogger([
            this.logger,
            this.makeLoggedForVoteAnswer(userid, answerid)
          ]);

        }
        else {
          console.log("chiryo .........");
          this.warnText = "you already place a vote for this post";
        }
      }
      );
  }




  downvoteans(userid, answerid) {
    if (!this.isAnswerVoteChecked) {
      this.isAnswerVoteChecked = true;
      let index = this.post.answers.findIndex(ans => ans.userid === userid);
      if (this.post.answers[index].userid === this.user.userid) {
        this.warnText = "You cant cast to vote to your own answer.";
      }
      else {
        if (this.user) {
          if (!this.isAnswerVoteChecked) {
            this.checkIfVoteInAnswerAlreadyExists(userid, answerid,
              "Your reputation score is decreased by 2<br><b> due to downvote in your answer</b>",
              "downvote"
            );
          }
          else {
            this.warnText = "Dont submit your vote multiple time.";
          }
        }

      }

    }
    else {
      this.warnText = "you already place a vote for this post";
      setTimeout(() => {
        this.warnText = "";
      }, 5000);
    }
  }


  //makeUpdate Vote Save logger

  makeUpdate(post) {
    delete post._id;
    this._questionShowServ.editRes(this.BASE_URL + UrlConfig.POST + "/" + this.id, post)
      .subscribe(
      res => {
        this.response = <Response>res;
        this.getPostById(this.id);

      }
      );
  }
  vote(userId: string, vote: number) {
    this._questionShowServ.editRes(this.BASE_URL + UrlConfig.USER + "/" + userId + "/reputation", { "data": vote })
      .subscribe(
      res => {
        this.response = <Response>res;
      }
      );
  }
  saveLogger(loggers: any) {
    this._questionShowServ.
      addNewResource(this.BASE_URL + UrlConfig.LOG,
      loggers
      ).subscribe(

      );
  }

}
