import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {
  transform(value: string): string {
    let [hours, minutes] = value.split(':');


    const hoursNum = parseInt(hours);

    const period = hoursNum >= 12 ? 'PM' : 'AM';


    hours = ((hoursNum % 12) || 12).toString();

    return `${hours}:${minutes} ${period}`;
  }
}
