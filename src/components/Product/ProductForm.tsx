import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from '../../utils/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct } from '../../redux/actions/productAction';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../models/product';
import { RootState } from '../../redux/stores/productStore';

const ProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const products = useSelector((state: RootState) => state.productState.products);
  const [initialValues, setInitialValues] = useState<Product>({
    id: 0,
    name: '',
    category: '',
    description: '',
    expiryDate: '',
    costPrice: 0,
    sellPrice: 0,
    discount: 0,
    discountedSellPrice: 0,
    finalPrice: 0,
  });

  useEffect(() => {
    if (id) {
      const productToEdit = products.find((p) => p.id === parseInt(id));
      if (productToEdit) setInitialValues(productToEdit);
    }
  }, [id, products]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const discountedSellPrice = values.sellPrice * (1 - values.discount / 100);
      const finalPrice = discountedSellPrice; // Modify if there are additional charges
      const productData = {
        ...values,
        discountedSellPrice,
        finalPrice,
      };

      if (id) {
        dispatch(editProduct(productData));
      } else {
        dispatch(addProduct({ ...productData, id: Date.now() }));
      }
      navigate('/');
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Product' : 'Add Product'}</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.errors.name && <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" label="Select category" />
            <option value="Electronics" label="Electronics" />
            <option value="Clothing" label="Clothing" />
            <option value="Food" label='Food'/>
            <option value="Grocery" label='Grocery'/>
            <option value="Gadgets" label='Gadgets'/>
            <option value="Accessories" label='Accessories'/>
            <option value="Footwears" label='Footwears'/>

            {/* Add more categories as needed */}
          </select>
          {formik.errors.category && <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.errors.description && <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formik.values.expiryDate}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.errors.expiryDate && <div className="text-red-500 text-sm mt-1">{formik.errors.expiryDate}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cost Price</label>
          <input
            type="number"
            name="costPrice"
            value={formik.values.costPrice}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.errors.costPrice && <div className="text-red-500 text-sm mt-1">{formik.errors.costPrice}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sell Price</label>
          <input
            type="number"
            name="sellPrice"
            value={formik.values.sellPrice}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.errors.sellPrice && <div className="text-red-500 text-sm mt-1">{formik.errors.sellPrice}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.errors.discount && <div className="text-red-500 text-sm mt-1">{formik.errors.discount}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Discounted Sell Price</label>
          <input
            type="number"
            name="discountedSellPrice"
            value={formik.values.sellPrice * (1 - formik.values.discount / 100)}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Final Price</label>
          <input
            type="number"
            name="finalPrice"
            value={formik.values.sellPrice * (1 - formik.values.discount / 100)}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 sm:text-sm"
          />
        </div>

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
