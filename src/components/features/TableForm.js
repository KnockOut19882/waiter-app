import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Table() {
  const { id } = useParams(); // Pobranie parametru id z URL
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Symulacja pobierania danych stolika na podstawie id
    const fetchTableData = async () => {
      try {
        setLoading(true);
        // Tu możesz wywołać API z parametrem id
        // const response = await fetch(`/api/tables/${id}`);
        // const data = await response.json();
        
        // Symulacja danych
        const mockData = {
          id: id,
          number: `Table ${id}`,
          status: 'occupied',
          orders: [
            { id: 1, item: 'Pizza Margherita', price: 25.99 },
            { id: 2, item: 'Coca Cola', price: 5.99 }
          ]
        };
        
        setTimeout(() => {
          setTableData(mockData);
          setLoading(false);
        }, 500);
        
      } catch (error) {
        console.error('Błąd podczas pobierania danych stolika:', error);
        setLoading(false);
      }
    };

    fetchTableData();
  }, [id]); // Ponowne wywołanie gdy id się zmieni

  const handleGoBack = () => {
    navigate('/'); // Powrót do strony głównej
  };

  const handleOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`); // Przejście do szczegółów zamówienia
  };

  if (loading) {
    return <div>Ładowanie danych stolika...</div>;
  }

  if (!tableData) {
    return <div>Nie znaleziono stolika o ID: {id}</div>;
  }

  return (
    <div className="table-details">
      <h2>{tableData.number}</h2>
      <p>ID Stolika: {id}</p>
      <p>Status: {tableData.status}</p>
      
      <h3>Zamówienia:</h3>
      <ul>
        {tableData.orders.map(order => (
          <li key={order.id}>
            {order.item} - {order.price} zł
            <button onClick={() => handleOrderDetails(order.id)}>
              Szczegóły
            </button>
          </li>
        ))}
      </ul>
      
      <button onClick={handleGoBack}>
        Powrót do listy stolików
      </button>
    </div>
  );
}

export default Table;