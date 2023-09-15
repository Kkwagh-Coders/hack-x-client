import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { editItem } from '../../services/inventory.services';
import { Item, ItemEditForm } from '../../types/inventory.types';
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

function InventoryEditModal({
  item,
  closeModalCallback,
}: InventoryEditModalProps) {
  const queryClient = useQueryClient();

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
        queryClient.refetchQueries(['inventory']);
        queryClient.refetchQueries(['notifications']);
        queryClient.refetchQueries(['unread-notification-count']);

        toast.success(data.message || 'Item Added to Inventory');
        closeModalCallback();
      },
    });

  const initialValues: ItemEditForm = {
    notWorking: item.notWorking,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      notWorking: Yup.number()
        .required('Not working is required')
        .max(
          item.notWorking,
          `New Quantity Should be Less than ${item.notWorking}`,
        )
        .min(0, 'Quantity Cannot be Negative'),
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className={styles.UserRegister}>
      <div className={styles.container}>
        <header className={styles.title}>Update Item {item.name}</header>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div
            className={`${styles.inputField} ${
              formik.touched.notWorking && formik.errors.notWorking
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="notWorking">
              Quantity
              <input
                type="number"
                name="notWorking"
                placeholder="notWorking"
                value={formik.values.notWorking}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>

            {formik.errors.notWorking ? formik.errors.notWorking : null}
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
