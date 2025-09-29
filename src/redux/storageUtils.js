// storageUtils.js - Pure utility functions (no imports from slices/store)
export const loadUserState = (username) => {
  try {
    const serializedState = localStorage.getItem(`bookingApp_${username}`);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

export const saveUserState = (username, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`bookingApp_${username}`, serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};