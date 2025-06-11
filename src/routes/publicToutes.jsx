import { Route } from "react-router-dom";
import Home from "../components/Home/Home";
import SingleProfile from "../components/Pages/singleProfile/SingleProfile";
import SinglePost from "../components/Pages/profile/myPosts/Posts/SinglePost/SinglePost";
import EmailVerify from "../components/emailVerify";
import Moments from "../components/Pages/moments/Moments";
import AllTours from "../components/Home/RecommendedTours/AllTours";
import FilterTours from "../components/Home/Destinations/FilterTours";
import TourDetails from "../components/Pages/tours/TourDetails/TourDetails";
import BookTicket from "../components/Pages/tours/TourDetails/Tickets/BookTicket/BookTicket";

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
