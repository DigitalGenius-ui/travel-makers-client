import { API } from "../config/ApiClient";
import type { tourType } from "../types/tours-type";

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
type revenueType = {
  revenue: timeType[];
};
export const getRevenue = async (revenueFilter: string | undefined) => {
  const res = await API.get<revenueType>(
    `/dashboard/chartRevenue?revenueFilter=${revenueFilter}`
  );
  return res.data;
};

// getting revenue And Top Distination api.
type topDisType = {
  distinations: {
    title: string;
    count: number;
  }[];
};
export const getTopDis = async (disFilter: string | undefined) => {
  const res = await API.get<topDisType>(
    `/dashboard/chartTopDis?disFilter=${disFilter}`
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
