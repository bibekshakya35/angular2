import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response, Jsonp } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { CustomHeader } from "../_utils/customheader";
@Injectable()
export class GenericService {
    constructor(private _http: Http, private jsonP: Jsonp) { }
    getAllResources(url: string) {
        return this._http
            .get(url, CustomHeader.produceCustomHeader())
            .map((reponse: Response) => reponse.json());
    }
    getResourceByUniqueCode(url: string, code: any) {
        return this._http
            .get(url + "/" + code, CustomHeader.produceCustomHeader())
            .map((response: Response) => response.json());
    }
    addNewResource(url: string, object: any) {
        console.log("dasdsadsa" + object);
        return this._http
            .post(url, object, CustomHeader.produceCustomHeader())
            .map((response: Response) => response.json());
    }
    editResource(url: string, code: any, object: any) {
        return this._http
            .put(url + "/" + code, object, CustomHeader.produceCustomHeader())
            .map((response: Response) => response.json());
    }
    editRes(url: string, object: any) {
        return this._http
            .put(url, object, CustomHeader.produceCustomHeader())
            .map((response: Response) => response.json());
    }
    resetPassword(url: string) {
        return this._http
            .put(url, "", CustomHeader.produceCustomHeader())
            .map((response: Response) => response.json());
    }
    patchResource(url: string, object: any) {
        return this._http
            .patch(url, object, CustomHeader.produceCustomHeader())
            .map((response: Response) => response.json());
    }
    getTen(url: string) {
        return this._http
            .get(url, CustomHeader.produceCustomHeader())

            .map((reponse: Response) => reponse.json());
    }
    getImageFromFacebook(url: string) {
        return this._http
            .get(url)
            .map((response: Response) =>
                response.json());
    }
    getResponseFromWiki(title: any) {
        return this._http
            .get(
            "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + title
            ).map((response: Response) => {
                console.log(response);
                let resWiki = response.json();

                let key = Object.keys(resWiki.query.pages);
                console.log("key" + key);
                return resWiki.query.pages[key[0]].extract;
            })
    }
    getResturantFromGoogle(laltitude, longitute, mainImage) {
        let apiKey = "AIzaSyDh2I0PbJ7o2IYIR_deS8xPbzZj-rCj94Y";
        let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        url += "location=" + laltitude + "," + longitute;
        url += "&type=restaurant|food|bar|cafe";
        url += "&radius=10000";
        url += "&key=" + apiKey;
        return this._http.get(url, CustomHeader.produceCustomHeader())
            .map((response: Response) => {
                let resturants = response.json().results;
                let sortResturant = [];
                resturants.forEach(element => {
                    let resturantName = element.name;
                    let gmap = element.geometry;
                    let rating = element.rating;
                    let preFix;
                    if (element.hasOwnProperty('photos')) {
                        let photos = element["photos"];
                        photos.forEach(element1 => {
                            preFix = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800";
                            preFix += "&photoreference=" + element1.photo_reference;
                            preFix += " &key=" + apiKey;

                        });
                    }
                    else {
                        preFix = mainImage;
                    }
                    sortResturant.push({
                        "resturantName": resturantName,
                        "gmap": gmap,
                        "rating": rating,
                        "photo": preFix
                    });
                });
                return sortResturant;
            });
    }
    getHotelFromGoogle(laltitude, longitute, mainImage) {
        let apiKey = "AIzaSyDh2I0PbJ7o2IYIR_deS8xPbzZj-rCj94Y";
        let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        url += "location=" + laltitude + "," + longitute;
        url += "&type=lodging|hotel|room";
        url += "&radius=10000";
        url += "&key=" + apiKey;
        //params.set('callback', `__ng_jsonp__.__req${times}.finished`);
        return this._http.get(url, CustomHeader.produceCustomHeader())
            .map((response: Response) => {
                let hotels = response.json().results;
                let sortHotel = [];

                hotels.forEach(element => {
                    let hotelName = element.name;
                    let gmap = element.geometry;
                    let rating = element.rating;

                    let preFix;
                    if (element.hasOwnProperty('photos')) {
                        let photos = element["photos"];
                        photos.forEach(element1 => {
                            preFix = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800";
                            preFix += "&photoreference=" + element1.photo_reference;
                            preFix += " &key=" + apiKey;

                        });
                    }
                    else {
                        preFix = mainImage;
                    }
                    sortHotel.push({
                        "hotelName": hotelName,
                        "gmap": gmap,
                        "rating": rating,
                        "photo": preFix
                    });
                });
                return sortHotel;
            });
    }


}