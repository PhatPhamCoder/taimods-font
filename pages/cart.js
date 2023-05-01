/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Input from "@/components/Input";
import axios from "axios";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setproducts] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhongNumber] = useState("");
  const [zalo, setZalo] = useState("");
  const [email, setEmail] = useState("");
  const [linkFb, setLinkFb] = useState("");
  const [note, setNote] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setproducts(res.data);
      });
    }
  }, [cartProducts]);

  useEffect(() => {
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const res = await axios.post("/api/checkout", {
      name,
      phoneNumber,
      zalo,
      email,
      linkFb,
      note,
      cartProducts,
    });

    if (res.data.url) {
      window.location = res.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.discount || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <div>
        <Header />
        <div className="h-screen flex items-center flex-col mt-10">
          <h1 className="font-bold text-2xl mb-2">
            <BsFillCheckCircleFill
              size={100}
              className="text-green-400 flex mx-auto mb-2"
            />
            Thanh toán thành công!
          </h1>
          <p>Hệ thống sẽ gửi mail xác nhận đơn hàng của bạn</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Giỏ hàng</title>
        <meta property="og:title" content="Giỏ hàng" key="title" />
      </Head>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 container gap-10 mt-2">
        <div className="bg-white border-lime-100 p-2 rounded-md">
          <h2 className="text-2xl font-bold mb-2 flex gap-2">
            Danh sách sản phẩm
          </h2>
          {!cartProducts?.length && <div>Giỏ hàng trống</div>}
          {products.length > 0 && (
            <>
              {products.map((product) => {
                let price = product.price;
                let discount = product.discount;
                const quantity = cartProducts.filter(
                  (id) => id === product._id,
                ).length;
                const saveMoney = price % discount;

                return (
                  <div className="grid grid-cols-2 gap-2 mb-2 border-b pb-2 border-red-600">
                    <div>
                      <img
                        src={product.images}
                        alt=""
                        width="300px"
                        className="rounded-md"
                      />
                    </div>
                    <div className="">
                      <h2 className="font-bold text-xl mb-3">
                        {product.title}
                      </h2>
                      <div className="flex gap-1 items-center">
                        <h5 className="font-bold mb-1">Số lượng:</h5>
                        <div className="flex gap-2 rounded-md">
                          <button
                            onClick={() => lessOfThisProduct(product._id)}
                            className="border px-2 rounded-s-md bg-gray-300"
                          >
                            -
                          </button>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                          <button
                            onClick={() => moreOfThisProduct(product._id)}
                            className="border px-2 rounded-e-md bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-1">
                        <h5 className="font-bold">Giá tiền:</h5>
                        <div className="text-red-500 font-bold flex">
                          {(quantity * discount).toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                        <div className="line-through flex">
                          {(quantity * price).toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <h5 className="font-bold">Tiết kiệm:</h5>
                        {(quantity * saveMoney).toLocaleString("en-US", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="bg-white border-lime-100 p-2 rounded-lg">
          {!!cartProducts?.length && (
            <>
              <table className="basic mb-3">
                <thead className="basic">
                  <tr>
                    <td>Tên sản phẩm</td>
                    <td>Số lượng</td>
                    <td>Giá Gốc</td>
                    <td>Giá đã giảm</td>
                    <td>Thành tiền</td>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 && (
                    <>
                      {products.map((product) => {
                        let price = product.price;
                        let discount = product.discount;
                        const quantity = cartProducts.filter(
                          (id) => id === product._id,
                        ).length;

                        return (
                          <tr>
                            <td>{product.title.slice(0, 20) + "..."}</td>
                            <td>{quantity}</td>
                            <td>
                              {price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                            <td>
                              {discount.toLocaleString("en-US", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                            <td>
                              {(quantity * discount).toLocaleString("en-US", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>

              <div className="flex justify-between items-center mb-2 border-b py-2 border-red-300 border-t">
                <h4 className="font-bold text-2xl">Giá trị đơn hàng:</h4>
                <div className="text-xl font-bold text-red-500">
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Thông tin đặt hàng
              </h2>

              <div className="grid grid-cols-1">
                <label>Họ và tên</label>
                <Input
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ và tên ở đây"
                  className="mb-2 border-2 p-1 rounded-md focus:outline-blue-500"
                />

                <lable>Số điện thoại</lable>
                <Input
                  type="number"
                  value={phoneNumber}
                  name="phoneNuber}"
                  onChange={(e) => setPhongNumber(e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="mb-2 border-2 p-1 rounded-md focus:outline-blue-500"
                />

                <lable>Số Zalo</lable>
                <Input
                  type="number"
                  value={zalo}
                  name="zalo"
                  onChange={(e) => setZalo(e.target.value)}
                  placeholder="Nhập số zalo"
                  className="mb-2 border-2 p-1 rounded-md focus:outline-blue-500"
                />

                <lable>Email</lable>
                <Input
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="examplate@gmail.com"
                  className="mb-2 border-2 p-1 rounded-md focus:outline-blue-500"
                />

                <lable>Link Facebook</lable>
                <Input
                  type="text"
                  value={linkFb}
                  name="linkFb"
                  onChange={(e) => setLinkFb(e.target.value)}
                  placeholder="https://www.facebook.com/tennguoidung/"
                  className="mb-2 border-2 p-1 rounded-md focus:outline-blue-500"
                />

                <lable>Ghi chú</lable>
                <textarea
                  type="text"
                  value={note}
                  name="note"
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nhập ghi chú đơn hàng ...."
                  className="mb-2 border-2 p-1 rounded-md focus:outline-blue-500"
                />
              </div>
              <button onClick={goToPayment} className="btn-red flex mx-auto">
                Tiến hành thanh toán
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
