import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  price: number;
  category: string;
  description: string;
  image: string;
  title?: string;
}
export const productApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getAllProduct: builder.query<Product[], void>({
      query: () => `products`,
    }),
    getSingleProduct: builder.query({
      query: (product) => `products/category/${product}`,
    }),
    getWomenProduct: builder.query({
      query: (product) => `products/category/${product}`,
    }),
    getElectronicProduct: builder.query({
      query: (product) => `products/category/${product}`,
    }),
    getJeweleryProduct: builder.query({
      query: (product) => `products/category/${product}`,
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useGetWomenProductQuery,
  useGetElectronicProductQuery,
  useGetJeweleryProductQuery,
} = productApi;
