import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default function Home({ featuredProduct, newProducts }) {
  console.log({ newProducts });
  return (
    <div>
      <Header></Header>
      <Featured product={featuredProduct}></Featured>
      <NewProducts products={newProducts} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const featuredProductId = "666b27ed86eb88b1bd8dc1c7";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
};
