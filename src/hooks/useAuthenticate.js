import { loginUser } from "../api/userService"
import { authTypes } from "../types/authTypes"
import { signUp } from "../api/userService"
export const useAuthenticate = (dispatch) => {

    const login = async ({ email, password }) => {
        const { ok, isAdmin, name, errorMessage, firstname, lastname, id } = await loginUser(email, password)

        if (!ok) {
            const action = {
                type: authTypes.errors,
                payload: { errorMessage }
            }
            dispatch(action);

            return { ok: false, errorMessage };
        }

        const userPayload = { email, isAdmin, name, firstname, lastname, id }

        const action = {
            type: authTypes.login,
            payload: userPayload,
        };
        dispatch(action);
        return { ok: true, errorMessage: null }
    }

    const logout = () => {
        const action = {
            type: authTypes.logout,
        }
        localStorage.clear();
        dispatch(action)

    }

    const signUpUser = async ({ firstName, lastName, email, address, mobilePhone, city, zipCode, password, isAdmin }) => {
        const { ok, errorMessage } = await signUp(firstName, lastName, email, address, mobilePhone, city, zipCode, password, isAdmin)

        if (!ok) {
            const action = {
                type: authTypes.errors,
                payload: { errorMessage }
            }
            dispatch(action);

            return { ok: false, errorMessage };
        }

        return { ok: true, errorMessage: null }
    }
    return { login, logout, signUpUser }
}