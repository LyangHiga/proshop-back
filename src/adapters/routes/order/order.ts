import { Router } from "express";

import { protect } from "../../middleware/authMiddleware";
import OrderController from "../../controllers/order/orderController";
import OrderMongoDBRepo from "../../../repositories/order/OrderMongoDBRepo";

const router = Router();

const orderRepository = new OrderMongoDBRepo();
// to use another repository:
// just create a new class, must implements IRepoOrderStrategy
// than pass as repository to this controller
const controller = new OrderController(orderRepository);

router.route("/").post(protect, controller.addOrder);
router.route("/myorders").get(protect, controller.getMyOrders);
router.route("/:id").get(protect, controller.getOrder);
router.route("/:id/pay").put(protect, controller.payOrder);

export default router;
