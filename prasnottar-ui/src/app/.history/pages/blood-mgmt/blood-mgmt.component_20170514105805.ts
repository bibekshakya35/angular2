import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MenuItem, Message } from 'primeng/primeng';
import { GenericService, GlobalService } from "../../services/index";
import { Donar } from "../../models/donar";
import { UrlConfig } from "../../_config/url.cofig";

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
  private items: MenuItem[];
  msgs: Message[] = [];
  donar: Donar = new Donar();
  name: any;
  location: any;
  city: any;
  dob: any;
  email: any;
  mobile: any;
  bloodGroup: any;
  contactTime: any = "";
  disease: any = "";
  lastBloodDuration: any = 0;
  BASE_URL: any;
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
    private globalService: GlobalService,
    private genericService: GenericService) {
    this.BASE_URL = this.globalService.getValue();
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
        select: new Date() // Creates a dropdown of 15 years to control year
      });
    });

  }
  onNext() {
    this.msgs = [];
    if (this.activeIndex == 0) {
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
      if (this.checkIfNotNull(this.email)){
        this.generateMessage("Email address","Please give us a valid email address");
        return;
      }
      if(this.checkIfNotNull(this.bloodGroup)){
        this.generateMessage("Your BLOOD GROUP","Please give us a your blood group");
        return;
      }
      if(this.checkIfNotNull())
      else {
        this.activeIndex++;
      }
    }
    $(document).ready(function () {
      $('.selectTime').material_select();
    });
    if (this.activeIndex === 3) {
      this.donar.name = this.name;
      this.donar.location = this.location;
      this.donar.city = this.city;
      this.donar.dob = this.dob;
      this.donar.email = this.email;
      this.donar.mobile = this.mobile;
      this.donar.bloodGroup = this.bloodGroup;
      this.donar.contactTime = this.contactTime;
      this.donar.disease = this.disease;
      this.donar.lastBloodDuration = this.lastBloodDuration;
      this.genericService.addNewResource(this.BASE_URL + UrlConfig.BLOODS_DONARS, this.donar)
        .subscribe(
        res => {
          console.log(res);
        }
        );
    }
  }
  onCancel() {

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
