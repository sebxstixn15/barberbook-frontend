import { Pipe, PipeTransform } from '@angular/core';
import { Booking } from '../models/booking.model';

@Pipe({
  name: 'statusCount',
  standalone: true
})
export class StatusCountPipe implements PipeTransform {
  transform(bookings: Booking[], status: string): number {
    if (!bookings) return 0;
    return bookings.filter(b => b.status === status).length;
  }
}
