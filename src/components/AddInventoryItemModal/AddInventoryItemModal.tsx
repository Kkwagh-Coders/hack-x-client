import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { categories } from '../../data/inventory.data';
import { createItem } from '../../services/inventory.services';
import { ItemCreateForm } from '../../types/inventory.types';
import styles from './AddInventoryItemModal.module.css';

interface SuccessResponse {
  message: string;
}

interface ErrorResponse<T> {
  response: { data: T };
}

type AddInventoryItemModalProps = {
  closeModalCallback: () => void;
};

function AddInventoryItemModal({
  closeModalCallback,
}: AddInventoryItemModalProps) {
  const queryClient = useQueryClient();

  // prettier-ignore
  const { mutate, isLoading } = useMutation<
  SuccessResponse,
  ErrorResponse<{ message: string }>,
  ItemCreateForm
  >({
    mutationFn: (itemData: ItemCreateForm) => createItem(itemData),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['inventory']);

      toast.success(data.message || 'Item Added to Inventory');
      closeModalCallback();
    },
  });

  const initialValues: ItemCreateForm = {
    name: '',
    description: '',
    quantity: 0,
    location: '',
    category: '',
    expiry: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, 'Name must be 20 characters of less')
        .required('Name is required'),
      description: Yup.string().required('Description is required'),
      quantity: Yup.number().required('Quantity is required'),
      location: Yup.string().required('Location is required'),
      category: Yup.string().required('Category is required'),
      expiry: Yup.string().required('Expiry is required'),
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className={styles.UserRegister}>
      <div className={styles.container}>
        <header className={styles.title}>Add Item</header>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div
            className={`${styles.inputField} ${
              formik.touched.name && formik.errors.name
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formik.values.name ? formik.values.name : ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.description && formik.errors.description
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="description">
              Description
              <textarea
                name="description"
                placeholder="Description"
                value={
                  formik.values.description ? formik.values.description : ''
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.quantity && formik.errors.quantity
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="quantity">
              Quantity
              <input
                type="number"
                name="quantity"
                placeholder="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.location && formik.errors.location
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="location">
              Location
              <input
                type="text"
                name="location"
                placeholder="Item Location"
                value={formik.values.location ? formik.values.location : ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.category && formik.errors.category
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="category">
              {formik.touched.category && formik.errors.category
                ? formik.errors.category
                : 'Category'}

              <select
                name="category"
                className={styles.inputField}
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Item Category</option>
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.expiry && formik.errors.expiry
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="expiry">
              Expiry Date
              <input
                type="date"
                name="expiry"
                placeholder="Item Location"
                value={formik.values.expiry ? formik.values.expiry : ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          {/* TODO: Category and expiry Date */}

          <div className={styles.buttons}>
            <input
              type="submit"
              value="Register"
              className={styles.registerButton}
              disabled={isLoading}
            />
            <input
              type="button"
              value="Cancel"
              className={styles.closeButton}
              disabled={isLoading}
              onClick={closeModalCallback}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInventoryItemModal;
