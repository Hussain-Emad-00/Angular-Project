export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number,
  stock: number;
  reviews: Review[],
  thumbnail: string;
  images: string[],
}

export interface Review {
  rating: number,
  comment: string,
  date: string,
  reviewerName: string,
  reviewerEmail: string,
}
