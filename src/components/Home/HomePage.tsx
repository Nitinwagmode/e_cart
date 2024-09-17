import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/stores/productStore';
import { Product } from '../../models/product';
import { deleteProduct, deleteMultipleProducts } from '../../redux/actions/productAction';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const products = useSelector((state: RootState) => state.productState.products);
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm('Are you sure you want to delete selected products?')) {
      dispatch(deleteMultipleProducts(selectedProducts));
      setSelectedProducts([]);
    }
  };

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-6xl font-bold mb-4 bg-gray-300  text-center">Product List</h1>
      <div className="flex items-center mb-4 space-x-4">
        <Link
          to="/add-product"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add New Product
        </Link>
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          onClick={handleBulkDelete}
          disabled={selectedProducts.length === 0}
          className={`px-4 py-2 rounded-md ${selectedProducts.length === 0 ? 'bg-gray-300 text-gray-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
        >
          Delete Selected
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                onChange={(e) => {
                  setSelectedProducts(
                    e.target.checked ? products.map(p => p.id) : []
                  );
                }}
                checked={selectedProducts.length === products.length}
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sell Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount (%)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discounted Sell Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredProducts.map((product: Product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProducts([...selectedProducts, product.id]);
                    } else {
                      setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
                    }
                  }}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sellPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.discount}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.discountedSellPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.finalPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  to={`/edit-product/${product.id}`}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50">
          <tr>
            <td colSpan={5} className="px-6 py-3 text-sm font-medium text-gray-500">Totals:</td>
            <td className="px-6 py-3 text-sm font-medium text-gray-900">
              {filteredProducts.reduce((sum, product) => sum + product.discountedSellPrice, 0)}
            </td>
            <td className="px-6 py-3 text-sm font-medium text-gray-900">
              {filteredProducts.reduce((sum, product) => sum + product.finalPrice, 0)}
            </td>
            <td className="px-6 py-3"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default HomePage;
