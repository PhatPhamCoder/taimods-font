import { Schema, models, model } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    phoneNumber: Number,
    zalo: Number,
    email: String,
    linkFb: String,
    note: String,
    paid: Boolean,
  },
  { timestamps: true },
);

export const Order = models.Order || model("Order", OrderSchema);
