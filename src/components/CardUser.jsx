import { Button, Card } from 'react-bootstrap';

const CardUser = ({
  id,
  avatar,
  firstName,
  lastName,
  email,
  onDelete,
  onEdit,
}) => {
  const handleOnClickDelete = () => {
    onDelete(id);
  };
  const handleOnEdit = () => {
    onEdit(id);
  };
  return (
    <Card className='mb-1' style={{ width: '18rem' }}>
      <Card.Img variant='top' src={avatar} />
      <Card.Body>
        <Card.Title>
          {firstName} {lastName}
        </Card.Title>
        <Card.Text>{email}</Card.Text>
      </Card.Body>
      <Button
        className='me-2 ms-2 mb-2'
        variant='danger'
        onClick={handleOnClickDelete}
      >
        Hapus
      </Button>
      <Button
        className='me-2  ms-2  mb-2'
        variant='warning'
        onClick={handleOnEdit}
      >
        Edit
      </Button>
    </Card>
  );
};
export default CardUser;
