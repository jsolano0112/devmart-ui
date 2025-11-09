import { getAllCategories, createCategory, deleteCategory } from "../api/categoriesService";
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

    const createOneCategory = async (name) => {

        dispatch({ type: categoryTypes.loadingCategories });

        const { ok, errorMessage } = await createCategory(name);

        if (!ok) {
            dispatch({
                type: categoryTypes.categoryError,
                payload: errorMessage
            });
            return false;
        }
        setTimeout(async () => {
            await getCategories();
        }, 500);

        return true;
    };

    const deleteOneCategory = async (id) => {

        dispatch({ type: categoryTypes.loadingCategories });

        const { ok, errorMessage } = await deleteCategory(id);

        if (!ok) {
            dispatch({
                type: categoryTypes.categoryError,
                payload: errorMessage
            });
            return false;
        }
        dispatch({
            type: categoryTypes.deleteCategory,
            payload: id
        });
        return true;
    };
    return { getCategories, createOneCategory, deleteOneCategory }
}