import { UserContext } from "../contexts/UserProvider";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import { Navbar } from "../components/NavbarComponent";
import ManageProductsPage from "../pages/ManageProductsPage";
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
        {user.isAdmin && (
          <>
            <Route path="/admin/products" element={<ManageProductsPage />} />
            <Route path="/admin/orders" element={<ManageProductsPage />} />
          </>
        )}
      </Routes>
    </>
  );
};
