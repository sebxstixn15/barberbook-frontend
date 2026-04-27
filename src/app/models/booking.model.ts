export interface Booking {
  id?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingTime: string;
  service: string;
  status?: string;
  createdAt?: string;
}
