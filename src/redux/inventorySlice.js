import { createSlice } from '@reduxjs/toolkit';
import mockData from '../utils/mockData.json';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: mockData, // This should be your mock data structure
  reducers: {
    addInventoryItem: (state, action) => {
      const { category, item } = action.payload;
      state[category].push(item);
    },
    
    removeInventoryItem: (state, action) => {
      const { category, id } = action.payload;
      state[category] = state[category].filter(item => item.id !== id);
    },
    
    updateInventoryItem: (state, action) => {
      const { category, id, updates } = action.payload;
      const itemIndex = state[category].findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        state[category][itemIndex] = { ...state[category][itemIndex], ...updates };
      }
    },
    
    setInventory: (state, action) => {
      const { category, items } = action.payload;
      state[category] = items;
    },
    
    // For admin functionality - reset entire inventory
    resetInventory: (state, action) => {
      return mockData; // Reset to original mock data
    }
  }
});

export const { 
  addInventoryItem, 
  removeInventoryItem, 
  updateInventoryItem, 
  setInventory,
  resetInventory 
} = inventorySlice.actions;

export default inventorySlice.reducer;