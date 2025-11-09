import { createContext, useReducer } from "react";
import { useCategories } from "../hooks/useCategories";
import { categoriesInitialState, categoryReducer } from "../reducers/categoryReducer";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categoryState, dispatch] = useReducer(
    categoryReducer,
    categoriesInitialState
  );
  const { getCategories, createOneCategory, deleteOneCategory } = useCategories(dispatch);

  return (
    <CategoryContext.Provider value={{ categoryState, getCategories, createOneCategory, deleteOneCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
