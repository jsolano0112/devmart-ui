import { productTypes } from "../types/productTypes";

const productInitialState = {
    products: [],
    selectedProduct: null,
    loading: false,
    errorMessage: null
};

export const productReducer = (state = productInitialState, action = {}) => {
    switch (action.type) {
        case productTypes.loadingProducts:
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        
        case productTypes.getProducts:
            return {
                ...state,
                loading: false,
                products: action.payload,
                errorMessage: null
            };
        
        case productTypes.getProductById:
            return {
                ...state,
                loading: false,
                selectedProduct: action.payload,
                errorMessage: null
            };
        
        case productTypes.createProduct:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload],
                errorMessage: null
            };
        
        case productTypes.updateProduct:
            return {
                ...state,
                loading: false,
                products: state.products.map(product => 
                    product.id === action.payload.id ? action.payload : product
                ),
                selectedProduct: action.payload.id === state.selectedProduct?.id ? action.payload : state.selectedProduct,
                errorMessage: null
            };
        
        case productTypes.deleteProduct:
            return {
                ...state,
                loading: false,
                products: state.products.filter(product => product.id !== action.payload),
                selectedProduct: state.selectedProduct?.id === action.payload ? null : state.selectedProduct,
                errorMessage: null
            };
        
        case productTypes.productsError:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        
        case productTypes.clearProductsError:
            return {
                ...state,
                errorMessage: null
            };
        
        default:
            return state;
    }
};
