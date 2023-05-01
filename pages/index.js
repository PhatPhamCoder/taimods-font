import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import Banner from "../assets/banner.png";
import { Game } from "@/models/Game";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
export default function Home({ newProducts }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Trang Chủ</title>
        <meta
          property="og:title"
          content="Trang chủ - taimods.com"
          key="title"
        />
      </Head>
      <Header />
      {/* Banner */}
      <div className="px-[20px] mt-2 flex items-center justify-center">
        <Image src={Banner} alt="Banner" width="100%" height="100%" />
      </div>

      {/* Combo */}
      <div className="px-[160px] mt-2">
        <h1 className="border-b-2 border-red-600 text-2xl font-bold">
          Sản phẩm mới
        </h1>
        <div className="flex gap-2">
          <NewProducts newProducts={newProducts} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const comboProductId = await Game.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(comboProductId)),
    },
  };
}
