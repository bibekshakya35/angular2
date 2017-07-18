import { Component, OnInit } from '@angular/core';
import { UrlConfig } from "../../_config/url.cofig";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Response } from '../../models/response';
import { PreCondition } from '../../_utils/precheckcondition';
import { Observable } from "rxjs/Observable";
import { AlertService, GenericService } from '../../services/index';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fbUrl: string;
  twitterUrl: string;
  googleUrl: string;
  response: Response;
  model: any = {};
  loading = false;
  returnUrl: string;
  user: any;
  message: any;
  precondtion: PreCondition;
  showMessage: boolean = false;
  BASE_URL: string;
  userId: any;
  msgs: Message[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private genericser: GenericService,
    private userServ: UserService) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.BASE_URL = location.protocol + '//' + location.hostname;
    this.fbUrl = this.BASE_URL + UrlConfig.FACEBOOK;
    this.twitterUrl = this.BASE_URL + UrlConfig.TWITTER;
    this.googleUrl = this.BASE_URL + UrlConfig.GOOGLE;
    this.msgs = JSON.parse(localStorage.getItem('msg'));
  }

  login() {
    this.loading = true;
    const login$ = this.genericser.addNewResource(this.BASE_URL + "/api/" + UrlConfig.LOGIN, { "email": this.model.email, "password": this.model.password });
    login$.subscribe(
      res => {
        this.response = <Response>res;
        if (this.precondtion.checkResponseValid(this.response)) {
          this.user = JSON.parse(this.response.data);
          this.router.navigateByUrl("/prasna?id=" + this.user._id);
        }
        else {
          this.alertService.error(this.response.message);
          this.loading = false;
        }

      }

    );
  }
  ngOnInit() {
    if (this.user) {
      this.user.connected = false;
    }
    console.log(localStorage.getItem("register"));
    if (localStorage.getItem("register")) {
      this.message = localStorage.getItem("register");
      localStorage.clear();
      console.log(this.message);
      this.showMessage = true;
    }
    this.precondtion = new PreCondition();
    localStorage.clear();
    this.userServ.logout();
  }

}
