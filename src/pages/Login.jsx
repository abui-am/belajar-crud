import axios from 'axios';
import { Formik, Form as FormikForm } from 'formik';
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email tidak valid'),
  password: Yup.string().required('Password tidak valid'),
});

const Login = () => {
  const navigate = useNavigate();
  return (
    <Container className='mx-auto mt-5' style={{ maxWidth: 450 }}>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (value) => {
          try {
            const res = await axios.post(
              'https://bootcamp-rent-car.herokuapp.com/admin/auth/login',
              value
            );

            localStorage.setItem('auth', JSON.stringify(res.data));

            navigate('/');
          } catch (e) {
            console.error(e);
          }
        }}
      >
        {(formikProps) => {
          return (
            <FormikForm>
              <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Masukkan email'
                  value={formikProps.values.email}
                  onChange={formikProps.handleChange}
                />
                {formikProps.errors.email && formikProps.touched.email && (
                  <small style={{ color: 'red' }}>
                    {formikProps.errors.email}
                  </small>
                )}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Masukkan password'
                  name='password'
                  value={formikProps.values.password}
                  onChange={formikProps.handleChange}
                />
                {formikProps.errors.password &&
                  formikProps.touched.password && (
                    <small style={{ color: 'red' }}>
                      {formikProps.errors.password}
                    </small>
                  )}
              </Form.Group>

              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </FormikForm>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Login;
