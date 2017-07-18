import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/post';
import { GenericService } from '../../services/generic.service';
import { UrlConfig } from "../../_config/url.cofig";
import { Response } from "../../models/response";
import { PreCondition } from "../../_utils/precheckcondition";
import { Observable } from "rxjs/Observable";
import { User } from '../../models/user';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
 
  constructor( ) {

  }
  public ngOnInit() {
  
  }
 

  public ngOnDestroy() {

  }



}

