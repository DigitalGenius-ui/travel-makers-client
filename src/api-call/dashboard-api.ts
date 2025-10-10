import { API } from "../config/ApiClient";
import type { ticketsType, tourType } from "../types/tours-type";

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

// getting revenue And Top Distination api.
type revenueAndTopDisType = {
  revenue: {
    earningsTime: timeType[];
  };
  distinations: {
    title: string;
    count: number;
  }[];
  allBookings: ticketsType[];
};
export const getRevenueAndTopDis = async (
  disFilter: string | undefined,
  revenueFilter: string | undefined
) => {
  const res = await API.get<revenueAndTopDisType>(
    `/dashboard/revenueAndTopDis?disFilter=${disFilter}&revenueFilter=${revenueFilter}`
  );
  return res.data;
};

// getting trips and package data
type tripAndPackageType = {
  trips: {
    title: string;
    amount: number;
  }[];
  allPackages: tourType[];
  totalTrips: number;
};
export const getTripAndPackage = async () => {
  const res = await API.get<tripAndPackageType>(`/dashboard/tripsAndPackages`);
  return res.data;
};
