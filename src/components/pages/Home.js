import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function Home() {
  const tables = [
    { id: '1', name: 'Table 1', status: 'available' },
    { id: '2', name: 'Table 2', status: 'occupied' },
    { id: '3', name: 'Table 3', status: 'reserved' },
    { id: '4', name: 'Table 4', status: 'cleaning' },
    { id: '5', name: 'Table 5', status: 'occupied' },
    { id: 'vip', name: 'Table VIP', status: 'available' }
  ];

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Tables:</h1>
      <ListGroup>
        {tables.map(table => (
          <ListGroup.Item key={table.id} className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="fs-3 me-3">
                {table.name}
              </span>
              <span className="fs-6 text-muted">
                {table.status}
              </span>
            </div>
            <Button as={Link} to={`/table/${table.id}`} variant="dark" size="sm">
              Show more
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Home;