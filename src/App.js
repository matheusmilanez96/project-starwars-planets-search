import React from 'react';
import './App.css';
import useFormInput from './hooks/useFormInput';
import useToggle from './hooks/useToggle';
import FilterContext from './context/FilterContext';

import Table from './components/Table';

function App() {
  const filterInput = useFormInput('');
  const columnInput = useFormInput('population');
  const operatorInput = useFormInput('maior que');
  const valueInput = useFormInput(0);
  const [buttonClick, setButtonClick] = useToggle();

  return (
    <FilterContext.Provider
      value={
        { filterInput, columnInput, operatorInput, valueInput, buttonClick }
      }
    >
      <fieldset>
        <input
          data-testid="name-filter"
          type="text"
          value={ filterInput.value }
          onChange={ filterInput.onChange }
        />
        <form>
          <p>Coluna</p>
          <select
            name="column"
            id="column"
            data-testid="column-filter"
            onChange={ columnInput.onChange }
            value={ columnInput.value }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
          <p>Operador</p>
          <select
            name="comparison"
            id="comparison"
            data-testid="comparison-filter"
            onChange={ operatorInput.onChange }
            value={ operatorInput.value }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <br />
          <br />
          <input
            data-testid="value-filter"
            type="number"
            value={ valueInput.value }
            onChange={ valueInput.onChange }
          />
          <br />
          <br />
          <button
            data-testid="button-filter"
            type="button"
            onClick={ setButtonClick }
          >
            Filtrar
          </button>
        </form>
      </fieldset>
      <Table />
    </FilterContext.Provider>
  );
}

export default App;
