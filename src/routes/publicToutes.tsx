import { lazy } from "react";
import { Route } from "react-router-dom";

const SingleProfile = lazy(
  () => import("../components/Pages/singleProfile/SingleProfile")
);
const SinglePost = lazy(
  () =>
    import("../components/Pages/profile/myPosts/Posts/SinglePost/SinglePost")
);
const EmailVerify = lazy(() => import("../components/EmailVerify"));
const Moments = lazy(() => import("../pages/Moments/Moments"));
const AllTours = lazy(
  () => import("../components/Home/RecommendedTours/AllTours")
);
const FilterTours = lazy(
  () => import("../components/Home/Destinations/FilterTours")
);
const TourDetails = lazy(
  () => import("../components/Pages/tours/TourDetails/TourDetails")
);
const BookTicket = lazy(
  () =>
    import(
      "../components/Pages/tours/TourDetails/Tickets/BookTicket/BookTicket"
    )
);
const Home = lazy(() => import("../pages/Home/Home"));

export const publicToutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="profile" path="/singleProfile/:id" element={<SingleProfile />} />,
  <Route key="post" path="/profile/posts/post/:id" element={<SinglePost />} />,
  <Route key="verify" path="/email/verify/:code" element={<EmailVerify />} />,
  <Route key="momentt" path="/moments" element={<Moments />} />,
  <Route key="tours" path="/allTours" element={<AllTours />} />,
  <Route
    key="tourCard"
    path="/tour/filtered/:tourCat"
    element={<FilterTours />}
  />,
  <Route key="tour" path="/tour/:id" element={<TourDetails />} />,
  <Route key="book" path="/tour/Book/:tourId" element={<BookTicket />} />,
];
