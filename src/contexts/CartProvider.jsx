import { createContext, useReducer, useEffect } from "react";
import { cartReducer, saveCartToStorage, loadCartFromStorage, clearCartStorage } from "../reducers/cartReducer";
import { cartTypes } from "../types/cartTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
  expiresAt: null,
  lastModified: null,
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from storage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart && savedCart.items && savedCart.items.length > 0) {
      dispatch({
        type: cartTypes.loadCartFromStorage,
        payload: savedCart,
      });
    }
  }, []);

  // Save cart to storage whenever it changes
  useEffect(() => {
    saveCartToStorage(cartState);
  }, [cartState]);

  // Calculate subtotal (using frozen price if available)
  const calculateSubtotal = () => {
    return cartState.items.reduce((acc, item) => {
      const price = item.frozenPrice || item.price;
      return acc + price * item.quantity;
    }, 0);
  };

  // Calculate shipping cost based on subtotal
  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    const MIN_ORDER_FOR_FREE_SHIPPING = 50000; // $50,000 COP
    
    if (subtotal >= MIN_ORDER_FOR_FREE_SHIPPING) {
      return 0;
    }
    
    // Shipping cost: 5% of subtotal or flat $10,000 COP, whichever is higher
    return Math.max(subtotal * 0.05, 10000);
  };

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  // Add item to cart
  const addItem = (product, quantity) => {
    dispatch({
      type: cartTypes.addItem,
      payload: {
        sku: product.sku,
        name: product.name,
        price: product.price,
        quantity,
        stock: product.stock,
      },
    });
  };

  // Remove item from cart
  const removeItem = (sku) => {
    dispatch({
      type: cartTypes.removeItem,
      payload: { sku },
    });
  };

  // Update item quantity
  const updateQuantity = (sku, quantity) => {
    dispatch({
      type: cartTypes.updateQuantity,
      payload: { sku, quantity },
    });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: cartTypes.clearCart });
    clearCartStorage();
  };

  // Get item count
  const getItemCount = () => {
    return cartState.items.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Check if can checkout
  const canCheckout = () => {
    return (
      cartState.items.length > 0 &&
      calculateSubtotal() >= 50000 &&
      !cartState.items.some((item) => item.quantity > item.stock)
    );
  };

  const value = {
    cartState,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    calculateSubtotal,
    calculateShipping,
    calculateTotal,
    getItemCount,
    canCheckout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
