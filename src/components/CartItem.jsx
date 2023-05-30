import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../redux/slices/cartSlice';

const CartItem = ({ id, name, type, size, price, count, imageUrl }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id }));
  };
  const onClickMinus = () => {
    dispatch(minusItem(id));
  };
  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to remove?')) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{name}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus">
          -
        </div>
        <b>{count}</b>
        <div
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus">
          +
        </div>
      </div>
      <div className="cart__item-price">
        <b>${price * count}</b>
      </div>
      <div className="cart__item-remove">
        <div onClick={onClickRemove} className="button button--outline button--circle">
          x
        </div>
      </div>
    </div>
  );
};

export default CartItem;
