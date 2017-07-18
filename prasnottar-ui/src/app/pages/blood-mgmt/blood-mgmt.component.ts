import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MenuItem, Message } from 'primeng/primeng';
import { GenericService, GlobalService } from "../../services/index";
import { Donar } from "../../models/donar";
import { UrlConfig } from "../../_config/url.cofig";
import { PreCondition } from "../../_utils/precheckcondition";
import { Response } from "../../models/response";
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-blood-mgmt',
  templateUrl: './blood-mgmt.component.html',
  styles: [`
          .ui-steps .ui-steps-item {
              width: 25%;
          }
          
          .ui-steps.steps-custom {
              margin-bottom: 30px;
          }
          
          .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
              height: 10px;
              padding: 0 1em;
          }
          
          .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
              background-color: #0081c2;
              color: #FFFFFF;
              display: inline-block;
              width: 36px;
              border-radius: 50%;
              margin-top: -14px;
              margin-bottom: 10px;
          }
          
          .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
              color: #555555;
          }
      `],
  encapsulation: ViewEncapsulation.None
})
export class BloodMgmtComponent implements OnInit, AfterViewInit {
  items: MenuItem[];
  msgs: Message[] = [];
  donar: Donar = new Donar();
  name: any;
  location: any;
  city: any;
  dob: any;
  email: any;
  user: any;
  mobile: any;
  bloodGroup: any;
  contactTime: any = "";
  disease: any = "";
  lastBloodDuration: any = 0;
  BASE_URL: any;
  pre: PreCondition;
  response: Response;
  bloodDonationDuration: any[] = [
    {
      "display": "None",
      "value": 0
    },
    {
      "display": "More Than One Month",
      "value": 1
    },
    {
      "display": "More Than Two Month",
      "value": 2
    },
    {
      "display": "More Than Three Month",
      "value": 3
    }
  ]
  bloodGroups = ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"];
  activeIndex: number = 0;
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private genericService: GenericService) {
    this.BASE_URL = this.globalService.getValue();
    this.pre = new PreCondition();
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }


  ngOnInit() {
    this.items = [{
      label: 'Information',
    },
    {
      label: 'Blood Donation History',
    },
    {
      label: 'At last',
    }
    ];
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      $('select').material_select();
      $('.selectTime').material_select();
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 100,
        onClose: function () {
          console.log('done', this.get('select', 'yyyy-mm-dd'));
          localStorage.removeItem("dob");
          localStorage.setItem("dob", this.get('select', 'yyyy-mm-dd'));
        }
      });
    });
  }
  onNext() {
    this.msgs = [];
    if (this.activeIndex == 0) {
      this.dob = localStorage.getItem("dob");
      console.log("dob", this.dob);
      if (this.name === undefined || this.name === null || this.name.trim().length < 5) {
        this.generateMessage("Your Name", "Please give us a valid name");
        return;
      }
      if (this.location === undefined || this.location === null || this.location.trim().length < 2) {
        this.generateMessage("Your Current Location", "Please give us a valid location");
        return
      }
      if (this.city === undefined || this.city === null) {
        this.generateMessage("You City", "Please select your city");
        return;
      }
      if (this.dob === undefined || this.dob === null) {
        this.generateMessage("Date of birth", "Please select your date of birth");
        return;
      }
      if (!this.pre.validateEmail(this.email)) {
        this.generateMessage("Email address", "Please give us a valid email address");
        return;
      }
    }
    if (this.activeIndex === 2) {
      this.donar.name = this.name;
      this.donar.location = this.location;
      this.donar.city = this.city;
      this.donar.dob = this.dob;
      this.donar.emailid = this.email;
      this.donar.mobile = this.mobile;
      this.donar.bloodgroup = this.bloodGroup;
      this.donar.contactTime = this.contactTime;
      this.donar.disease = this.disease;
      this.donar.lastBloodDuration = this.lastBloodDuration;
      if (this.user) {
        this.donar.avatarUrl = this.user.avatarUrl;
      }
      else {
        this.donar.avatarUrl = "/assets/img/imagenotfound.png";
      }

      console.log(JSON.stringify(this.donar));
      this.genericService.addNewResource(this.BASE_URL + UrlConfig.BLOODS_DONARS, this.donar)
        .subscribe(
        res => {
          this.response = <Response>res;
          if (this.pre.checkResponseValid(this.response)) {
            this.msgs = [];
            this.msgs.push({
              severity: 'success', summary: "Blood Doantion", detail: this.response.message
            });
            $('.modal').modal("close");
          }
          else {
            this.msgs.push({
              severity: 'error', summary: "Blood Doantion", detail: this.response.message
            });
            this.activeIndex = 0;
            return;
          }
        }
        );
      this.activeIndex--;
    }

    $(document).ready(function () {
      $('.selectTime').material_select();
    });
    this.activeIndex++;

  }
  onCancel() {
    $('.modal').modal("close");
  }
  generateMessage(title, msg) {
    this.msgs = [];
    this.msgs.push({
      severity: 'error', summary: title, detail: msg
    });
  }
  checkIfNotNull(obj) {
    if (obj === null || obj === undefined) {
      return true;
    }
    else {
      return false;
    }
  }
}
