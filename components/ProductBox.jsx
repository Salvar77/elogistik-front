import Link from "next/link";
import classes from "./ProductBox.module.scss";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductBox = ({ _id, title, price, descripiton, images }) => {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  return (
    <div className={classes.productWrapper}>
      <Link className={classes.whiteBox} href={url}>
        <img src={images?.[0]} alt=""></img>
      </Link>
      <div className={classes.productInfoBox}>
        <Link className={classes.title} href={url}>
          {title}
        </Link>
        <div className={classes.priceRow}>
          <div className={classes.price}>${price}</div>
          <button onClick={() => addProduct(_id)} className={classes.button}>
            <CartIcon />
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
