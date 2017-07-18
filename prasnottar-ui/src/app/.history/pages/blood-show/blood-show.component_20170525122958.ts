import { Component, OnInit, AfterContentInit } from '@angular/core';
import { GenericService, GlobalService } from "../../services/index";
declare var $: any;
import { PreCondition } from "../../_utils/precheckcondition";
import { Response } from "../../models/response";
import { Router } from "@angular/router";
@Component({
  selector: 'app-blood-show',
  templateUrl: './blood-show.component.html',
  styleUrls: ['./blood-show.component.css']
})
export class BloodShowComponent implements OnInit, AfterContentInit {
  bloodGroups = ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"];
  response: Response;
  donars: any[] = [];
  show = false;
  pre: PreCondition;
  img = "/assets/img/imagenotfound.png";
  constructor(
    private globalService: GlobalService,
    private genericService: GenericService, private router: Router) { }
  bloodGroup: any;
  location: any;
  BASE_URL: any;
  ngOnInit() {
    this.BASE_URL = this.globalService.getValue();
    this.pre = new PreCondition();
  }
  ngAfterContentInit() {
    $(".hover").mouseleave(
      function () {
        $(this).removeClass("hover");
      }
    );
    $(document).ready(function () {

      $('.modal').modal({
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
      $('select').material_select();
    });

  }
  onBloodSearch() {
   if(this.location){
      this.router.navigateByUrl("blood/search?bloodgroup=" + this.bloodGroup + "&location=" + this.location);
   }
   else{
      this.router.navigateByUrl("blood/search?bloodgroup=" + this.bloodGroup);
   }
  }
}
