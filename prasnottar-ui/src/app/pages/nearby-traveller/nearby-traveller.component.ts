import { Component, OnInit, AfterViewInit, AfterContentInit, NgZone } from '@angular/core';
import { GenericService, GlobalService } from "../../services/index";
import { UrlConfig } from '../../_config/url.cofig';
import { Message } from 'primeng/primeng';
import { Response } from '../../models/response';
import { PreCondition } from '../../_utils/precheckcondition';
import { Router, ActivatedRoute } from '@angular/router';
import { PlaceStory } from '../../models/place-story';
declare var $: any;
@Component({
  selector: 'app-nearby-traveller',
  templateUrl: './nearby-traveller.component.html',
  styleUrls: ['./nearby-traveller.component.css']
})
export class NearbyTravellerComponent implements OnInit, AfterViewInit {
  placeStories: PlaceStory[] = [];
  msgs: Message[] = [];
  isImageUpload: boolean = false;
  sPlaceName: string;
  sStoryTeller: string;
  picForStory: any;
  placeToGo: any;
  hotelList: any[];
  resturantList: any[];
  placePortFolio: any;
  galleries: any[];
  description: any;
  isLoading: boolean = false;
  BASE_URL: string;
  showPlaceSearch: boolean = false;
  response: Response;
  userId: any;
  nameOfuser: any;
  user: any;
  isLogin: boolean = false;
  pre: PreCondition;
  constructor(private genericServ: GenericService, private route: ActivatedRoute,
  private global:GlobalService,
    private router: Router) {
    this.pre = new PreCondition();
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if (!this.pre.isObjectEmpty(this.user)) {
      this.isLogin = this.user.connected;
      this.userId = this.user._id;
      this.nameOfuser = this.user.name;
    }
    console.log(this.isLogin);
  }
  mainImage: any;
  IMAGEURL: string;
  ngOnInit() {
   this.BASE_URL = this.global.getValue();
    this.IMAGEURL = this.global.getValue().replace("/api/", "");
    this.loadPlaceStories();
  }
  loadPlaceStories() {
    this.genericServ.getAllResources(this.BASE_URL + UrlConfig.VIEW_STORY).subscribe(res => {
      this.response = <Response>res;
      console.log(JSON.stringify(this.response));
      this.placeStories = <PlaceStory[]>JSON.parse(this.response.data);
    });
  }
  searchPlace() {
    console.log("THE PLACE YOU WANT TO GO " + this.placeToGo);
    this.isLoading = true;
    this.galleries = [];
    this.description = "";
    this.mainImage = "";

    this.genericServ.getAllResources(this.BASE_URL + UrlConfig.NEARBY_SEARCH + "/" + this.placeToGo)
      .subscribe(
      res => {
        this.response = <Response>res;
        this.placePortFolio = JSON.parse(this.response.data);
        this.mainImage = this.placePortFolio.galleries[0];
        this.placePortFolio.galleries.forEach(element => {
          let thumbnail = element.replace("maxwidth=800", "maxwidth=120");
          this.galleries.push({ "source": element, "thumbnail": thumbnail, "title": this.placeToGo });
        });

        this.genericServ.getResponseFromWiki
          (this.placeToGo).subscribe(res => {
            console.log(res);
            this.description = res;
          });
        let location = this.placePortFolio.gmap["location"];
        this.genericServ.getHotelFromGoogle(location.lat, location.lng, this.mainImage)
          .subscribe(res => {
            this.hotelList = res;
          });
        this.genericServ.getResturantFromGoogle(location.lat, location.lng, this.mainImage)
          .subscribe(res => {
            this.resturantList = res;
          });

        this.isLoading = false;

        this.showPlaceSearch = true;
      }
      );

  }
  onUpload(event) {
    this.picForStory = "/images/story/" + JSON.parse(event.xhr.response)[0].filename;
    this.isImageUpload = true;
  }
  ngAfterViewInit() {
    this.showPlace();
  }
  showPlace() {
    if (this.isLogin) {
      $(document).ready(function () {
        $('.requestPost').on('click', function (e) {
          console.log("INSIDE ");
          $('.modal').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            inDuration: 300, // Transition in duration
            outDuration: 200, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute
            ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
              console.log(modal, trigger);
            },
            complete: function () { } // Callback for Modal close
          }
          );
        });
      });
    }
    else {
      this.msgs.push({
        severity: 'info', summary: 'Login Required!', detail: 'you need to login first'
      });
      localStorage.setItem("msg", JSON.stringify(this.msgs));
      this.router.navigateByUrl('/login');

    }
  }
  storyTellerForPlace() {
    console.log(this.sPlaceName);
    this.isLoading = true;
    let placeStory = {
      "place": this.sPlaceName,
      "story": this.sStoryTeller,
      "picture": this.picForStory,
      "userid": this.userId,
      "name": this.nameOfuser
    };
    console.log(JSON.stringify(placeStory));
    this.genericServ.addNewResource(this.BASE_URL + UrlConfig.ADD_PLACE_STORY, placeStory).subscribe(res => {
      this.response = <Response>res;

      if (this.pre.checkResponseValid(this.response)) {
        $('.modal').modal('close');
        this.msgs.push({
          severity: 'success', summary: "Story Teller", detail: this.response.message
        });
        this.isLoading = false;

        this.router.navigateByUrl("/nearby");
      }
      else {

        this.isLoading = false;
        this.msgs.push({
          severity: 'error', summary: "Story Teller", detail: this.response.message
        });
      }
    })
  }
  onCancel() {
    $('.modal').modal('close');
    this.router.navigateByUrl('/nearby');
  }

}

