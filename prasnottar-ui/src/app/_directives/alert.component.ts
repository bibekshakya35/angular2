import { Component, OnInit } from "@angular/core";
import { AlertService } from "../services/alert.service";
@Component({
    moduleId: module.id,
    selector: 'com-alert',
    templateUrl: 'alert.component.html',
    styleUrls:['alert.css']
})
export class AlertComponent implements OnInit {
    message: any;
    constructor(private alertService: AlertService) { }
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message });
    }
}