import { Router } from "express";

import { protect, admin } from "../../middleware/authMiddleware";

import UserController from "../../controllers/user/userController";
import OrderController from "../../controllers/order/orderController";

import UserMongoDBRepo from "../../../repositories/user/UserMongoDBRepo";
import OrderMongoDBRepo from "../../../repositories/order/OrderMongoDBRepo";

const router = Router();
const userRepository = new UserMongoDBRepo();
// to use another repository:
// just create a new class, must implements RepoProducts
// than pass as repository to this controller
const controller = new UserController(userRepository);

// To return all orders from a given user
const orderRepository = new OrderMongoDBRepo();
const orderController = new OrderController(orderRepository);

router
  .route("/")
  .post(controller.createUser)
  .get(protect, admin, controller.getUsers);
router.route("/login").post(controller.authUser);
// FIXME: /profile should be the same than /:id, just passing the own user id
router
  .route("/profile")
  .get(protect, controller.getUserProfile)
  .put(protect, controller.updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, controller.getUserProfile)
  .delete(protect, admin, controller.deleteUser)
  .put(protect, admin, controller.updateUserByAdmin);
router.route("/:id/orders").get(protect, admin, orderController.getMyOrders);

export default router;
