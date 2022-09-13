import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardUser from '../components/CardUser';
import { Col, Row } from 'react-bootstrap';
import CustomModal from '../components/Modal';
import FormCreateUser from '../components/form/FormCreateUser';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  deleteUsers,
  getUsers,
  selectUsers,
  selectUsersStatus,
} from '../redux/feature/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton/dist';

function User() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editId, setEditId] = useState();
  const users = useSelector(selectUsers);
  const usersStatus = useSelector(selectUsersStatus);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      dispatch(deleteUsers(id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpen = () => {
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setEditId();
    setIsOpenModal(false);
  };

  const handleSuccess = () => {
    handleClose();
    // getData();
  };

  const handleEdit = (id) => {
    handleOpen();
    setEditId(id);
  };

  useEffect(() => {
    dispatch(getUsers());
    // getData();
  }, []);

  return (
    <div className='User'>
      <CustomModal
        modalIsOpen={isOpenModal}
        onRequestClose={handleClose}
        contentLabel='Buat data'
      >
        <h6>Create User</h6>
        <FormCreateUser editId={editId} onSuccess={handleSuccess} />
      </CustomModal>
      <Button onClick={handleOpen}>Create</Button>
      <Row>
        {usersStatus === 'loading'
          ? [1, 2, 3, 4, 5, 6].map((value) => (
              <Col sm={4} key={value}>
                <div className='ms-4 me-4 mb-4'>
                  <Skeleton height={280} className='mb-4' />

                  <Skeleton count={3} />
                </div>
              </Col>
            ))
          : users.map((value) => {
              return (
                <Col sm={4} key={value.id}>
                  <div className='ms-4 me-4 mb-4'>
                    <CardUser
                      id={value.id}
                      avatar={value.avatar}
                      email={value.email}
                      firstName={value.first_name}
                      lastName={value.last_name}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  </div>
                </Col>
              );
            })}
      </Row>
    </div>
  );
}

export default User;
