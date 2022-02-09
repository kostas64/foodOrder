import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ onCartClick }) => {
  return (
    <button className={classes.button} onClick={onCartClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Cart </span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
