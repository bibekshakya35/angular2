import { Component, OnInit, AfterViewInit, OnDestroy, AfterContentInit, ElementRef, ViewChild, } from '@angular/core';
import { UrlConfig } from "../../_config/url.cofig";
import { ChatService, GenericService } from '../../services/index';
import { Response } from "../../models/response";

import { Subscription } from "rxjs/Subscription";
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';
declare var $: any;
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentInit {
  chatRoomClicked: boolean = false;
  showLboolean = false;
  groupInfo: any;
  radio: any = "http://kantipur-stream.softnep.com:7248/;stream.nsv&type=mp3&volume=100";
  gcTitle: any;
  gcImg: any;
  userid: any;
  messages: any[] = [];
  connection: any = "";
  message: any = "";
  user: any;
  userName: any;
  avatarUrl: any;
  BASE_URL: any;
  response: Response;
  gcId: any;
  private sub: Subscription;
  msgs: Message[] = [];
  constructor(private chatService: ChatService, private genericServ: GenericService, private route: ActivatedRoute,
    private router: Router) {
    this.sub = this.route.params.subscribe(
      params => {
        this.gcId = params["id"];
      }
    )
  }
  ngAfterContentInit() {
    this.onJoinChat(this.gcId);
  }
  sendMessage() {
    let data = {
      "type": "new-message",
      "text": this.message,
      "userid": this.userid,
      "userName": this.userName,
      "date": new Date(),
      "avatarUrl": this.avatarUrl,
      "room": this.gcId
    };
    this.chatService.sendMessage(data);
    this.message = "";
    this.scrollBottom();

  }
  ngOnInit() {
    this.scrollBottom();
  }
  ngOnDestroy() {
    if (this.connection) {
      this.onBack();
    }
  }
  ngAfterViewInit() {
    this.scrollBottom();
  }
  scrollBottom() {
    $('.chat-history').scrollTop(1E10);
  }
  onJoinChat(gcId) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if (this.user) {
      this.onUserExits(gcId);
    }
    else {
      this.msgs.push({
        severity: 'info', summary: 'Login Required!', detail: 'you need to login first'
      });
      localStorage.setItem("msg", JSON.stringify(this.msgs));
      this.router.navigateByUrl('/login');
    }
  }
  onBack() {
    this.connection.unsubscribe();
  }
  private onUserExits(gcId) {

    this.userid = this.user._id;
    this.userName = this.user.name;
    this.avatarUrl = this.user.avatarUrl;
    this.BASE_URL = location.protocol + '//' + location.hostname;
    this.genericServ.getAllResources(this.BASE_URL + "/api" + UrlConfig.CHAT_ROOMS + gcId)
      .subscribe(res => {
        this.response = <Response>res;
        let chatRoom = JSON.parse(this.response.data);
        this.gcImg = chatRoom.image;
        this.gcTitle = chatRoom.name;
      });
    var data = {
      "userid": this.userid,
      "userName": this.userName,
      "date": new Date(),
      "avatarUrl": this.avatarUrl,
      "room": gcId,
      "room_name": this.gcTitle
    }
    this.genericServ.getAllResources(this.BASE_URL + "/api" + UrlConfig.GROUP_CHAT_HISTORY + gcId)
      .subscribe(res => {
        this.response = <Response>res;
        console.log(this.response);
        this.messages = JSON.parse(this.response.data);
      });
    this.connection = this.chatService.getMessages(data).subscribe(msg => {
      if (msg["joined"]) {
        let mess = msg["joined"];
        this.msgs = [];
        this.msgs.push({
          severity: 'info', summary: 'User ', detail: mess
        });
      }
      else if (msg["left"]) {
        let mess = msg["left"];
        this.msgs = [];
        this.msgs.push({
          severity: 'info', summary: 'User ', detail: mess
        });
      }
      else {
        this.messages.push(msg);
      }
    });

  }

}
