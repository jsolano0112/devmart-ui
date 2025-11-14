import { cartTypes } from "../types/cartTypes";

const CART_STORAGE_KEY = 'devmart_cart';
const CART_EXPIRY_HOURS = 24;

const initialState = {
  items: [], // { sku, name, price, quantity, stock, frozenPrice, frozenUntil, addedAt }
  loading: false,
  error: null,
  expiresAt: null,
  lastModified: null,
};

// Check if cart item is frozen (price locked for 2 hours)
const isItemFrozen = (item) => {
  if (!item.frozenUntil) return false;
  return new Date() < new Date(item.frozenUntil);
};

// Check if cart has expired (24 hours of inactivity)
const isCartExpired = (expiresAt) => {
  if (!expiresAt) return false;
  return new Date() > new Date(expiresAt);
};

export const cartReducer = (state = initialState, action) => {
  switch (action.payload) {
    case cartTypes.addItem: {
      const existingItem = state.items.find((i) => i.sku === action.payload.sku);
      
      if (existingItem) {
        // Check if adding quantity would exceed stock
        const newQuantity = existingItem.quantity + action.payload.quantity;
        if (newQuantity > action.payload.stock) {
          return {
            ...state,
            error: `Cantidad disponible en stock: ${action.payload.stock}`,
          };
        }
        
        return {
          ...state,
          items: state.items.map((i) =>
            i.sku === action.payload.sku
              ? {
                  ...i,
                  quantity: newQuantity,
                }
              : i
          ),
          lastModified: new Date().toISOString(),
          error: null,
        };
      }
      
      // Add new item with frozen price
      const newItem = {
        sku: action.payload.sku,
        name: action.payload.name,
        price: action.payload.price,
        frozenPrice: action.payload.price, // Freeze price for 2 hours
        frozenUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        quantity: action.payload.quantity,
        stock: action.payload.stock,
        addedAt: new Date().toISOString(),
      };
      
      return {
        ...state,
        items: [...state.items, newItem],
        lastModified: new Date().toISOString(),
        expiresAt: new Date(Date.now() + CART_EXPIRY_HOURS * 60 * 60 * 1000).toISOString(),
        error: null,
      };
    }

    case cartTypes.removeItem:
      return {
        ...state,
        items: state.items.filter((i) => i.sku !== action.payload.sku),
        lastModified: new Date().toISOString(),
        error: null,
      };

    case cartTypes.updateQuantity: {
      const newQuantity = action.payload.quantity;
      const item = state.items.find((i) => i.sku === action.payload.sku);
      
      if (!item) return state;
      
      // Check stock limit
      if (newQuantity > item.stock) {
        return {
          ...state,
          error: `Stock disponible: ${item.stock}`,
        };
      }
      
      if (newQuantity <= 0) {
        return cartReducer(state, {
          type: cartTypes.removeItem,
          payload: { sku: action.payload.sku },
        });
      }
      
      return {
        ...state,
        items: state.items.map((i) =>
          i.sku === action.payload.sku
            ? { ...i, quantity: newQuantity }
            : i
        ),
        lastModified: new Date().toISOString(),
        error: null,
      };
    }

    case cartTypes.clearCart:
      return {
        ...initialState,
      };

    case cartTypes.setCartLoading:
      return {
        ...state,
        loading: action.payload,
      };

    case cartTypes.setCartError:
      return {
        ...state,
        error: action.payload,
      };

    case cartTypes.loadCartFromStorage:
      if (isCartExpired(action.payload.expiresAt)) {
        return initialState;
      }
      return {
        ...state,
        items: action.payload.items || [],
        expiresAt: action.payload.expiresAt,
        lastModified: action.payload.lastModified,
      };

    default:
      return state;
  }
};

// Storage utilities
export const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart to storage', e);
  }
};

export const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : initialState;
  } catch (e) {
    console.error('Failed to load cart from storage', e);
    return initialState;
  }
};

export const clearCartStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear cart storage', e);
  }
};
