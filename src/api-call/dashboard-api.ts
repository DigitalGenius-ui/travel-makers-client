import { API } from "../config/ApiClient";
import type { ticketsType } from "../types/tours-type";

// getting insight
type timeType = {
  name: string;
  value: number;
};
export type insightData = {
  bookings: {
    totalBookings: number;
    bookingsTime: timeType[];
    percent: number;
  };
  customers: {
    totalCustomer: number;
    customerTime: timeType[];
    percent: number;
  };
  earnings: {
    totalEarnings: number;
    earningsTime: timeType[];
    percent: number;
  };
};
export const getInsight = async (filter: string) => {
  const res = await API.get<insightData>(`/dashboard/insight?filter=${filter}`);
  return res.data;
};

type bookingDataType = {
  revenue: {
    earningsTime: timeType[];
  };
  distinations: {
    title: string;
    count: number;
  }[];
  allBookings: ticketsType[];
};
export const bookingData = async (filter: string | undefined) => {
  const res = await API.get<bookingDataType>(
    `/dashboard/revenueAndTopDis?filter=${filter}`
  );
  return res.data;
};
