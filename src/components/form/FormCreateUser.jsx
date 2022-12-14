import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { postUser, putUser } from '../../api/user';

const FormCreateUser = ({ onSuccess, editId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setError] = useState({});

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
          const res = await putUser(editId, payload);
          if (res.status === 200) {
            onSuccess();
          }
        } else {
          const res = await postUser(payload);
          if (res.status === 200) {
            onSuccess();
          }
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

  const getDetailUser = async (editId) => {
    const res = await axios.get(`http://localhost:3001/users/${editId}`);
    setFirstName(res.data.first_name);
    setLastName(res.data.last_name);
    setAvatar(res.data.avatar);
    setEmail(res.data.email);
  };

  useEffect(() => {
    if (editId) {
      getDetailUser(editId);
    }
  }, [editId]);

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
