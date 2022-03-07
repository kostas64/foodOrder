import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = ({ name, price, id, description }) => {
  const priceFixed = `$${price.toFixed(2)}`;
  const context = useContext(CartContext);
  const addToCartHandler = (amount) => {
    context.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>
          {description}
        </div>
        <div className={classes.price}>{priceFixed}</div>
      </div>
      <div>
        <MealItemForm
          id={id}
          onAddToCart={addToCartHandler}
        />
      </div>
    </li>
  );
};

export default MealItem;
