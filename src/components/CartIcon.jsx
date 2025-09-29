import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SummaryPopup from './SummaryPopup';
import './CartIcon.css';

export default function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);

  const totalItems = Object.values(cart).flat().reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div 
        className="cart-icon" 
        onClick={() => setIsOpen(true)}
        title={`${user.username}'s Cart - ${totalItems} items`}
      >
        <span className="cart-icon-symbol">🛒</span>
        {totalItems > 0 && (
          <span className="cart-badge">{totalItems}</span>
        )}
      </div>
      
      {isOpen && (
        <SummaryPopup 
          onClose={() => setIsOpen(false)}
          username={user.username}
        />
      )}
    </>
  );
}