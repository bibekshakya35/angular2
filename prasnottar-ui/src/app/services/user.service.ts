
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    public currentUser: ReplaySubject<any> = new ReplaySubject<any>( 1 );

    constructor(
      private router: Router
    ) {
      // TODO
    }

    public setCurrentUser( user: any ) {
      this.currentUser.next( user );
    }

    public logout() {
      let user = {};
      this.setCurrentUser( user );
      localStorage.clear();
    }
}
