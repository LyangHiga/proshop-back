import IRepoProductStrategy from "../interfaces/IRepoProductStrategy";
import Product from "../../entities/Product";
import ProductModel from "../db/mongo/models/productModel";

class ProductMongoDBRepo implements IRepoProductStrategy {
  getProducts = async (): Promise<Product[] | undefined> => {
    try {
      const products = (await ProductModel.find({})) as Product[];
      return products;
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
      return undefined;
    }
  };

  getProduct = async (id: string): Promise<Product | undefined> => {
    try {
      const product = (await ProductModel.findById(id)) as Product;
      return product;
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };

  deleteProduct = async (id: string) => {
    try {
      const product = await ProductModel.findByIdAndDelete(id);
      if (product) {
        return true;
      } else {
        console.error(`Error: Product not found`);
        return false;
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };

  // Jst testing
  createProduct = async (user_id: string) => {
    try {
      const product: Product = {
        name: "Test name",
        user: user_id,
        image: "/images/airpods.jpg",
        description: "Test Desc",
        brand: "Test brand",
        category: "test category",
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
      };
      const createdProduct = ProductModel.create(product);
      if (createdProduct) {
        return createdProduct;
      }
      console.log("Product Created but not found!");
      return undefined;
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };

  updateProduct = async (
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    brand: string,
    category: string,
    countInStock: number
  ): Promise<Product | undefined> => {
    try {
      const product = await ProductModel.findById(id);
      if (product) {
        product.name = name ? name : product.name;
        product.price = price ? price : product.price;
        product.description = description ? description : product.description;
        product.image = image ? image : product.image;
        product.brand = brand ? brand : product.brand;
        product.category = category ? category : product.category;
        product.countInStock = countInStock
          ? countInStock
          : product.countInStock;

        const updatedProduct = await product.save();
        if (updatedProduct) {
          return updatedProduct;
        } else {
          console.log("Product not updated!");
          return undefined;
        }
      } else {
        console.error(`Product not found!`);
        return undefined;
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      return undefined;
    }
  };
}

export default ProductMongoDBRepo;
