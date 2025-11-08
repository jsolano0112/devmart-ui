import api, { setAuthTokens } from "./apiClient";
import { AUTH } from "./endpointPaths";

export const loginUser = async (email, password) => {
  try {
    const { data } = await api.post(AUTH.login, { email, password });

    const { id, firstname, lastname, isAdmin, accessToken, refreshToken } = data;

    setAuthTokens({ accessToken, refreshToken });
    localStorage.setItem("tokens", JSON.stringify({ accessToken, refreshToken }));

    return {
      ok: true,
      id,
      firstname,
      lastname,
      isAdmin,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error
    };
  }
};


export const signUp = async (firstName, lastName, email, address, mobilePhone, city, zipCode, password, isAdmin) => {
  try {
    const { data } = await api.post("/users", { firstName, lastName, email, address, mobilePhone,  city, zipCode, password, isAdmin});

    console.log(data)

    return {
      ok: true
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.response?.data?.errors?.[0]?.msg ?? error.response?.data?.error
    };
  }
};