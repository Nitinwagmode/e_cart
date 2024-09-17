import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  expiryDate: Yup.date().required('Expiry Date is required'),
  costPrice: Yup.number().positive('Must be positive').required('Cost Price is required'),
  sellPrice: Yup.number().positive('Must be positive').required('Sell Price is required'),
  discount: Yup.number()
    .min(0, 'Cannot be less than 0')
    .max(100, 'Cannot be more than 100')
    .required('Discount is required'),
});
