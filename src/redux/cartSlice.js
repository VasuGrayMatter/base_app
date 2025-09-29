import { createSlice } from '@reduxjs/toolkit';
import { loadUserState } from './storageUtils'; // Import from utils

// Helper to get initial cart state for a user
const getInitialCartState = (username) => {
  if (username) {
    const userState = loadUserState(username);
    return userState?.cart || { food: [], events: [], cab: [], hotel: [] };
  }
  return { food: [], events: [], cab: [], hotel: [] };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialCartState(''),
  reducers: {
    addToCart: (state, action) => {
      const { category, item } = action.payload;
      const existingItem = state[category].find(i => i.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state[category].push({ ...item, quantity: item.quantity || 1 });
      }
    },
    
    removeFromCart: (state, action) => {
      const { category, id } = action.payload;
      state[category] = state[category].filter(item => item.id !== id);
    },
    
    updateQuantity: (state, action) => {
      const { category, id, quantity } = action.payload;
      const item = state[category].find(item => item.id === id);
      if (item) {
        if (quantity <= 0) {
          state[category] = state[category].filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    
    clearCart: (state) => {
      state.food = [];
      state.events = [];
      state.cab = [];
      state.hotel = [];
    },
    
    clearCategory: (state, action) => {
      const { category } = action.payload;
      state[category] = [];
    },
    
    // Load cart for specific user
    loadUserCart: (state, action) => {
      const { username } = action.payload;
      const userState = loadUserState(username);
      return userState?.cart || { food: [], events: [], cab: [], hotel: [] };
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  clearCategory,
  loadUserCart 
} = cartSlice.actions;

export default cartSlice.reducer;