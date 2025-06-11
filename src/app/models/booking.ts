export interface Booking {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  bookingDate: string; // Date string, e.g., "YYYY-MM-DD"
  status: BookingStatus;
  notes?: string;
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp
}

export enum BookingStatus {
  Pending = 'Chờ xử lý',
  Confirmed = 'Đã xác nhận',
  Cancelled = 'Đã hủy',
  Completed = 'Đã hoàn thành',
} 