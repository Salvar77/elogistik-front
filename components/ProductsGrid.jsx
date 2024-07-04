import ProductBox from "./ProductBox";
import classes from "./ProductsGrid.module.scss";

const ProductsGrid = ({ products }) => {
  return (
    <div className={classes.productsGrid}>
      {products.length > 0 &&
        products.map((product) => (
          <div key={product._id}>
            <ProductBox key={product._id} {...product}></ProductBox>
          </div>
        ))}
    </div>
  );
};

export default ProductsGrid;
