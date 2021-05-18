// interface Review {
//   name: string;
//   rating: number;
//   comment: string;
// }

export default interface Product {
  user?: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  // reviews: Review[];
  rating: number;
  numReviews: number;
}
