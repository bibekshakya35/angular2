import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Post } from "../../models/post";

import { BreadcrumbService } from '../../services/breadcrumb.service';
import { AlertService, GenericService } from "../../services/index";
import { UrlConfig } from "../../_config/url.cofig";
import { Response } from "../../models/response";
import { Router, ActivatedRoute } from "@angular/router";
import { PreCondition } from '../../_utils/precheckcondition';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'
  ],
   styles: [
    `
     
    `
  ],
})
export class AddQuestionComponent implements OnInit {
  value: string = '';
  private currentUser: any;
  post: Post;
  isCategoryNull: boolean = false;
  public body: AbstractControl;
  response: Response;
  questionAddUrl: string = UrlConfig.BASE_URL + UrlConfig.POST;
  public questionAddForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _questionSevice: GenericService,
    private _alertService: AlertService,
    private _fb: FormBuilder,
    private breadServ: BreadcrumbService,
    private userServ: UserService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(JSON.stringify(this.currentUser));
    if (this.currentUser === undefined || this.currentUser.userid === "" || undefined || null) {
      console.log("here we are");
      this._router.navigate(['/prasna']);
    }



  }
  public editorConfig = {
    theme: 'snow',
    placeholder: "Enter your Question Briefly",
    modules: {

      toolbar: [
        [{ 'size': ['small', false, 'large', 'huge'] }], ,
        ['bold', 'italic'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],

      ]
    }
  };
  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {

    this.questionAddForm = this._fb.group(
      {
        title: ['', [Validators.minLength(20),
        Validators.maxLength(50),

        Validators.required]],
        body: ['', [Validators.minLength(20), Validators.required]],
        category: [''],
        date: [''],
        score: [''],
        imageUrl: ['']
      }
    );
    this.body = this.questionAddForm.controls['body'];
    this.questionAddForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    this._alertService.clear();
    if (!this.questionAddForm) { return; }
    const form = this.questionAddForm;

    for (const field in this.questionAddErrors) {
      // clear previous error message (if any)
      this.questionAddErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.questionAddErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  questionAddErrors = {
    title: "",
    body: ""
  }
  validationMessages = {
    'title': {
      'required': 'title is required.',
      'minlength': 'title must be at least 20 characters long.',
      'maxlength': 'title cannot be more than 50 characters long.'
    },
    'body': {
      'required': 'Question Body is required.',
      'minlength': 'Question Body must be at least 50 characters long.'
    },
    'category': {
      'required': 'Question Body is required.',
      'minlength': 'Question Body must be at least 4 characters long.'
    }
  };
  addCategory() {
    console.log("value");
  }
  data: string = "";
  categoryLabel: string[];
  onSpace(e) {
    e.preventDefault();
    if (this.data === '') {
      this.data = this.value;
      this.value = "";
      this.data.replace(/\s/g, '');
    }
    else {
      this.data += "," + this.value;
      this.value = "";
      this.data.replace(/\s/g, '');
    }

    this.categoryLabel = this.data.split(",");
    console.log(this.value == undefined);
    console.log(this.data);
  }
  addQuestion() {
    console.log("Add Question...");
    this.questionAddForm.value.author = this.currentUser.name;
    this.questionAddForm.value.userid = this.currentUser.userid;
    this.questionAddForm.value.score = 0;
    if (this.value) {

      this.questionAddForm.value.category = this.value;
    }
    else {
      this.questionAddForm.value.category = this.data;
    }

    this.questionAddForm.value.imageUrl = this.currentUser.avatarUrl;
    this.questionAddForm.value.category.replace(/\s/g, '');
    this.questionAddForm.value.date = new Date().toISOString();
    console.log(JSON.stringify(this.questionAddForm.value));
    let arr = this.questionAddForm.value.category.split(',');
    if (arr < 3) {
      console.log("arrat data" + arr);
    }
    else {
      this._questionSevice.addNewResource(UrlConfig.BASE_URL + UrlConfig.POST, JSON.stringify(this.questionAddForm.value))
        .subscribe(
        res => {
          this.response = <Response>res;
          console.log(this.response);
          let precheck = new PreCondition();
          let pre = precheck.checkResponseValid(this.response);
          if (pre) {
            this._alertService.success(this.response.message, true);
            this._router.navigate(["/prasna"]);
            this._alertService.success(this.response.message, true);
          }
          else {
            console.log("this is the end");
            this._alertService.error(this.response.message);
          }
        }

        );
    }
  }
}
