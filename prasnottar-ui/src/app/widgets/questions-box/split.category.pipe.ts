import {Pipe,PipeTransform} from "@angular/core";

@Pipe({
    name:"splitCategory"
})
export class SplitCategory implements PipeTransform{
    transform(value:string):string[]{
        return value.split(",");    
    }
}