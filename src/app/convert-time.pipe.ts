import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {
  transform(value: string): string {
    // Split the time string by colon
    let [hours, minutes] = value.split(':');

    // Convert hours part to a number to manipulate easily
    const hoursNum = parseInt(hours);

    // Determine AM or PM based on hours
    const period = hoursNum >= 12 ? 'PM' : 'AM';

    // Convert military time to standard time by finding the modulo of hours by 12
    // and replacing '00' hours with '12' for better readability
    // Ensure 'hours' is treated as a string after manipulation
    hours = ((hoursNum % 12) || 12).toString();

    // Return the formatted time string
    return `${hours}:${minutes} ${period}`;
  }
}
