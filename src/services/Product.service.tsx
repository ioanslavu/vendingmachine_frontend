import axios from "axios";
import { IProductResponse } from "../components/IProduct";
import { API_URL, config } from "./config";

export const createProduct = (product: IProductResponse) =>
  axios.post(`${API_URL}/product`, { ...product }, config).then((response) => response.data);

export const getProduct = (id: number) =>
  axios.get(`${API_URL}/product/${id}`, config).then((response) => response.data);

export const getProducts = () =>
  axios.get(`${API_URL}/product`, config).then((response) => response.data);

export const getMyProducts = () =>
  axios.get(`${API_URL}/product/my`, config).then((response) => response.data);

export const updateProduct = (id: number, product: IProductResponse) =>
  axios.patch(`${API_URL}/product/${id}`, product, config).then((response) => response.data);

export const deleteProduct = (id: number) =>
  axios.delete(`${API_URL}/product/${id}`, config).then((response) => response.data);

export const buy = (productId: number, amount: number) =>
  axios.post(`${API_URL}/buy`, { productId, amount }, config).then((response) => response.data);
