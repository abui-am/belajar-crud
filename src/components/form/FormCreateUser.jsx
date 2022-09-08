import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postUserApi, putUserApi } from '../../api/user';
import {
  getDetailUser,
  postUser,
  putUser,
  selectUserDetail,
  selectUserDetailStatus,
} from '../../redux/feature/usersSlice';

const FormCreateUser = ({ editId }) => {
  const userDetail = useSelector(selectUserDetail);
  const userDetailStatus = useSelector(selectUserDetailStatus);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setError] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName || lastName) {
      try {
        const payload = {
          first_name: firstName,
          last_name: lastName,
          avatar,
          email,
        };
        if (editId) {
          dispatch(putUser({ editId, data: payload }));
        } else {
          dispatch(postUser(payload));
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      if (!lastName) {
        setError((error) => ({
          ...error,
          lastName: 'Last name wajib di masukan',
        }));
      }

      if (!firstName) {
        setError((error) => ({
          ...error,
          firstName: 'First name wajib di masukan',
        }));
      }
    }
  };

  useEffect(() => {
    if (editId) {
      dispatch(getDetailUser(editId));
    }
  }, [editId]);

  useEffect(() => {
    if (userDetail) {
      setFirstName(userDetail.first_name);
      setLastName(userDetail.last_name);
      setAvatar(userDetail.avatar);
      setEmail(userDetail.email);
    }
  }, [userDetail]);

  if (userDetailStatus === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>First Name *</Form.Label>
          <Form.Control
            type='text'
            value={firstName}
            placeholder='Masukkan first name'
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <small style={{ color: 'red' }}>{errors.firstName}</small>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Last Name *</Form.Label>
          <Form.Control
            type='text'
            value={lastName}
            placeholder='Masukkan last name'
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <small style={{ color: 'red' }}>{errors.lastName}</small>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Masukkan email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Avatar url</Form.Label>
          <Form.Control
            type='text'
            value={avatar}
            placeholder='Masukkan avatar url'
            onChange={(e) => {
              setAvatar(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FormCreateUser;
