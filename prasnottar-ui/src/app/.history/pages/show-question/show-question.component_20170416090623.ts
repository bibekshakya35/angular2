import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { AlertService, GenericService } from "../../services/index";
import { UrlConfig } from "../../_config/url.cofig";
import { Response } from "../../models/response";
import { PreCondition } from "../../_utils/precheckcondition";
import { Subscription } from "rxjs/Subscription";
import { Overlay } from 'angular2-modal';
import { Post } from "../../models/post";
import { Answer } from '../../models/answer';
import { Logger } from '../../models/logger';
import { Observable } from "rxjs/Observable";
@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent implements OnInit {
  response: Response;
  logger: Logger;
  user: any;
  public post: Post;
  isQuestionVoteClicked: boolean;
  isUpvoteClicked: boolean = false;
  isDownVoteClicked: boolean = false;
  isAnswerVoteChecked: boolean = false;

  title: string;
  author: string;

  isDownVoteClickedAns: boolean = false;
  isUpvoteClickedAns: boolean = false;
  answers: Answer[] = [];
  showAnswer: boolean = true;
  id: string;
  warnText: string;
  isItGuest: boolean = false;

  public body: AbstractControl;
  public answerForm: FormGroup;
  private sub: Subscription;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _questionShowServ: GenericService,
    private _alertService: AlertService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.sub = this._route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    if (this.user) {
      this.sub = this._route.params.subscribe(
        params => {
          this.title = params['title'];
          this.author = params['author'];
          this.getPostByTitleAndAuthor(this.title,this.author);
        }
      );
    }
    this.buildForm();
    this.getPostById(this.id);


  }
  private getPostByTitleAndAuthor(title, author) {
    this._questionShowServ.getAllResources(UrlConfig.BASE_URL + UrlConfig.POST + "/" + title + "/" + author).subscribe(
      res => {
        this.response = <Response>res;
        this.post = this.response.data;
      }
    );
  }
  private buildForm() {
    this.answerForm = this.fb.group(
      {
        id: [''],
        body: ['', [Validators.minLength(50), Validators.required]],
        postId: [this.id],
        date: [new Date().toISOString],
        author: [''],
        score: [0],
        userid: [''],
        createdOn: [''],
        imageUrl: ['']
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
   boxClick(name){
    if(name){
      console.log(name);
      this._router.navigateByUrl('/prasna?category='+name);
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
    this._questionShowServ.getResourceByUniqueCode(UrlConfig.BASE_URL + UrlConfig.POST, id)
      .subscribe(
      response => {
        this.response = <Response>response;
        if (this.response.data) {
          this.post = JSON.parse(this.response.data);
          this.post.categories = this.post.category.split(",");
          console.log("POST .. " + JSON.stringify(this.post));
        }
        else {
          this._router.navigateByUrl("/prasna");
        }
      }
      );
  }
  addAnswer() {
    this.answerForm.value.id = this.makeId();
    if (this.user) {
      this.answerForm.value.userid = this.user.userid;
      this.answerForm.value.author = this.user.name;
      this.answerForm.value.imageUrl = this.user.avatarUrl;
    }
    else {
      this.answerForm.value.userid = 0;
      this.answerForm.value.author = "Guest";
      this.answerForm.value.imageUrl = "https://bibekshakya35.github.io/img/user.png";
    }
    this.answerForm.value.createdOn = new Date();
    this.logger = this.makeLoggerForAnswer(this.answerForm.value.author + " added an answer to <br><b>your question</b>", "NOTIFICATION", this.post.userid);
    console.log("LOGGER" + JSON.stringify(this.logger));
    this.saveLogger(this.logger);
    this._questionShowServ.
      editRes(UrlConfig.BASE_URL + UrlConfig.POST + "/" + this.id + UrlConfig.ADDANSWER, JSON.stringify(this.answerForm.value))
      .subscribe(
      res => {
        this.response = <Response>res;
        let precheck = new PreCondition();
        let pre = precheck.checkResponseValid(this.response);
        if (pre) {
          this.getPostById(this.id);
          console.log("this is the end");
          this.buildForm();
        }
        else {
          console.log("this is the end");
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

    return this._questionShowServ.getAllResources(UrlConfig.BASE_URL + UrlConfig.LOGS + "/" + UrlConfig.POST + "/" + userid + "/" + postid)
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

    return this._questionShowServ.getAllResources(UrlConfig.BASE_URL + UrlConfig.LOGS + "/" + UrlConfig.ANSWER + "/" + userid + "/" + Answer)
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
            loggerMsg, "REP", userid);
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

  makeId(): string {
    let text = "";
    let possible = "DJKSLAHHHQEKHKJHAKJHKJSHADKHSDAKHDKSAHKDHASKHBQWMNBEMNBQXOIAS";
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  //makeUpdate Vote Save logger

  makeUpdate(post) {
    delete post._id;
    this._questionShowServ.editRes(UrlConfig.BASE_URL + UrlConfig.POST + "/" + this.id, post)
      .subscribe(
      res => {
        this.response = <Response>res;
        this.getPostById(this.id);

      }
      );
  }
  vote(userId: string, vote: number) {
    this._questionShowServ.editRes(UrlConfig.BASE_URL + UrlConfig.USER + "/" + userId + "/reputation", { "data": vote })
      .subscribe(
      res => {
        this.response = <Response>res;
      }
      );
  }
  saveLogger(loggers: any) {
    this._questionShowServ.
      addNewResource(UrlConfig.BASE_URL + UrlConfig.LOG,
      loggers
      ).subscribe(

      );
  }

}
