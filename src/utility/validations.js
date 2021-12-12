import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Username is required'),
  password: Yup.string().required('Password is required')
});
