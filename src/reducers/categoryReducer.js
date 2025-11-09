import { categoryTypes } from "../types/categoryTypes";
export const categoriesInitialState = {
    categories: [],
    selectedCategory: null,
    loading: false,
    errorMessage: null
};

export const categoryReducer = (state = categoriesInitialState, action = {}) => {
    switch (action.type) {
        case categoryTypes.loadingCategories:
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        
        case categoryTypes.getCategories:
            return {
                ...state,
                loading: false,
                categories: action.payload,
                errorMessage: null
            };
        
        case categoryTypes.deleteCategory:
            return {
                ...state,
                loading: false,
                categories: state.categories.filter(category => category.id !== action.payload),
                selectedCategory: state.selectedCategory?.id === action.payload ? null : state.selectedCategory,
                errorMessage: null
            };
        
        case categoryTypes.categoryError:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };

        default:
            return state;
    }
};
