import { createContext, useReducer } from "react";
import { productReducer } from "../reducers/productReducer";
import { useProducts } from "../hooks/useProducts";

const productInitialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  errorMessage: null,
};

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(
    productReducer,
    productInitialState
  );
  const { getProducts } = useProducts(dispatch);

  return (
    <ProductContext.Provider value={{ productState, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
