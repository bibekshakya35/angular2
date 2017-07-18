import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Post } from "../../models/post";

import { Observable } from "rxjs/Observable";
import { AlertService, GenericService } from "../../services/index";
import { UrlConfig } from "../../_config/url.cofig";
import { Response } from "../../models/response";
import { Router, ActivatedRoute } from "@angular/router";
import { PreCondition } from '../../_utils/precheckcondition';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
declare var $: any;
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'
  ]
})
export class AddQuestionComponent implements OnInit {
  value: string = '';
  private currentUser: any;
  post: Post;
  isCategoryNull: boolean = false;
  public body: AbstractControl;
  response: Response;
  BASE_URL: string;
  questionAddUrl: string;
  public questionAddForm: FormGroup;
  precondition: PreCondition;
  categoriesList = [];
  categoriesMultiple: any[];
  isNotLoggedIn: boolean = true;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _questionSevice: GenericService,
    private _alertService: AlertService,
    private _fb: FormBuilder,
    private userServ: UserService,
    private globalSer: GlobalService
  ) {
    this.BASE_URL = this.globalSer.getValue();
    this.questionAddUrl = this.BASE_URL + UrlConfig.POST;
    this.precondition = new PreCondition();
  }
  ngOnInit() {

    this.checkUserLoggedIn();
    this.buildForm();
    this.loadCatgories();
  }
  loadCatgories() {
    this._questionSevice.getAllResources(this.BASE_URL + UrlConfig.NOCOUNT)
      .subscribe(
      res => {
        this.response = <Response>res;
        if (this.precondition.checkResponseValid(this.response)) {
          this.categoriesList = JSON.parse(this.response.data);
        }
      });
  }
  checkUserLoggedIn() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!this.precondition.isObjectEmpty(this.currentUser)) {
      this.isNotLoggedIn = false;
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

  filterCategories(event) {
    let query = event.query;
    this.categoriesMultiple = this.filterCategoriesMultiple(query, this.categoriesList);
  }
  filterCategoriesMultiple(query, categories: any[]): any[] {
    let filtered: any[] = [];
    categories.forEach((element, index) => {
      let category = categories[index];
      if (category.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(category);
      }
    });
    console.log(JSON.stringify(filtered));
    return filtered;
  }


  buildForm(): void {

    this.questionAddForm = this._fb.group(
      {
        title: ['', [Validators.minLength(10),
        Validators.maxLength(50),
        Validators.required]],
        body: ['', [Validators.minLength(10), Validators.required]],
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
      'minlength': 'title must be at least 10 characters long.',

    },
    'body': {
      'required': 'Question Body is required.',
      'minlength': 'Question Body must be at least 10 characters long.'
    },
    'category': {
      'required': 'Question Body is required.',
      'minlength': 'Question Body must be at least 4 characters long.'
    }
  };

  data: string = "";
  categoryLabel: string[];

  addQuestion() {
    console.log("DATA" + JSON.stringify(this.questionAddForm.value));
    if (this.currentUser) {
      this.questionAddForm.value.author = this.currentUser.name;
      this.questionAddForm.value.userid = this.currentUser.userid;
      this.questionAddForm.value.imageUrl = this.currentUser.avatarUrl;
    }
    else {
      this.questionAddForm.value.author = "NEPALI";
      this.questionAddForm.value.userid = "12345NEPali";
      this.questionAddForm.value.imageUrl = "/assets/img/imagenotfound.png";
    }
    this.questionAddForm.value.score = 0;
    this.questionAddForm.value.category.trim();
    this.questionAddForm.value.date = new Date();
    this.questionAddForm.value.categories = [this.questionAddForm.value.category];
    const addAnswer$ = this._questionSevice.addNewResource(this.BASE_URL + UrlConfig.POST, JSON.stringify(this.questionAddForm.value));
    const category$ = this._questionSevice.editRes(this.BASE_URL + UrlConfig.CATEGORIES, this.questionAddForm.value.categories);
    const combined$ = Observable.concat(category$, addAnswer$);
    combined$.subscribe(
      () => {
      },
      () => {
      },
      () => {
        this._router
          .navigate
          (["/prasna?title=" + this.questionAddForm.value.title + "&date=" + this.questionAddForm.value.date]);
      }
    );
  }
  onCancel() {
    $("#modal1").modal('close');
    this._router.navigateByUrl("/prasna");
  }
}

