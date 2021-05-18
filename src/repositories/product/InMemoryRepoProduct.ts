import IRepoProductStrategy from "../interfaces/IRepoProductStrategy";
import Product from "../../entities/Product";
import products from "../db/inMemory/products";

class InMemoryRepoProduct implements IRepoProductStrategy {
  getProducts = (): Product[] => {
    return products;
  };

  getProduct = (id: string) => {
    // const product: Product | undefined = products.find((p) => p._id === id);
    return undefined;
  };
}

export default InMemoryRepoProduct;
