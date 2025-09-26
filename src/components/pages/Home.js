import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTables, loadTablesRequest } from '../../Redux/tabelsRedux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);

  useEffect(() => {
    dispatch(loadTablesRequest());
  }, [dispatch]);

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