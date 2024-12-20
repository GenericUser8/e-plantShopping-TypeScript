import React from 'react';
import { removeItem, updateQuantity } from '../redux/CartSlice';
import '../styles/CartItem.css';

import type { CartPlant } from '../redux/CartSlice';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getTotalPriceOfProduct } from '../redux/utils';

export default function CartItem({ onContinueShopping }: { onContinueShopping: (e: React.MouseEvent) => void }) {
  
  const cart = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  /** Calculate total amount for all products in the cart. */
  function calculateTotalAmount(): number {
    let runningTotal = 0;
    for (const item of cart) {
      runningTotal += getTotalPriceOfProduct(item);
    }
    return runningTotal;
  }

  /** Calls the `onContinueShopping` function passed as a prop. */
  function handleContinueShopping(e: React.MouseEvent) { onContinueShopping(e); };

  /** Increases the amount in the cart by 1. */
  function handleIncrement(item: CartPlant) {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(updateQuantity(updatedItem));
  }

  /** Decreases the amount in the cart by one. If the new quantity is 0, it calls `handleRemove`. */
  function handleDecrement(item: CartPlant) {
    const updatedItem = { ...item, quantity: item.quantity - 1 };
    if (updatedItem.quantity <= 0) {
      handleRemove(item);
      return;
    }
    dispatch(updateQuantity(updatedItem));
  }

  /** Unconditionally removes the item from the cart. */
  function handleRemove(item: CartPlant) {
    dispatch(removeItem(item));
  }

  /** Calculate total cost based on quantity for an item. */
  function calculateTotalCost(item: CartPlant) {
    return getTotalPriceOfProduct(item);
  }

  /** Can be used to handle checkout in the future. */
  function handleCheckoutShopping(e: React.MouseEvent) {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  }

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={e => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
}