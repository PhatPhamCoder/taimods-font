/* eslint-disable react/jsx-key */
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { mongooseConnect } from "@/lib/mongoose";
import { Game } from "@/models/Game";
import Head from "next/head";

export default function ProductPage({ products }) {
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Tất cả sản phẩm</title>
        <meta property="og:title" content="Tất cả sản phẩm" key="title" />
      </Head>
      <Header />
      <div className="grid grid-cols-4 gap-[20px] mx-[100px]">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Game.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
