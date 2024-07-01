import Center from "./Center";
import classes from "./NewProducts.module.scss";
import ProductBox from "./ProductBox";

const NewProducts = ({ products }) => {
  return (
    <Center>
      <h2 className={classes.title}>Nowości</h2>
      <div className={classes.productsGrid}>
        {products.length > 0 &&
          products.map((product) => (
            <div key={product._id}>
              <ProductBox {...product}></ProductBox>
            </div>
          ))}
      </div>
    </Center>
  );
};

export default NewProducts;
