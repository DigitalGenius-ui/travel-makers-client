import { Route } from "react-router-dom";
import CreateReview from "../components/Pages/tours/TourDetails/TourDetails/write/CreateReview";
import CheckOut from "../components/Pages/tours/CheckOut/CheckOut";
import ProfileMenu from "../components/Pages/profile/ProfileMenu";
import MyProfile from "../components/Pages/profile/myProfile/Profile";
import MyBookings from "../components/Pages/profile/myBookings/MyBookings";
import MyPosts from "../components/Pages/profile/myPosts/MyPosts";
import ChangePassword from "../components/Pages/profile/managePassword/ChangePassword";
import LinkedAccounts from "../components/Pages/profile/linkAccount/LinkAccounts";
import CreatePost from "../components/Pages/profile/myPosts/Posts/CreatePost/CreatePost";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard/pages/Dashboard";
import Packages from "../pages/Dashboard/pages/Packages";
import Bookings from "../pages/Dashboard/pages/Bookings";
import Travlers from "../pages/Dashboard/pages/Travlers";
import Guides from "../pages/Dashboard/pages/Guides";
import Gallery from "../pages/Dashboard/pages/Gallery";
import Messages from "../pages/Dashboard/pages/Messages";
import FeedBacks from "../pages/Dashboard/pages/FeedBacks";

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
