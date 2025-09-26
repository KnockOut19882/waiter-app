import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTableById, loadTablesRequest, updateTableRequest } from '../../Redux/tabelsRedux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

function Table() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get table data from Redux store
  const tableFromStore = useSelector(state => getTableById(state, id));
  const allTables = useSelector(state => state.tables);
  
  // Local state for form editing (not saved until Update button is clicked)
  const [tableData, setTableData] = useState({
    id: id,
    name: `Table ${id}`,
    status: 'Free',
    people: 0,
    maxPeople: 4,
    bill: 0
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load table data from store/API on component mount
  useEffect(() => {
    if (!tableFromStore) {
      setIsLoading(true);
      dispatch(loadTablesRequest()).finally(() => setIsLoading(false));
    } else {
      setTableData(tableFromStore);
    }
  }, [dispatch, tableFromStore]);

  // Update local state when store data changes
  useEffect(() => {
    if (tableFromStore) {
      setTableData(tableFromStore);
    }
  }, [tableFromStore]);

  // Check if table exists after tables are loaded
  useEffect(() => {
    // If tables are loaded and current table doesn't exist, redirect to home
    if (allTables.length > 0 && !tableFromStore) {
      console.log(`Table with ID "${id}" not found. Redirecting to home.`);
      navigate('/');
    }
  }, [allTables, tableFromStore, id, navigate]);

  const statusOptions = ['Free', 'Reserved', 'Busy', 'Cleaning'];

  const handleStatusChange = (newStatus) => {
    setTableData(prev => ({
      ...prev,
      status: newStatus,
      // Reset bill to 0 when status changes from Busy to something else
      bill: newStatus === 'Busy' ? prev.bill : 0,
      // Reset people to 0 when status is Cleaning or Free (no one sits at empty/cleaning table)
      people: (newStatus === 'Cleaning' || newStatus === 'Free') ? 0 : prev.people
    }));
  };

  const handleBillChange = (newBill) => {
    // Validate bill amount (only positive numbers)
    const billValue = Math.max(0, parseFloat(newBill) || 0);
    setTableData(prev => ({
      ...prev,
      bill: billValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Save to Redux store and API server
      const success = await dispatch(updateTableRequest(tableData));
      
      if (success) {
        console.log('Table updated successfully:', tableData);
        navigate('/');
      } else {
        console.error('Failed to update table');
        alert('Failed to update table. Please try again.');
      }
    } catch (error) {
      console.error('Error updating table:', error);
      alert('Error updating table. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading table data...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="mb-4">{tableData.name}</h2>
              
              <Form onSubmit={handleSubmit}>
                {/* Status Selection */}
                <Row className="mb-3 align-items-center">
                  <Col xs={4}>
                    <Form.Label className="fw-bold mb-0">Status:</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <Form.Select 
                      value={tableData.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                {/* People Counter */}
                <Row className="mb-3 align-items-center">
                  <Col xs={4}>
                    <Form.Label className="fw-bold mb-0">People:</Form.Label>
                  </Col>
                  <Col xs={8}>
                    <div className="d-flex align-items-center gap-2">
                      <Form.Control 
                        type="number" 
                        value={tableData.people}
                        min="0"
                        max={tableData.maxPeople}
                        disabled={tableData.status === 'Cleaning'}
                        onChange={(e) => setTableData(prev => ({
                          ...prev,
                          people: Math.min(parseInt(e.target.value) || 0, prev.maxPeople)
                        }))}
                        style={{ width: '70px' }}
                      />
                      <span className="fw-bold">/</span>
                      <Form.Control 
                        type="number" 
                        value={tableData.maxPeople}
                        min="1"
                        max="10"
                        onChange={(e) => setTableData(prev => ({
                          ...prev,
                          maxPeople: Math.min(Math.max(parseInt(e.target.value) || 1, 1), 10)
                        }))}
                        style={{ width: '70px' }}
                      />
                    </div>
                  </Col>
                </Row>

                {/* Bill Section - Only shown when status is "Busy" */}
                {tableData.status === 'Busy' && (
                  <Row className="mb-3 align-items-center">
                    <Col xs={4}>
                      <Form.Label className="fw-bold mb-0">Bill:</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold">$</span>
                        <Form.Control
                          type="number"
                          value={tableData.bill}
                          min="0"
                          step="0.01"
                          placeholder="0"
                          onChange={(e) => handleBillChange(e.target.value)}
                          style={{ width: '100px' }}
                        />
                      </div>
                    </Col>
                  </Row>
                )}

                {/* Action Buttons */}
                <div className="d-grid gap-2 mt-4">
                  <Button 
                    variant="dark" 
                    type="submit"
                    disabled={isSaving}
                    size="lg"
                  >
                    {isSaving ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Updating...
                      </>
                    ) : (
                      'Update'
                    )}
                  </Button>
                </div>
                
                {/* Back Button - smaller, separate */}
                <div className="text-center mt-3">
                  <Button 
                    variant="link" 
                    onClick={() => navigate('/')}
                    disabled={isSaving}
                    className="text-decoration-none"
                  >
                    ← Back to Home
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Table;