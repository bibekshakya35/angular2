import { Component, OnInit } from '@angular/core';
import { UrlConfig } from "../../_config/url.cofig";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Response } from '../../models/response';
import { PreCondition } from '../../_utils/precheckcondition';
import { Observable } from "rxjs/Observable";
import { AlertService, GenericService } from '../../services/index';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  response: Response;
  model: any = {};
  loading = false;
  precon: PreCondition;
  BASE_URL: string;
  constructor(

    private router: Router,
    private geneServ: GenericService,
    private alertService: AlertService) {
    this.precon = new PreCondition();
    this.BASE_URL = location.protocol + '//' + location.hostname;
  }

  register() {
    this.loading = true;
    this.model.email = this.model.email.trim();
    this.model.password = this.model.password.trim();
    this.model.name = this.model.name.trim();
    if (!this.precon.validateEmail(this.model.email)) {
      this.alertService.error("Email Should be appropriate");
      this.loading = false;
      return;
    }
    if (this.precon.hasWhiteSpace(this.model.password)) {
      this.alertService.error("Password Should not be only spaces");
      this.loading = false;
      return;
    }
    else {
      this.geneServ.addNewResource(this.BASE_URL + "/"+UrlConfig.SIGN_UP, this.model)
        .subscribe(
        res => {
          this.response = <Response>res;
          if (this.response.code === 200) {
            console.log("Success");
            localStorage.setItem("register", "You have been register to the Prasnottar community");
            this.router.navigateByUrl("/login");
          }
          else {
            console.log("Success");
            this.alertService.error("Sorry Given information is invalid");

          }
        }
        );
    }

  }

}
