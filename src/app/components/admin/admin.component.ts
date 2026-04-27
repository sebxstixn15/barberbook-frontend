import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  filter = 'ALL';

  constructor(
    public authService: AuthService,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.bookingService.getAllBookings().subscribe({
      next: data => {
        this.bookings = [...data].sort((a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error loading bookings:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get filtered() {
    if (this.filter === 'ALL') return this.bookings;
    return this.bookings.filter(b => b.status === this.filter);
  }

  get counts() {
    return {
      all: this.bookings.length,
      pending: this.bookings.filter(b => b.status === 'PENDING').length,
      confirmed: this.bookings.filter(b => b.status === 'CONFIRMED').length,
      cancelled: this.bookings.filter(b => b.status === 'CANCELLED').length,
    };
  }

  updateStatus(id: number, status: string) {
    this.bookingService.updateStatus(id, status).subscribe(() => this.load());
  }

  delete(id: number) {
    if (confirm('Delete this booking?')) {
      this.bookingService.delete(id).subscribe(() => this.load());
    }
  }

  statusLabel(s: string) { return ({ PENDING: 'Pending', CONFIRMED: 'Confirmed', CANCELLED: 'Cancelled' } as any)[s] || s; }
  statusClass(s: string) { return ({ PENDING: 'pending', CONFIRMED: 'confirmed', CANCELLED: 'cancelled' } as any)[s] || ''; }
}
