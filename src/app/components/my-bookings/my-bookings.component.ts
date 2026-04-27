import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../models/booking.model';
import { StatusCountPipe } from '../../pipes/status-count.pipe';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusCountPipe],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;

  constructor(
    public authService: AuthService,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.bookingService.getMyBookings().subscribe({
      next: data => {
        this.bookings = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  statusLabel(s: string) {
    return ({ PENDING: 'Pending', CONFIRMED: 'Confirmed', CANCELLED: 'Cancelled' } as any)[s] || s;
  }
  statusClass(s: string) {
    return ({ PENDING: 'pending', CONFIRMED: 'confirmed', CANCELLED: 'cancelled' } as any)[s] || '';
  }
}
