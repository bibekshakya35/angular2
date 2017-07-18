import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
declare var $: any;
@Component({
  selector: 'app-quick-question',
  templateUrl: './quick-question.component.html',
  styleUrls: ['./quick-question.component.css']
})
export class QuickQuestionComponent implements OnInit, AfterViewInit {
  currentUser: any;
  isNotLoggedIn = true;
  constructor(myElement: ElementRef) { }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser) {
      this.isNotLoggedIn = false;
    }
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      $('.quickQuestion').on('focus', function (e) {
        console.log("INSIDE ");
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
      });
    });

  }
  addQuestion() {

  }


}
