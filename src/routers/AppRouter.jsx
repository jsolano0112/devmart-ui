import { UserContext } from "../contexts/UserProvider";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import { Navbar } from "../components/NavbarComponent";
import ManageProductsPage from "../pages/ManageProductsPage";
import TrackingPage from "../pages/TrackingUserPage";
import TrackingAdminPage from "../pages/TrackingAdminPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrdersPage from "../pages/OrdersPage";
import ProfilePage from "../pages/ProfilePage";
export const AppRouter = () => {
  const {
    userState: { logged, user },
  } = useContext(UserContext);
  if (!logged) {
    return (
      <>
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/*" element={<Navigate to="/Login" />} />
        </Routes>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {user.isAdmin && (
          <>
            <Route path="/admin/products" element={<ManageProductsPage />} />
            <Route path="/admin/orders" element={<TrackingAdminPage />} />
          </>
        )}
      </Routes>
    </>
  );
};
