import { RequestHandler } from "express";
import IRepoOrderStrategy from "../../../repositories/interfaces/IRepoOrderStrategy";

export default class OrderController {
  public readonly repository: IRepoOrderStrategy;
  constructor(orderRepo: IRepoOrderStrategy) {
    this.repository = orderRepo;
  }
  addOrder: RequestHandler = async (req, res, next) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      if (orderItems && orderItems === 0) {
        return res.status(400).json({ message: "No Order Items" });
      }
      const order = await this.repository.addOrder(
        req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      );
      if (order) {
        return res.status(201).json(order);
      }
      return res.status(401).json({ message: "Order was not created" });
    } catch (err) {
      console.log(`Error  : ${err}`);
      return res.status(401).json({ message: "Order was not created" });
    }
  };

  // return only orders to owner/ admin
  getOrder: RequestHandler = async (req, res, next) => {
    try {
      const order = await this.repository.getOrder(req.params.id);
      // check if user is owner or adminn
      if (
        order!.user._id.toString() !== req.user._id.toString() ||
        req.user.isAdmin
      ) {
        return res.status(401).json({ message: "Order not found" });
      }
      if (order) {
        return res.json(order);
      }
      return res.status(404).json({ message: "Order not found" });
    } catch (err) {
      console.log(`Error  : ${err}`);
      return res.status(401).json({ message: "Order not found" });
    }
  };

  getMyOrders: RequestHandler = async (req, res, next) => {
    try {
      let id: string;
      if (req.params && req.user.isAdmin) {
        id = req.params.id;
      } else {
        id = req.user._id;
      }
      const orders = await this.repository.getMyOrders(id);
      if (orders) {
        return res.json(orders);
      }
      return res.status(404).json({ message: "No Order found" });
    } catch (err) {
      console.log(`Error  : ${err}`);
      return res.status(401).json({ message: "error while searching orders" });
    }
  };

  payOrder: RequestHandler = async (req, res, next) => {
    try {
      const paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateOrder = await this.repository.payOrder(
        req.params.id,
        paymentResult
      );
      if (updateOrder) {
        return res.json(updateOrder);
      }
      console.log("Order not found!");
      return res.status(404);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };
}
