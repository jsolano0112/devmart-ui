import { UserContext } from "../contexts/UserProvider";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
export const AppRouter = () => {
  const {
    userState: { logged },
  } = useContext(UserContext);
  console.log("logged??",logged)
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
      <Routes>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
