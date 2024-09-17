import { Product } from '../../models/product';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productReducer = (state = initialState, action: any): ProductState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'EDIT_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    case 'DELETE_MULTIPLE_PRODUCTS':
      return {
        ...state,
        products: state.products.filter((product) => !action.payload.includes(product.id)),
      };
    default:
      return state;
  }
};

export default productReducer;
