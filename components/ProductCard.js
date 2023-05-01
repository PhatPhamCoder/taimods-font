/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "./CartContext";
import Link from "next/link";

export default function ProductCard({ _id, title, images, price, discount }) {
  const { addProduct } = useContext(CartContext);

  const url = "/product/" + _id;
  return (
    <div>
      <div className="mt-2 w-[300px] bg-white p-1 rounded-md">
        <div>
          <img
            src={images?.[0]}
            alt="Thumnail"
            width={"300px"}
            className="rounded-md"
          />
        </div>
        <Link href={url}>{title.slice(0, 60) + "..."}</Link>
        <div className="flex gap-5 items-center justify-between">
          <div className="flex gap-1">
            <div className="text-red-500 font-bold flex">
              {new Intl.NumberFormat("vi-VN").format(discount)}đ
            </div>
            <div className="line-through flex">
              {new Intl.NumberFormat("vi-VN").format(price)}đ
            </div>
          </div>
          <button
            className="btn-red flex items-center gap-1"
            onClick={() => addProduct(_id)}
          >
            <BsCartPlus size={20} />
            Mua hàng
          </button>
        </div>
      </div>
    </div>
  );
}
