import React, { useState } from "react";
import classes from "./ProductImages.module.scss";

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <React.Fragment>
      <div className={classes.bigImageWrapper}>
        {" "}
        <img alt="" src={activeImage} className={classes.bigImage}></img>
      </div>

      <div className={classes.imageButtons}>
        {images.map((image) => (
          <div
            className={classes.imageButton}
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <img src={image} alt="" className={classes.image} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductImages;
