import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { createUser } from '../../services/user.services';
import { UserCreateForm, UserRole } from '../../types/user.types';
import styles from './AddUserModal.module.css';

interface SuccessResponse {
  message: string;
}

interface ErrorResponse<T> {
  response: { data: T };
}

type AddUserModalProps = {
  closeModalCallback: () => void;
};

const roles: UserRole[] = ['admin', 'teacher', 'staff'];

function AddUserModal({ closeModalCallback }: AddUserModalProps) {
  // prettier-ignore
  const { mutate, isLoading } = useMutation<
  SuccessResponse,
  ErrorResponse<{ message: string }>,
  UserCreateForm
  >({
    mutationFn: (user: UserCreateForm) => createUser(user),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      closeModalCallback();
    },
  });

  const initialValues: UserCreateForm = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    designation: '',
    department: '',
    role: roles[2],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required('FirstName is required'),
      middleName: Yup.string().required('MiddleName is required'),
      lastName: Yup.string().required('LastName is required'),
      email: Yup.string().required('Email is required'),
      designation: Yup.string().required('Designation is required'),
      department: Yup.string().required('Department is required'),
      role: Yup.string().required('Role is required'),
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className={styles.UserRegister}>
      <div className={styles.container}>
        <header className={styles.title}>Create User</header>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div
            className={`${styles.inputField} ${
              formik.touched.firstName && formik.errors.firstName
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="firstName">
              First Name
              <input
                name="firstName"
                placeholder="firstName"
                value={formik.values.firstName ? formik.values.firstName : ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.middleName && formik.errors.middleName
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="middleName">
              Middle Name
              <input
                name="middleName"
                placeholder="middleName"
                value={formik.values.middleName ? formik.values.middleName : ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.lastName && formik.errors.lastName
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="lastName">
              Last Name
              <input
                name="lastName"
                placeholder="lastName"
                value={formik.values.lastName ? formik.values.lastName : ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.email && formik.errors.email
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="email">
              Email
              <input
                name="email"
                placeholder="email"
                value={formik.values.email ? formik.values.email : ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.designation && formik.errors.designation
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="designation">
              Designation
              <input
                name="designation"
                placeholder="designation"
                value={
                  formik.values.designation ? formik.values.designation : ''
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.department && formik.errors.department
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="department">
              Department
              <input
                name="department"
                placeholder="department"
                value={formik.values.department ? formik.values.department : ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div
            className={`${styles.inputField} ${
              formik.touched.role && formik.errors.role
                ? styles.inputFieldError
                : ''
            }`}
          >
            <label htmlFor="role">
              {formik.touched.role && formik.errors.role
                ? formik.errors.role
                : 'Branch'}
              <span className="required">*</span>

              <select
                name="role"
                className={styles.inputField}
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Item role</option>
                {roles.map((role) => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* TODO: Category and expiry Date */}

          <div className={styles.buttons}>
            <input
              type="submit"
              value="Create"
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

export default AddUserModal;
