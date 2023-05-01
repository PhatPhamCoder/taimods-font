/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Game } from "@/models/Game";
import { useContext, useState } from "react";
import { BsCartPlus } from "react-icons/bs";

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  console.log(product);
  const [activeImg, setActiveImg] = useState(product.images?.[0]);
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <div className="grid grid-cols-2 px-[100px] gap-[20px] mt-2 ">
        <div className="bg-white p-5 mr-[150px] rounded-md">
          <img src={activeImg} alt="" width="500px" className="rounded-md" />
          <div className="flex gap-2 mt-2">
            {product.images &&
              product.images.map((img) => (
                <div onClick={() => setActiveImg(img)}>
                  <img
                    src={img}
                    alt="thumnail"
                    width="100px"
                    className={
                      activeImg
                        ? "border-red-400 rounded-md border-2"
                        : "rounded-md border-2"
                    }
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="ml-[-150px]">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p>{product.desciption}</p>
          <div className="flex gap-2 items-center mt-2">
            <div className="text-red-500 font-bold text-2xl">
              {product.discount.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <div className="line-through">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
          <button
            className="btn-red flex items-center gap-1 mt-10"
            onClick={() => addProduct(product._id)}
          >
            <BsCartPlus size={20} />
            Mua hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const productInfo = await Game.findById({ _id: id });
  return {
    props: {
      product: JSON.parse(JSON.stringify(productInfo)),
    },
  };
}
