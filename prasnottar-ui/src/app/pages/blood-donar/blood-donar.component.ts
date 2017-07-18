
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Blood } from "../../models/blood";
import { SelectItem } from 'primeng/primeng';
import { AlertService, GenericService } from "../../services/index";
import { UrlConfig } from "../../_config/url.cofig";
import { Response } from "../../models/response";
import { Router, ActivatedRoute } from "@angular/router";
import { PreCondition } from '../../_utils/precheckcondition';
import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-blood-donar',
  templateUrl: './blood-donar.component.html',
  styleUrls: ['./blood-donar.component.css']
})
export class BloodDonarComponent implements OnInit {
  bloods: Blood[];
  isLoading : boolean=true;
  bloodSelection: SelectItem[];
  blood: Blood;
  available: string;
  bloodGroup = ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"];
  locations: Location[];
  state: string[];
  response: Response;
  isBloodSearchChange: boolean = false;
  public filterQuery = "";
  nameOfthePerson: string = "";
  locationOfPerson: string = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";
  public BASE_URL:string;
  constructor(
    private bloodServ: GenericService,
    private _alertService: AlertService,
    private globalService :GlobalService
    ) {
    this.BASE_URL = this.globalService.getValue();
    this.bloodSelection = [];
    this.bloodGroup.forEach((b) => {
      this.bloodSelection.push({ label: b, value: b });
    });
  }
  onBloodSearchChanged() {
    this.isBloodSearchChange = true;
  }
  ngOnInit() {
    this.loadBlood();
  }
  loadBlood() {
    this.bloodServ.getTen(this.BASE_URL + UrlConfig.BLOOD)
      .subscribe(
      res => {
        setTimeout(() => {
          this.response = <Response>res;

          this.bloods = JSON.parse(this.response.data);
          this.isLoading = false;
      }, 1000);

      }
      );
  }
  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.city.length;
  }
 
  checkIfAvailable(data: any): any {
    if (typeof data === "string") {
      if (data === "") {
        return "Not Provided";
      }
    }
    return data;

  }
}
