import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardUser from './components/CardUser';
import { Col, Row } from 'react-bootstrap';
import CustomModal from './components/Modal';
import FormCreateUser from './components/form/FormCreateUser';
import { deleteUser, getUsers } from './api/user';

function App() {
  const [data, setData] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editId, setEditId] = useState();

  const getData = async () => {
    //
    const res = await getUsers();
    setData(res.data);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.data.deleted) {
        getData();
      }
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
    getData();
  };

  const handleEdit = (id) => {
    handleOpen();
    setEditId(id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='App'>
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
        {data.map((value) => {
          return (
            <Col sm={4} key={value.id}>
              <div className='ms-4 me-4'>
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

export default App;
