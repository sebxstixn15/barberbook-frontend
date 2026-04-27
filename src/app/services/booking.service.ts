import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private api = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    const token = this.auth.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  create(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.api}/bookings`, booking, { headers: this.headers() });
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.api}/my-bookings`, { headers: this.headers() });
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.api}/admin/bookings`, { headers: this.headers() });
  }

  updateStatus(id: number, status: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.api}/admin/bookings/${id}/status`, { status }, { headers: this.headers() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/admin/bookings/${id}`, { headers: this.headers() });
  }
}
