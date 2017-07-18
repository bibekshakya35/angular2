import {Answer} from "../models/answer";
export class Post{
    _id: string;
    title: string;
    category : any;
    author:string;
    body:string;
    date :string;
    categories : string[];
    score : number;
    answers : Answer[];
    userid : string;
}