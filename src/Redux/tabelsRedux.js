//selectors
export const getAllTables = (state) => state.tables;
export const getTableById = (state, id) => state.tables.find(table => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const LOAD_TABLES = createActionName('LOAD_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

// action creators
export const loadTables = payload => ({ type: LOAD_TABLES, payload });
export const updateTable = payload => ({ type: UPDATE_TABLE, payload });

// thunks
export const loadTablesRequest = () => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:3131/tables');
      if (response.ok) {
        const data = await response.json();
        // Map API field names to component field names
        const mappedData = data.map(table => ({
          ...table,
          people: parseInt(table.peopleAmount) || 0,
          maxPeople: parseInt(table.maxPeopleAmount) || 0,
          bill: parseFloat(table.bill) || 0,
          name: `Table ${table.id}`
        }));
        dispatch(loadTables(mappedData));
      }
    } catch (error) {
      console.error('Error loading tables:', error);
    }
  };
};

export const updateTableRequest = (tableData) => {
  return async dispatch => {
    try {
      // Map component field names to API field names
      const apiData = {
        ...tableData,
        peopleAmount: tableData.people,
        maxPeopleAmount: tableData.maxPeople,
        // Remove component-only fields
        people: undefined,
        maxPeople: undefined,
        name: undefined
      };

      const response = await fetch(`http://localhost:3131/tables/${tableData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      if (response.ok) {
        const updatedApiTable = await response.json();
        // Map back to component format
        const updatedTable = {
          ...updatedApiTable,
          people: parseInt(updatedApiTable.peopleAmount) || 0,
          maxPeople: parseInt(updatedApiTable.maxPeopleAmount) || 0,
          bill: parseFloat(updatedApiTable.bill) || 0,
          name: `Table ${updatedApiTable.id}`
        };
        dispatch(updateTable(updatedTable));
        return true; // Success indicator
      }
    } catch (error) {
      console.error('Error updating table:', error);
      return false; // Error indicator
    }
  };
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_TABLES:
      return [...action.payload];
    case UPDATE_TABLE:
      return statePart.map(table => 
        table.id === action.payload.id ? action.payload : table
      );
    default:
      return statePart;
  };
};

export default tablesReducer;