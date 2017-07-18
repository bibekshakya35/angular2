import { Headers, RequestOptions} from "@angular/http";
export class CustomHeader{
    static produceCustomHeader() :RequestOptions{
        var headers = new Headers();
        // var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
        // console.log("sata"+JSON.stringify(currentUser));
        // headers.append("CLIENT-ID",currentUser.companyName);
        // console.log(currentUser.companyName);
        headers.append("Access-Control-Allow-Origin","*");
        headers.append("Content-type","application/json");
        // headers.append("AUTH-SECURITY-TOKEN",currentUser.token);
       
        return new RequestOptions({ headers: headers });
    }
}