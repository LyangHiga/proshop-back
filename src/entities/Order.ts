import User from "./User";
import Item from "./Item";
import ShippingAddress from "./ShippingAddress";

export interface PaymentResult {
  id: String;
  status: String;
  update_time: String;
  email_address: String;
}

export default interface Order {
  user: User;
  orderItems: Item[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: number;
  isDelivered: boolean;
  deliveredAt?: Date;
}
