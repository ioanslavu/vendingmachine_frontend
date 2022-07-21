export interface IProductRequest {
  productId: number;
  productName: string;
  cost: number;
  amountAvailable: number;
  sellerId: number;
}

export interface IProductResponse {
  productName: string;
  cost: number;
  amountAvailable: number;
}

export interface IProduct {
  id: number;
  productName: string;
  cost: number;
  amountAvailable: number;
}
