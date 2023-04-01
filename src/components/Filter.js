import { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Filter() {
  const {
    filterInput,
    setFilterInput,
    columnInput,
    operatorInput,
    valueInput,
    currentFilters,
    columnFilters,
    setColumnInput,
    setOperatorInput,
    setValueInput,
    setCurrentFilters,
  } = useContext(AppContext);

  const allColumns = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const filteredColumns = allColumns.filter((column) => (
    !columnFilters.includes(column)
  ));

  if (!filteredColumns.includes(columnInput)) {
    setColumnInput(filteredColumns[0]);
  }

  return (
    <fieldset>
      <input
        data-testid="name-filter"
        type="text"
        value={ filterInput }
        onChange={ (e) => setFilterInput(e.target.value) }
      />
      <form>
        <p>Coluna</p>
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          onChange={ (e) => setColumnInput(e.target.value) }
          value={ columnInput }
        >
          { filteredColumns.map((column, index) => (
            <option
              value={ column }
              key={ index }
            >
              {column}
            </option>
          ))}
        </select>
        <p>Operador</p>
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          onChange={ (e) => setOperatorInput(e.target.value) }
          value={ operatorInput }
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
          value={ valueInput }
          onChange={ (e) => setValueInput(e.target.value) }
        />
        <br />
        <br />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => {
            setCurrentFilters([...currentFilters, {
              columnInput,
              operatorInput,
              valueInput,
            }]);
          } }
        >
          Filtrar
        </button>
      </form>
      <br />
      <div>
        { currentFilters.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <button
              type="button"
              onClick={ () => {
                const newData = currentFilters.filter((curr) => (
                  !curr.columnInput.includes(filter.columnInput)
                ));
                setCurrentFilters(newData);
              } }
            >
              { filter.columnInput }
              {' '}
              { filter.operatorInput }
              {' '}
              { filter.valueInput }
            </button>
          </div>
        )) }
      </div>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setCurrentFilters([]) }
      >
        Remover filtros
      </button>
    </fieldset>
  );
}
