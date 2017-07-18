import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';

import { PreCondition } from "../../_utils/precheckcondition";
import { Response } from "../../models/response";
import { UrlConfig } from "../../_config/url.cofig";
import { GlobalService } from '../../services/global.service';
import { GenericService } from '../../services/generic.service';
declare var $: any;
@Component({
  selector: 'app-fav-category',
  templateUrl: './fav-category.component.html',
  styleUrls: ['./fav-category.component.css']
})
export class FavCategoryComponent implements OnInit, AfterViewInit, AfterContentInit {
  categories: any[];
  favCategories: any[] = [];
  BASE_URL: string;
  response: Response;
  searchCategory: any;
  pre: PreCondition;
  user: any;
  constructor(private genericSer: GenericService, private globalSer: GlobalService) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.BASE_URL = this.globalSer.getValue();
  }

  ngOnInit() {
    this.pre = new PreCondition();
    this.loadCatgories();
  }
  ngAfterContentInit() {
    if (this.user && this.user.favourites) {
      this.favCategories = this.user.favourites;
    }
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      $('.favCategory').on('focus', function (e) {
        console.log("INSIDE ");
        $('#modalFavCatgory').modal({
          dismissible: true, // Modal can be dismissed by clicking outside of the modal
          opacity: .5, // Opacity of modal background
          inDuration: 300, // Transition in duration
          outDuration: 200, // Transition out duration
          startingTop: '4%', // Starting top style attribute
          endingTop: '10%', // Ending top style attribute
          ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            console.log(modal, trigger);
          },
          complete: function () { } // Callback for Modal close
        }
        );
      });
    });

  }
  loadCatgories() {
    this.genericSer.getAllResources(this.BASE_URL + UrlConfig.NOCOUNT)
      .subscribe(
      res => {
        this.response = <Response>res;
        if (this.pre.checkResponseValid(this.response)) {
          this.categories = JSON.parse(this.response.data);
          if (this.user && this.user.favourites) {
            let temp = this.user.favourites;
            this.categories = this.categories.filter(element=> temp.indexOf(element)<0);
          }
          console.log(this.categories);
        }
      });
  }
  addCategory(category, index) {
    console.log(category, index);
    this.favCategories.push(category);
    this.categories.splice(index, 1);
  }
  closeModal() {
    $('#modalFavCatgory').modal('close');
    if (this.user) {
      this.user.favourites = this.favCategories;
      this.genericSer.editRes(this.BASE_URL + UrlConfig.USER + "/" + this.user._id + "/" + UrlConfig.FAVOURITES, this.favCategories)
        .subscribe(res => {
          console.log(res);
          location.reload();
        })
    }
  }
  cancelModal() {
    $('#modalFavCatgory').modal('close');
  }
}
