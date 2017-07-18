import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-exchange-book',
  templateUrl: './exchange-book.component.html',
  styleUrls: ['./exchange-book.component.css']
})
export class ExchangeBookComponent implements OnInit, AfterViewInit {
  bookIHave: any;
  authorOrPublicationIHave: any;
  bookIWant: any;
  authorOrPublicationIWant: any;
  emailMe: any;
  callOrSmsMe: any;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      $('.flexsearch--input').on('focus', function (e) {
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
}
