import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../modules/firebase/booking";
import { Booking, BookingStatus } from "../models/booking";

interface UseBookingCrudHook {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  getBooking: (id: string) => Promise<Booking | null>;
  addBooking: (booking: Omit<Booking, "id" | "createdAt" | "updatedAt">) => Promise<Booking | null>;
  updateBookingStatus: (id: string, status: BookingStatus) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  subscribeToBookings: (callback: (bookings: Booking[]) => void) => () => void;
}

export const useBookingCrud = (): UseBookingCrudHook => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to subscribe to real-time updates
  const subscribeToBookings = useCallback((callback: (bookings: Booking[]) => void) => {
    setLoading(true);
    const unsubscribe = getAllBookings().then(initialBookings => {
      setBookings(initialBookings);
      callback(initialBookings);
      setLoading(false);
    }).catch(err => {
      console.error("Error subscribing to bookings:", err);
      setError("Không thể tải dữ liệu đặt chỗ.");
      setLoading(false);
    });
    // In a real-time scenario, you would listen to changes here, e.g., onSnapshot
    // For this example, we're simulating a one-time fetch, but a real Firebase hook would use onSnapshot
    return () => {}; // No real unsubscribe for a one-time fetch
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToBookings(setBookings);
    return () => unsubscribe();
  }, [subscribeToBookings]);

  const getBooking = async (id: string): Promise<Booking | null> => {
    try {
      setLoading(true);
      const booking = await getBookingById(id);
      setLoading(false);
      return booking;
    } catch (err: any) {
      setError(err.message);
      message.error("Không thể lấy thông tin đặt chỗ.");
      setLoading(false);
      return null;
    }
  };

  const addBooking = async (booking: Omit<Booking, "id" | "createdAt" | "updatedAt">): Promise<Booking | null> => {
    try {
      setLoading(true);
      const newBooking = await createBooking(booking);
      message.success("Thêm đặt chỗ thành công.");
      setLoading(false);
      return newBooking;
    } catch (err: any) {
      setError(err.message);
      message.error("Không thể thêm đặt chỗ.");
      setLoading(false);
      return null;
    }
  };

  const updateBookingStatus = async (id: string, status: BookingStatus): Promise<void> => {
    try {
      setLoading(true);
      await updateBooking(id, { status });
      message.success("Cập nhật trạng thái đặt chỗ thành công.");
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      message.error("Không thể cập nhật trạng thái đặt chỗ.");
      setLoading(false);
    }
  };

  const deleteBookingFn = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      await deleteBooking(id);
      message.success("Xóa đặt chỗ thành công.");
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      message.error("Không thể xóa đặt chỗ.");
      setLoading(false);
    }
  };

  return {
    bookings,
    loading,
    error,
    getBooking,
    addBooking,
    updateBookingStatus,
    deleteBooking: deleteBookingFn,
    subscribeToBookings,
  };
}; 