import { Component, OnInit, AfterContentInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild, Input } from '@angular/core';
import { UrlConfig } from "../../_config/url.cofig";
import { ChatService, GenericService } from '../../services/index';
import { Response } from "../../models/response";
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent implements OnInit, AfterContentInit {
  BASE_URL: string;
  show:boolean = fals;e
  response: Response;
  chatRooms: any[] = [];
  constructor(private genericService: GenericService) {
    this.BASE_URL = location.protocol + '//' + location.hostname;
  }
  ngOnInit() {
  }
  ngAfterContentInit() {
    this.loadChatRooms();
  }
  private loadChatRooms(): void {
    this.genericService.getAllResources(this.BASE_URL + "/api/" + UrlConfig.CHAT_ROOMS)
      .subscribe(res => {
        this.response = res;
        this.chatRooms = JSON.parse(this.response.data);
      });
  }

}
