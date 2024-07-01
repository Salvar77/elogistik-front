import Center from "./Center";
import Image from "next/image";
import classes from "./Featured.module.scss";
import fotoBg from "../assets/images/hero1_640.jpg";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Featured = ({ product }) => {
  const { addProduct } = useContext(CartContext);

  const addFeaturedToCart = () => {
    addProduct(product._id);
  };

  return (
    <div className={classes.bg}>
      <Center>
        <div className={classes.columnsWrapper}>
          <div className={classes.column}>
            <div>
              <h1 className={classes.title}>{product.title}</h1>
              <p className={classes.desc}>{product.description}</p>
              <div className={classes.buttonsWrapper}>
                <ButtonLink
                  href={"/products/" + product._id}
                  className={classes.button}
                >
                  Czytaj więcej
                </ButtonLink>
                <Button size="l" onClick={() => addFeaturedToCart()}>
                  <CartIcon />
                  Dodaj do koszyka
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.column}>
            <Image src={fotoBg} alt=""></Image>
          </div>
        </div>
      </Center>
    </div>
  );
};

export default Featured;
