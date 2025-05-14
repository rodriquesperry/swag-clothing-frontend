import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart_icon.styles.scss';



const CartIcon = ({ onClick }) => {
  const { count } = useContext(CartContext);

  return (
    <div className='cart-icon-container' onClick={onClick}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{count}</span>
    </div>
  )
}

export default CartIcon