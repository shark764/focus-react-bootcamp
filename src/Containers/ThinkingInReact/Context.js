import React, { useState, createContext } from 'react';
import { PRODUCTS } from './data';

export const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);

  return <ProductContext.Provider value={[products, setProducts]}>{children}</ProductContext.Provider>;
}

export default ProductProvider;
