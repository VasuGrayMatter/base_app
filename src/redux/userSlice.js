import { createSlice } from '@reduxjs/toolkit';
import { saveUserState } from './storageUtils'; // Import from utils

const initialState = { 
  username: '', 
  role: 'user',
  isLoggedIn: false 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { username, role = 'user' } = action.payload;
      state.username = username;
      state.role = role;
      state.isLoggedIn = true;

      // Persist state to localStorage
      saveUserState(username, { user: state });
    },
    logoutUser: (state) => {
      state.username = '';
      state.role = 'user';
      state.isLoggedIn = false;
    },
    updateUserProfile: (state, action) => {
      Object.assign(state, action.payload);

      // Save updated profile to localStorage
      if (state.username) {
        saveUserState(state.username, { user: state });
      }
    }
  }
});

export const { loginUser, logoutUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;