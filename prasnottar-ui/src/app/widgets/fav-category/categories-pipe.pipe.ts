import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriesPipe'
})
export class CategoriesPipePipe implements PipeTransform {

  transform(value: any[], filterBy?: any): any[] {
    return filterBy ? value.filter((category : any)=>
      category.indexOf(filterBy)!==-1
    ):value; 
  }

}
