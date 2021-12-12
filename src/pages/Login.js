import React, { useState } from 'react';
import PageLayout from 'layouts';
import Logo from 'assets/img/logo.png';
import { useFormik } from 'formik';
import { InputField } from 'components';
import { notify } from 'utility';
import { LoginSchema } from 'utility/validations';
import axios from 'services/Axios';
import { LOGIN_COMPLETED } from 'utility/constants';
import { useDispatchCurrentUser } from 'contexts';

const Login = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = useDispatchCurrentUser();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoggingIn(true);

      const userData = {
        identifier: values.email,
        password: values.password
      };

      try {
        await axios.post('/login', userData);
        const { data } = await axios.get('/profiles/me');

        notify({
          type: 'success',
          message: 'Logged in successfully'
        });

        setTimeout(() => {
          dispatch({ type: LOGIN_COMPLETED, user: data });
        }, 1200);
      } catch (err) {
        notify({
          type: 'error',
          message: 'wrong email address and password combination!'
        });
      } finally {
        setLoggingIn(false);
      }
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <PageLayout className="login" hasHeader={false}>
      <section className="section">
        <div className="container">
          <div className="login__logo">
            <img src={Logo} alt="logo" className="img-fluid" />
          </div>

          <h3>Welcome</h3>
          <p>Please enter your login details below</p>

          <form className="form" onSubmit={handleLogin}>
            <InputField
              id="username"
              placeholder="e.g. johndoe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              error={formik.errors.username}
              touched={formik.touched.username}
            />

            <InputField
              id="password"
              type="password"
              placeholder="*******"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.errors.password}
              touched={formik.touched.password}
            />

            <button className="button button--primary" disabled={loggingIn}>
              {loggingIn ? 'Loading...' : 'Login'}
            </button>
          </form>

          <p className="mt-5 font-medium">
            Don’t have an account? <span className="color-green">Sign up?</span>
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Login;
