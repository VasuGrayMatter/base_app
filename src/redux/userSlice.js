import { createSlice } from '@reduxjs/toolkit';
import { saveUserState } from './storageUtils';

const initialState = { 
  username: '', 
  role: 'user',
  isLoggedIn: false,
  token: '' // Add token field
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { username, role = 'user', token = '' } = action.payload;
      state.username = username;
      state.role = role;
      state.isLoggedIn = true;
      state.token = token; // Store token

      // Persist state to localStorage
      saveUserState(username, { user: state });
    },
    logoutUser: (state) => {
      state.username = '';
      state.role = 'user';
      state.isLoggedIn = false;
      state.token = ''; // Clear token
    },
    updateUserProfile: (state, action) => {
      Object.assign(state, action.payload);

      // Save updated profile to localStorage
      if (state.username) {
        saveUserState(state.username, { user: state });
      }
    },
    // New reducer to update token if needed
    updateToken: (state, action) => {
      state.token = action.payload;
      if (state.username) {
        saveUserState(state.username, { user: state });
      }
    }
  }
});

export const { loginUser, logoutUser, updateUserProfile, updateToken } = userSlice.actions;
export default userSlice.reducer;