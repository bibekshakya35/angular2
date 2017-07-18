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
  constructor(
      private _route: ActivatedRoute,
    private _router: Router,
    private globalService: GlobalService,
    private genericService: GenericService) { }
  bloodGroup: any;
  location: any;
  BASE_URL: any;
  ngOnInit() {
    this.BASE_URL = this.globalService.getValue();
    this.pre = new PreCondition();
  }
  ngAfterContentInit() {
  
  }
  onBloodSearch() {
    if (!this.location) {
      this.location == "ba";
    }
    this.genericService.getAllResources(this.BASE_URL + "blooddonar/search/" + this.bloodGroup + "/" + this.location)
      .subscribe(
      res => {
        this.response = <Response>res;
        if (this.pre.checkResponseValid(this.response)) {
          this.donars = this.response.data;
          console.log(this.donars);
          this.show = true;
        }
      });
  }

}
