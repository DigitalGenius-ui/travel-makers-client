import { API } from "../config/ApiClient";

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
