import Order, { PaymentResult } from "../../entities/Order";
import Item from "../../entities/Item";
import ShippingAddress from "../../entities/ShippingAddress";

interface IRepoOrderStrategy {
  addOrder(
    userId: string,
    items: Item[],
    shippingAddress: ShippingAddress,
    paymentMethod: string,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number
  ): Promise<Order | undefined>;
  getOrder(id: string): Promise<Order | undefined>;
  getMyOrders(userId: string): Promise<Order[] | undefined>;
  payOrder(
    id: string,
    paymentResult: PaymentResult
  ): Promise<Order | undefined>;
}

export default IRepoOrderStrategy;
