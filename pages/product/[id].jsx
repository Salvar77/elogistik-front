import Center from "@/components/Center";
import Header from "@/components/Header";
import classes from "./ProductPage.module.scss";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Products";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ProductPage = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <div className={classes.colWrapper}>
          <div className={classes.whiteBox}>
            <ProductImages images={product.images} />
          </div>
          <div>
            <h1 className={classes.title}>{product.title}</h1>
            <p>{product.description}</p>
            <div className={classes.priceRow}>
              <div className={classes.price}>${product.price}</div>
              <Button onClick={() => addProduct(product._id)}>
                <CartIcon />
                Dodaj do koszyka
              </Button>
            </div>
          </div>
        </div>
      </Center>
    </>
  );
};

export default ProductPage;

export const getServerSideProps = async (context) => {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};
