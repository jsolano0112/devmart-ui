import { getAllCategories } from "../api/categoriesService";
import { categoryTypes } from "../types/categoryTypes";
export const useCategories = (dispatch) => {
    const getCategories = async () => {

        dispatch({ type: categoryTypes.loadingCategories });

        const { ok, categories, errorMessage } = await getAllCategories();

        if (!ok) {
            dispatch({
                type: categoryTypes.categoryError,
                payload: errorMessage
            });
            return false;
        }
        dispatch({
            type: categoryTypes.getCategories,
            payload: categories
        });
        return true;
    };
    return { getCategories }
}