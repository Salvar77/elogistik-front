import Header from "@/components/Header";
import classes from "../styles/Products.module.scss";
import Center from "@/components/Center";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Products";
import ProductsGrid from "@/components/ProductsGrid";

const ProductsPage = ({ products }) => {
  console.log({ products });
  return (
    <>
      <Header />
      <Center>
        {" "}
        <h1 className={classes.title}>Wszystkie produkty</h1>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
};

export default ProductsPage;

export const getServerSideProps = async () => {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  console.log({ products });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
