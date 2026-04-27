import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {
  booking: Booking = { customerName: '', customerEmail: '', customerPhone: '', bookingTime: '', service: '' };
  services = ['Haircut', 'Beard Trim', 'Hair Coloring', 'Styling', 'Kids Haircut'];
  loading = false;
  error = '';

  constructor(
    private bookingService: BookingService,
    public authService: AuthService,
    private router: Router
  ) {
    const user = authService.getUser();
    if (user) {
      this.booking.customerName = user.name;
      this.booking.customerEmail = user.email;
    }
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.bookingService.create(this.booking).subscribe({
      next: () => {
        this.loading = false;
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/my-bookings']);
        } else {
          this.router.navigate(['/login'], { queryParams: { booked: 'true' } });
        }
      },
      error: () => { this.error = 'Booking failed. Please try again.'; this.loading = false; }
    });
  }
}
