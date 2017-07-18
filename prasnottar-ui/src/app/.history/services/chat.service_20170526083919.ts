import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = "http://www.prasnottar.com/";
  private socket;

  sendMessage(data) {
    this.socket.emit("add-message", data);
  }

  getMessages(data) {
    let $obs = new Observable(obser => {
      this.socket = io(this.url);
      console.log(this.socket);
      this.socket.emit("adduser", data);
      this.socket.on("updatechat", (data) => {
        obser.next(data);
      });
      this.socket.on('message', (data) => {
        obser.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    return $obs;
  }
  constructor() { }

}
