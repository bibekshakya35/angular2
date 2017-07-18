import { Component, OnInit } from '@angular/core';

import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit {

  constructor(private meta: Meta) {
    this.meta.removeTag("description");
    this.meta.addTag({ name: "description", content: "An E-community for sharing knowledge in Nepal." });
    
  }

  ngOnInit() {
  }

}
