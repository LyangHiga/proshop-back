import { Router } from "express";

import { protect, admin } from "../../middleware/authMiddleware";

import ProductController from "../../controllers/product/productController";
// import InMemoryRepoProduct from "../../repositories/product/InMemoryRepoProduct";
import ProductMongoDBRepo from "../../../repositories/product/ProductMongoDBRepo";

const router = Router();
const productRepository = new ProductMongoDBRepo();
// to use another repository:
// just create a new class, must implements RepoProducts
// than pass as repository to this controller
const controller = new ProductController(productRepository);

router
  .route("/")
  .get(controller.getProducts)
  .post(protect, admin, controller.createProduct);

router
  .route("/:id")
  .get(controller.getProduct)
  .delete(protect, admin, controller.deleteProduct)
  .put(protect, admin, controller.updateProduct);

export default router;
