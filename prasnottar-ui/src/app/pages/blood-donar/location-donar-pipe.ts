import { Pipe, PipeTransform } from "@angular/core";
import { Blood } from "../../models/blood";
@Pipe({
    name: "locationFilter"
})
export class LocationFilterPipe implements PipeTransform {
    transform(array: Blood[], filterBy: string): Blood[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? array.filter((blood: Blood) =>
            blood.location.toLocaleLowerCase().indexOf(filterBy) !== -1
        ) : array;
    }
}