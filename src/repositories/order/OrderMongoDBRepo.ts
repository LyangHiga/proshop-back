import IRepoOrderStrategy from "../interfaces/IRepoOrderStrategy";
import OrderModel from "../db/mongo/models/orderModel";

import Item from "../../entities/Item";
import ShippingAddress from "../../entities/ShippingAddress";
import { PaymentResult } from "../../entities/Order";

export default class OrderMongoDBRepo implements IRepoOrderStrategy {
  addOrder = async (
    userId: string,
    items: Item[],
    shippingAddress: ShippingAddress,
    paymentMethod: string,
    itemsPrice: number,
    shippingPrice: number,
    taxPrice: number,
    totalPrice: number
  ) => {
    try {
      const order = await OrderModel.create({
        user: userId,
        orderItems: items,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      if (order) {
        return order;
      }
      console.log("Order was not created!");
      return undefined;
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };
  getOrder = async (id: string) => {
    try {
      const order = await OrderModel.findById(id).populate(
        "user",
        "name email"
      );
      if (order) {
        return order;
      }
      console.log("Order not found");
      return undefined;
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };
  getMyOrders = async (userId: string) => {
    try {
      const orders = await OrderModel.find({ user: userId });
      if (orders) {
        return orders;
      }
      console.log("Orders not found");
      return undefined;
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };
  payOrder = async (id: string, paymentResult: PaymentResult) => {
    try {
      const order = await OrderModel.findById(id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: paymentResult.id,
          status: paymentResult.status,
          update_time: paymentResult.update_time,
          email_address: paymentResult.email_address,
        };

        const updatedOrder = await order.save();
        return updatedOrder;
      } else {
        console.error(`Error: Order not found`);
        return undefined;
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };
}
