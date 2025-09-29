import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

export default function UserProfile() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        <span className="user-avatar">👤</span>
        <div className="user-details">
          <span className="username">{user.username}</span>
          <span className="user-role">{user.role}</span>
        </div>
      </div>
      <button className="logout-btn" onClick={handleLogout} title="Logout">
        🚪
      </button>
    </div>
  );
}