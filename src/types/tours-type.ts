export type statusType = "pending" | "canceled" | "verified";

// ticket bookig types
export type ticketsType = {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  travelDate: Date;
  tickets: {
    adult: number;
    child: number;
  };
  totalPrice: string;
  tourImage: string;
  status: statusType;
  verifyNumber: string;
  userId: string;
  createAt: Date;
  updatedAt: Date;
};

// tour data type
export type tourType = {
  id: string;
  title: string;
  open_time: Date;
  close_time: string;
  address: string;
  phone_number: string;
  number_of_tickets: number;
  description: string;
  userId: string | undefined;
  country: string;
  city: string;
  price: number;
  category: string;
  iframe_map: string;
  tourImages: string[];
  tourDuration: string;
  createAt: Date;
  updatedAt: Date;
};

// tour review
export type tourReview = {
  id: string;
  text: string;
  rating: string;
  reviewImages: string[];
  userId: string;
  toursId: string;
  createAt: Date;
  updatedAt: Date;
};
