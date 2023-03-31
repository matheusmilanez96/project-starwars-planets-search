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
    setColumnInput,
    setOperatorInput,
    setValueInput,
    setCurrentFilters,
  } = useContext(AppContext);

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
    </fieldset>
  );
}
