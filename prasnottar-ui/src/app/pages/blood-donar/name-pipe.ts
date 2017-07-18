import { Pipe, PipeTransform } from "@angular/core";
import { Blood } from "../../models/blood";
@Pipe({
    name: "nameFilter"
})
export class NameFilterPipe implements PipeTransform {
    transform(array: Blood[], filterBy: string): Blood[] {
        return filterBy ? array.filter((blood: Blood) =>
            blood.name.toLocaleLowerCase().indexOf(filterBy) !== -1
        ) : array;
    }
}