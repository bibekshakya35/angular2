import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  private domainApi;
  constructor() { }
  setValue(val){
    this.domainApi = val;
  }
  getValue(){
    return this.domainApi;
  }
}
