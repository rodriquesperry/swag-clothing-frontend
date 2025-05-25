import { useSelector } from 'react-redux';
import { selectCartCount } from '../../store/cart/cart.selector';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart_icon.styles.scss';



const CartIcon = ({ onClick }) => {
  const count = useSelector(selectCartCount);

  return (
    <div className='cart-icon-container' onClick={onClick}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{count}</span>
    </div>
  )
}

export default CartIcon