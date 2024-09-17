import { Product } from '../../models/product';

export const addProduct = (product: Product) => ({
  type: 'ADD_PRODUCT',
  payload: product,
});

export const editProduct = (product: Product) => ({
  type: 'EDIT_PRODUCT',
  payload: product,
});

export const deleteProduct = (id: number) => ({
  type: 'DELETE_PRODUCT',
  payload: id,
});

export const deleteMultipleProducts = (ids: number[]) => ({
  type: 'DELETE_MULTIPLE_PRODUCTS',
  payload: ids,
});
