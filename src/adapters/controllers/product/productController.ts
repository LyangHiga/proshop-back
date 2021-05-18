import { RequestHandler } from "express";
import IRepoProductStrategy from "../../../repositories/interfaces/IRepoProductStrategy";

class ProductController {
  public readonly repository: IRepoProductStrategy;
  constructor(productRepo: IRepoProductStrategy) {
    this.repository = productRepo;
  }

  getProducts: RequestHandler = async (req, res, next) => {
    const products = await this.repository.getProducts();
    res.json(products);
  };

  getProduct: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const product = await this.repository.getProduct(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not Found" });
    }
  };

  deleteProduct: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleted = await this.repository.deleteProduct(id);
      if (deleted) {
        res.json();
      } else {
        res.status(401).json({ message: "Product was not deleted" });
      }
    } catch (err) {
      console.log(`Error : ${err}`);
      res.status(401).json({ message: "Product was not deleted" });
    }
  };

  createProduct: RequestHandler = async (req, res, next) => {
    try {
      const product = await this.repository.createProduct(req.user._id);
      if (product) {
        res.json(product);
      } else {
        res.status(401).json({ message: "Product was not created" });
      }
    } catch (err) {
      console.log(`Error : ${err}`);
      res.status(401).json({ message: "Product was not created" });
    }
  };

  updateProduct: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, description, image, brand, category, countInStock } =
      req.body;
    try {
      const updatedProduct = await this.repository.updateProduct(
        id,
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
      );
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(401).json("Product was not update");
      }
    } catch (err) {
      console.log(`Error : ${err}`);
      res.status(401).json({ message: "Product was not updated" });
    }
  };
}

export default ProductController;
