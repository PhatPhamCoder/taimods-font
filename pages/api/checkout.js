import { mongooseConnect } from "@/lib/mongoose";
import { Game } from "@/models/Game";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.json("Should be a POST Request");
    return;
  }

  const { name, phoneNumber, zalo, email, linkFb, note, cartProducts } =
    req.body;
  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfor = await Game.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfor.find(
      (p) => p._id.toString() === productId,
    );
    const quantity = productsIds.filter((id) => id === productId).length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "VND",
          product_data: { name: productInfo.title },
          unit_amount: productInfo.discount,
        },
      });
    }
  }
  const OrderDoc = await Order.create({
    line_items,
    name,
    phoneNumber,
    zalo,
    email,
    linkFb,
    note,
    paid: false,
  });

  // Payment With Stripe
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: OrderDoc._id.toString(), test: "OK" },
  });

  res.json({
    url: session.url,
  });
}
