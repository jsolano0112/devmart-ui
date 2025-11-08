import { createContext } from "react";
import { useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { useAuthenticate } from "../hooks/useAuthenticate";
const authInitialState = {
  logged: false,
  user: null,
  errorMessage: null,
};

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return {
      logged: true,
      errorMessage: null,
      user,
    };
  }
  return authInitialState;
};
const UserContext = createContext();
function UserProvider(props) {
  const [userState, dispatch] = useReducer(authReducer, authInitialState, init);
  const { login, logout } = useAuthenticate(dispatch);

  return (
    <UserContext.Provider value={{ userState, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
