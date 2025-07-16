import React from "react";
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
import ManageUsers from "../components/Pages/profile/isAdmin/ManageUsers";
import ManageTickets from "../components/Pages/profile/isAdmin/ManageTickets";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard/pages/Dashboard";
import Packages from "../pages/Dashboard/pages/Packages";
import Bookings from "../pages/Dashboard/pages/Bookings";

export const protectedRoutes = (isAdmin) => {
  return [
    <Route key="dashboard" path="/" element={<DashboardLayout />}>
      {isAdmin && (
        <>
          <Route path="dashboard/:id" element={<Dashboard />} />
          <Route path="packages/:id" element={<Packages />} />
          <Route path="bookings/:id" element={<Bookings />} />
        </>
      )}
    </Route>,
    <Route key="write" path="/tour/write/:id" element={<CreateReview />} />,
    <Route key="checkout" path="/checkout/success" element={<CheckOut />} />,
    <Route key="profile" path="/profile/" element={<ProfileMenu />}>
      {isAdmin && (
        <>
          <Route path="users/:id" element={<ManageUsers />} />,
          <Route path="tickets/:id" element={<ManageTickets />} />
        </>
      )}
      <Route path="profileDetails/:id" element={<MyProfile />} />
      <Route path="booking/:id" element={<MyBookings />} />,
      <Route path="posts/:id" element={<MyPosts />} />,
      <Route path="password/:id" element={<ChangePassword />} />,
      <Route path="accounts/:id" element={<LinkedAccounts />} />,
    </Route>,
    <Route path="/profile/posts/createPost" element={<CreatePost />} />,
  ];
};
