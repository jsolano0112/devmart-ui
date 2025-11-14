export const cartTypes = {
  // Cart item actions
  addItem: 'CART_ADD_ITEM',
  removeItem: 'CART_REMOVE_ITEM',
  updateQuantity: 'CART_UPDATE_QUANTITY',
  clearCart: 'CART_CLEAR',
  setExpiresAt: 'CART_SET_EXPIRES_AT',
  
  // Cart state
  setCartLoading: 'CART_SET_LOADING',
  setCartError: 'CART_SET_ERROR',
  loadCartFromStorage: 'CART_LOAD_FROM_STORAGE',
};

export const orderTypes = {
  // Checkout states
  setCheckoutLoading: 'CHECKOUT_SET_LOADING',
  setCheckoutError: 'CHECKOUT_SET_ERROR',
  setCheckoutSuccess: 'CHECKOUT_SET_SUCCESS',
  resetCheckout: 'CHECKOUT_RESET',
  
  // Order confirmation
  setOrderConfirmation: 'ORDER_SET_CONFIRMATION',
};
