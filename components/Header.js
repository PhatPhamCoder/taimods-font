/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styled from "styled-components";
import {
  AiFillCar,
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { TbDiscount2 } from "react-icons/tb";
import { FaMapMarkedAlt, FaTrailer } from "react-icons/fa";
import { MdOutlineAddAlarm, MdOutlineAutoMode } from "react-icons/md";
import { BsSearchHeart } from "react-icons/bs";
import { useContext } from "react";
import { CartContext } from "./CartContext";
export default function Header() {
  const { cartProducts } = useContext(CartContext);

  return (
    <header className="bg-black px-[20px] pt-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <img
            src="https://shop.taimods.com/files/assets/logomini.png"
            alt="Logo-header"
            width="200px"
          />
        </Link>
        <div className="relative w-[800px] flex gap-10">
          <input
            type="search"
            id="default-search"
            placeholder="Nhập sản phẩm muốn tìm...."
            className="block outline-none w-full p-3 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <BsSearchHeart size={20} />
          </button>
        </div>

        <div className="text-white relative">
          <p className="absolute top-[-10px] right-[-10px] rounded-full bg-red-600 border px-2">
            {cartProducts.length}
          </p>
          <Link href={"/cart"}>
            <AiOutlineShoppingCart size={40} className="text-white" />
          </Link>
        </div>
      </div>
      <div className="hidden md:block text-white font-bold mt-2 text-xl">
        <div className="flex gap-5">
          <Link
            href={"/"}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <AiOutlineHome size={20} />
            Trang Chủ
          </Link>
          <Link
            href={"/"}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <TbDiscount2 size={20} />
            Combo Khuyến mãi
          </Link>

          <div className="relative">
            <div className="peer text-white cursor-pointer flex gap-2 items-center">
              <FaMapMarkedAlt size={20} />
              Mod Map
            </div>

            {/* the menu here  */}
            <div className="hidden peer-hover:flex hover:flex w-[200px] rounded-md flex-col bg-white drop-shadow-lg absolute text-black">
              <a className="px-5 py-3 hover:bg-gray-200 rounded-md" href="#">
                map VN
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="peer text-white cursor-pointer flex gap-2 items-center">
              <AiFillCar size={20} />
              Mod Xe
            </div>

            {/* the menu here  */}
            <div className="hidden peer-hover:flex hover:flex w-[200px] rounded-md flex-col bg-white drop-shadow-lg absolute text-black">
              <a className="px-5 py-3 hover:bg-gray-200 rounded-md" href="#">
                Xe khách (Bus Thaco)
              </a>
              <a className="px-5 py-3 hover:bg-gray-200 rounded-md" href="#">
                Xe tải (Truck)
              </a>
            </div>
          </div>
          <Link
            href={"/"}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FaTrailer size={20} />
            Mod Trailer
          </Link>

          <div className="relative">
            <div className="peer text-white cursor-pointer flex gap-2 items-center">
              <MdOutlineAddAlarm size={20} />
              Mod Add On
            </div>

            {/* the menu here  */}
            <div className="hidden peer-hover:flex hover:flex w-[200px] rounded-md flex-col bg-white drop-shadow-lg absolute text-black">
              <a className="px-5 py-3 hover:bg-gray-200 rounded-md" href="#">
                Mod âm thanh
              </a>
              <a className="px-5 py-3 hover:bg-gray-200 rounded-md" href="#">
                Mod Skin
              </a>
              <a className="px-5 py-3 hover:bg-gray-200 rounded-md" href="#">
                Phụ kiện
              </a>
            </div>
          </div>
          <Link
            href={"/products"}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <MdOutlineAutoMode size={20} />
            Tất cả mod
          </Link>
        </div>
      </div>
    </header>
  );
}
