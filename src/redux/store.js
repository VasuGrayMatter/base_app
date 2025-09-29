import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import inventoryReducer from './inventorySlice';
import { saveUserState, loadUserState } from './storageUtils'; // Import from utils

export { loadUserState, saveUserState }; // Re-export if needed

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    inventory: inventoryReducer
  }
});

// Subscribe to store changes and save per user
store.subscribe(() => {
  const state = store.getState();
  if (state.user.username) {
    saveUserState(state.user.username, {
      cart: state.cart,
      user: state.user
    });
  }
});