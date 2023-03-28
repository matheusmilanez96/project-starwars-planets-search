import React from 'react';
import './App.css';
import useFormInput from './hooks/useFormInput';
import FilterContext from './context/FilterContext';

import Table from './components/Table';

function App() {
  const filterInput = useFormInput('');

  return (
    <FilterContext.Provider value={ { filterInput } }>
      <input
        data-testid="name-filter"
        value={ filterInput.value }
        onChange={ filterInput.onChange }
      />
      <Table />
    </FilterContext.Provider>
  );
}

export default App;
