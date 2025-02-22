import { BaseQueryApi } from "@reduxjs/toolkit/query";

//Error Response Type
export type TError = {
  data: {
    message: string;
    stack?: string;
    success: boolean;
  };
  status: number;
};

//Meta Data Type 
export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

// General API Response Type
export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

// Bike Type
export type TBike = {
  _id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  stock: number;
  availability: boolean;
  engineCapacity: number;
  color: string[];
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

// Redux API Response for Bikes
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

//Query Parameters Type (for filtering bikes)
export type TQueryParam = {
  name: string;
  value: string | number | boolean;
};
