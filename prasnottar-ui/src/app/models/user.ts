
export class User {
    public userid: string;
    public _id:string;
    public token : string;
    public name: string;
    public email: string;
    public avatarUrl: string;
    public reputation :number;
    public mobile :string;
    public bloodgroup:string;
    public location : string;
    public city:string;
    public userType :string;
    public connected : boolean =false;
    public preferredLang : string;
    public constructor( data: any = {}) {
        this._id=data._id||'';
        this.userid = data.userid || '';
        this.token = data.token || '';
        this.name=data.name || '';
        this.email = data.email || '';
        this.avatarUrl = data.avatarUrl || '';
        this.reputation = data.reputation||'';
        this.mobile = data.mobile ||'';
        this.bloodgroup = data.bloodgroup || '';
        this.location = data.location || '';
        this.city = data.city || '';
        this.userType=data.city || '' ;
        this.connected = data.connected || false;
    }

}
