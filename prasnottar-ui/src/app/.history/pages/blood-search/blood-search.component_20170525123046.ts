import { Component, OnInit, AfterContentInit } from '@angular/core';
import { GenericService, GlobalService } from "../../services/index";

import { Router, ActivatedRoute, Params } from "@angular/router";
declare var $: any;
import { PreCondition } from "../../_utils/precheckcondition";
import { Response } from "../../models/response";
@Component({
  selector: 'app-blood-search',
  templateUrl: './blood-search.component.html',
  styleUrls: ['./blood-search.component.css']
})
export class BloodSearchComponent implements OnInit {
  bloodGroups = ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"];
  response: Response;
  donars: any[] = [];
  show = false;
  pre: PreCondition;
  img = "/assets/img/imagenotfound.png";
  BASE_URL:any;
  bloodGroup: any;
  location: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private globalService: GlobalService,
    private genericService: GenericService) {
    this.BASE_URL = this.globalService.getValue();
    this._route.queryParams.subscribe((params: Params) => {
      this.bloodGroup = params['bloodgroup'];
      this.location = params['location'];
      if(this.location){this.onBloodSearch(this.bloodGroup, this.location);}
      
    });
  }
  ngOnInit() {

    this.pre = new PreCondition();
  }
  onBloodSearch(bloodgroup, location) {
    if (!location) {
      location == "ba";
    }
    this.genericService.getAllResources(this.BASE_URL+ "blooddonar/search/" + bloodgroup + "/" + location)
      .subscribe(
      res => {
        this.response = <Response>res;
        if (this.pre.checkResponseValid(this.response)) {
          this.donars = JSON.parse(this.response.data);
          this.show = true;
        }
      });
  }

}
