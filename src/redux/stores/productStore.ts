import { Product } from './../../models/product';
import { createStore, combineReducers } from 'redux';
import productReducer from '../reducers/productReducers';

const rootReducer = combineReducers({
  productState: productReducer,
});

export const ProductStore = createStore(
  rootReducer,
  // Enable Redux DevTools Extension if available
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootState = ReturnType<typeof rootReducer>;
