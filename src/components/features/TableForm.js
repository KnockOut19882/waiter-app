import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Table() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Stan dla formularza
  const [status, setStatus] = useState('');
  const [people, setPeople] = useState('');
  const [maxPeople, setMaxPeople] = useState('');
  const [bill, setBill] = useState('');

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        
        // Symulacja danych
        const mockData = {
          id: id,
          number: `Table ${id}`,
          status: 'Busy',
          people: 2,
          maxPeople: 4,
          bill: 20
        };
        
        setTimeout(() => {
          setTableData(mockData);
          setStatus(mockData.status);
          setPeople(mockData.people.toString());
          setMaxPeople(mockData.maxPeople.toString());
          setBill(mockData.bill.toString());
          setLoading(false);
        }, 500);
        
      } catch (error) {
        console.error('Błąd podczas pobierania danych stolika:', error);
        setLoading(false);
      }
    };

    fetchTableData();
  }, [id]);

  const handleUpdate = () => {
    console.log('Updating table:', { status, people, maxPeople, bill });
    // Tu będzie logika aktualizacji
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <Card className="shadow-sm" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <Card.Body className="text-center">
            <Card.Title className="fs-4 mb-4">Loading Table Data...</Card.Title>
            <ProgressBar animated now={75} variant="primary" className="mb-3" />
            <small className="text-muted">Please wait while we fetch table information</small>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (!tableData) {
    return (
      <Container className="mt-4">
        <div className="text-center">Nie znaleziono stolika o ID: {id}</div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Card.Body>
          <Card.Title className="fs-1 fw-bold mb-4">{tableData.number}</Card.Title>
          
          <Form>
            <Row className="mb-3">
              <Col xs={4}>
                <Form.Label className="fw-bold">Status:</Form.Label>
              </Col>
              <Col xs={8}>
                <Form.Select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Cleaning">Cleaning</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={4}>
                <Form.Label className="fw-bold">People:</Form.Label>
              </Col>
              <Col xs={3}>
                <Form.Control 
                  type="number" 
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                />
              </Col>
              <Col xs={2} className="d-flex align-items-center justify-content-center">
                <span className="fw-bold">/</span>
              </Col>
              <Col xs={3}>
                <Form.Control 
                  type="number" 
                  value={maxPeople}
                  onChange={(e) => setMaxPeople(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={4}>
                <Form.Label className="fw-bold">Bill:</Form.Label>
              </Col>
              <Col xs={2} className="d-flex align-items-center">
                <span className="fw-bold text-success">$</span>
              </Col>
              <Col xs={6}>
                <Form.Control 
                  type="number" 
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                />
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button 
                variant="dark" 
                onClick={handleUpdate}
                className="flex-grow-1"
              >
                Update
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={handleGoBack}
              >
                Back
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Table;