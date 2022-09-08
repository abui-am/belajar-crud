import { Form as FormikForm, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetailUser,
  postUser,
  putUser,
  selectUserDetail,
  selectUserDetailStatus,
} from '../../redux/feature/usersSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name wajib di masukan'),
  lastName: Yup.string().required('First name wajib di masukan'),
  email: Yup.string().email('Email tidak valid'),
  avatar: Yup.string().url('Url tidak valid'),
  gender: Yup.string()
    .required('Gender wajib diisi')
    .equals(['male', 'female']),
});

const FormCreateUser = ({ editId }) => {
  const userDetail = useSelector(selectUserDetail);
  const userDetailStatus = useSelector(selectUserDetailStatus);
  const initialValues = editId
    ? {
        lastName: userDetail.last_name,
        firstName: userDetail.first_name,
        email: userDetail.email,
        avatar: userDetail.avatar,
        gender: '',
      }
    : {
        lastName: '',
        firstName: '',
        email: '',
        avatar: '',
        gender: '',
      };

  const dispatch = useDispatch();

  useEffect(() => {
    if (editId) {
      dispatch(getDetailUser(editId));
    }
  }, [editId]);

  if (userDetailStatus === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(value) => {
          try {
            const payload = {
              first_name: value.firstName,
              last_name: value.lastName,
              avatar: value.avatar,
              email: value.email,
              gender: value.gender,
            };
            if (editId) {
              dispatch(putUser({ editId, data: payload }));
            } else {
              dispatch(postUser(payload));
            }
          } catch (e) {
            console.error(e);
          }
        }}
      >
        {(formikProps) => {
          console.log(formikProps.values);
          return (
            <FormikForm>
              <Form.Group className='mb-3'>
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  type='text'
                  name='firstName'
                  placeholder='Masukkan first name'
                  value={formikProps.values.firstName}
                  onChange={formikProps.handleChange}
                />
                {formikProps.errors.firstName &&
                  formikProps.touched.firstName && (
                    <small style={{ color: 'red' }}>
                      {formikProps.errors.firstName}
                    </small>
                  )}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Masukkan last name'
                  name='lastName'
                  value={formikProps.values.lastName}
                  onChange={formikProps.handleChange}
                />
                {formikProps.errors.lastName &&
                  formikProps.touched.lastName && (
                    <small style={{ color: 'red' }}>
                      {formikProps.errors.lastName}
                    </small>
                  )}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Masukkan email'
                  name='email'
                  value={formikProps.values.email}
                  onChange={formikProps.handleChange}
                />
                {formikProps.errors.email && formikProps.touched.email && (
                  <small style={{ color: 'red' }}>
                    {formikProps.errors.email}
                  </small>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  onChange={formikProps.handleChange}
                  name='gender'
                >
                  <option value=''>Pilih jenis kelamin</option>

                  <option value='male'>Pria</option>
                  <option value='female'>Wanita</option>
                </Form.Select>
                {formikProps.errors.gender && formikProps.touched.gender && (
                  <small style={{ color: 'red' }}>
                    {formikProps.errors.gender}
                  </small>
                )}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Avatar url</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Masukkan avatar url'
                  name='avatar'
                  value={formikProps.values.avatar}
                  onChange={formikProps.handleChange}
                />
                {formikProps.errors.avatar && formikProps.touched.avatar && (
                  <small style={{ color: 'red' }}>
                    {formikProps.errors.avatar}
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

export default FormCreateUser;
