import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { editItem } from '../../services/inventory.services';
import { Item, ItemEditForm } from '../../types/inventory.types';
import getFormattedDate from '../../utils/getFormattedDate';
import styles from './InventoryEditModal.module.css';

type InventoryEditModalProps = {
  item: Item;
  closeModalCallback: () => void;
};

interface SuccessResponse {
  message: string;
}

interface ErrorResponse<T> {
  response: { data: T };
}

const categories = ['Software', 'Hardware', 'Electronics', 'Furniture'];

function InventoryEditModal({
  item,
  closeModalCallback,
}: InventoryEditModalProps) {
  // prettier-ignore
  const { mutate, isLoading } = useMutation<
    SuccessResponse,
    ErrorResponse<{ message: string }>,
    ItemEditForm
    >({
      mutationFn: (itemData: ItemEditForm) => editItem(item._id, itemData),
      onError: (error) => {
        toast.error(error.response.data.message);
      },
      onSuccess: (data) => {
        toast.success(data.message || 'Item Added to Inventory');
        closeModalCallback();
      },
    });

  const initialValues: ItemEditForm = {
    ...item,
    expiry: getFormattedDate(item.expiry),
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, 'Name must be 20 characters of less')
        .required('Name is required'),
      description: Yup.string().required('Description is required'),
      working: Yup.number().required('Working is required'),
      notWorking: Yup.number().required('Not working is required'),
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
              formik.touched.working && formik.errors.working
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="working">
              Working
              <input
                type="number"
                name="working"
                placeholder="working"
                value={formik.values.working}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.notWorking && formik.errors.notWorking
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="notWorking">
              Not Working
              <input
                type="number"
                name="notWorking"
                placeholder="notWorking"
                value={formik.values.notWorking}
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
                : 'Branch'}
              <span className="required">*</span>

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
              value="Save"
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

export default InventoryEditModal;
