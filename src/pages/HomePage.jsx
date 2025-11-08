import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
export const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  return <div>{user.name}</div>;
};
