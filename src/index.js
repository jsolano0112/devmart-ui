import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './contexts/UserProvider';
import { AppRouter } from './routers/AppRouter';
import { ProductProvider } from './contexts/ProductProvider';
import { CategoryProvider } from './contexts/CategoriesProvider';
import { CartProvider } from './contexts/CartProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            <CategoryProvider>
              <AppRouter />
            </CategoryProvider>
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
