import Product from "../../entities/Product";

interface IRepoProductStrategy {
  getProducts(): Product[] | Promise<Product[] | undefined>;
  getProduct(id: string): Promise<Product | undefined> | undefined;
  deleteProduct(id: string): Promise<boolean | undefined>;
  // Just testing for while
  createProduct(user_id: string): Promise<Product | undefined>;
  updateProduct(
    id: string,
    name?: string,
    price?: number,
    description?: string,
    image?: string,
    brand?: string,
    category?: string,
    countInStock?: number
  ): Promise<Product | undefined>;
}

export default IRepoProductStrategy;
