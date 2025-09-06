import { Route } from "react-router-dom";
import CreateReview from "../components/Pages/tours/TourDetails/TourDetails/write/CreateReview";
import CheckOut from "../components/Pages/tours/CheckOut/CheckOut";
import MyBookings from "../components/Pages/profile/myBookings/MyBookings";
import MyPosts from "../components/Pages/profile/myPosts/MyPosts";
import ChangePassword from "../components/Pages/profile/managePassword/ChangePassword";
import LinkedAccounts from "../components/Pages/profile/linkAccount/LinkAccounts";
import CreatePost from "../components/Pages/profile/myPosts/Posts/CreatePost/CreatePost";
import DashboardLayout from "../pages/Dashboard/Layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Packages from "../pages/Dashboard/Packages";
import Bookings from "../pages/Dashboard/Bookings";
import Travlers from "../pages/Dashboard/Travlers";
import Guides from "../pages/Dashboard/Guides";
import Gallery from "../pages/Dashboard/Gallery";
import Messages from "../pages/Dashboard/Messages";
import FeedBacks from "../pages/Dashboard/FeedBacks";
import ProfileMenu from "../pages/Profile/ProfileMenu";
import MyProfile from "../components/Pages/profile/myProfile/MyProfile";

export const protectedRoutes = (isAdmin: boolean) => {
  return [
    <Route key="dashboard" path="/" element={<DashboardLayout />}>
      {isAdmin && (
        <>
          <Route path="dashboard/:id" element={<Dashboard />} />
          <Route path="packages/:id" element={<Packages />} />
          <Route path="bookings/:id" element={<Bookings />} />
          <Route path="travlers/:id" element={<Travlers />} />
          <Route path="guides/:id" element={<Guides />} />
          <Route path="gallery/:id" element={<Gallery />} />
          <Route path="messages/:id" element={<Messages />} />
          <Route path="feedbacks/:id" element={<FeedBacks />} />
        </>
      )}
    </Route>,
    <Route key="write" path="/tour/write/:id" element={<CreateReview />} />,
    <Route key="checkout" path="/checkout/success" element={<CheckOut />} />,
    <Route key="profile" path="/profile/" element={<ProfileMenu />}>
      <Route path="profileDetails/:id" element={<MyProfile />} />
      <Route path="booking/:id" element={<MyBookings />} />,
      <Route path="posts/:id" element={<MyPosts />} />,
      <Route path="password/:id" element={<ChangePassword />} />,
      <Route path="accounts/:id" element={<LinkedAccounts />} />,
    </Route>,
    <Route
      key={"createPost"}
      path="/profile/posts/createPost"
      element={<CreatePost />}
    />,
  ];
};
