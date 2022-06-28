import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useState, useContext } from "react";
import CartContext from "./../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onClose }) => {
  const ORDERS_URL =
    "https://foodorderapp-5bfd4-default-rtdb.europe-west1.firebasedatabase.app/orders.json";
  const [isCheckout, setIsCheckout] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const context = useContext(CartContext);
  const totalAmount = `$${context.totalAmount?.toFixed(2) || 0.0}`;
  const hasItems = context.items?.length > 0;

  const cartItemRemoveHandler = (id) => {
    context.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    context.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(ORDERS_URL, {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: context.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    context.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items?.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={onClose} onSubmit={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
