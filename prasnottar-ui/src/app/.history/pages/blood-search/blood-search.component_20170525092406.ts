import { Component, OnInit } from '@angular/core';

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
