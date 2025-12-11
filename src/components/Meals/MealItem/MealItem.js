import { useContext } from "react";

import CartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const restaurantName = props.restaurant_name || "Unknown Restaurant";
  const price = `₹${props.price.toFixed(2)}`;

  const addItemToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>
          {props.name} |
          <span style={{ color: "#2980b9" }}> {restaurantName}</span>
        </h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addItemToCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
