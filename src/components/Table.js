import { useContext } from 'react';
import FilterContext from '../context/FilterContext';
import useFetch from '../hooks/useFetch';

export default function Table() {
  const input = useContext(FilterContext);
  const { filterInput, columnInput, operatorInput, valueInput, buttonClick } = input;
  const filterValue = filterInput.value;
  const columnValue = columnInput.value;
  const operatorValue = operatorInput.value;
  const valueValue = valueInput.value;
  let { data } = useFetch('https://swapi.dev/api/planets');
  delete data.residents;

  if (filterValue) {
    data = data.filter((planet) => planet.name.includes(filterValue));
  }

  console.log(columnValue);
  console.log(operatorValue);
  console.log(valueValue);
  console.log(buttonClick);

  let data2;

  if (buttonClick === true) {
    if (operatorValue === 'maior que') {
      data2 = data.filter((planet) => Number(planet[columnValue]) > Number(valueValue));
    } else if (operatorValue === 'menor que') {
      data2 = data.filter((planet) => Number(planet[columnValue]) < Number(valueValue));
    } else if (operatorValue === 'igual a') {
      data2 = data.filter((planet) => Number(planet[columnValue]) === Number(valueValue));
    }
  } else {
    data2 = data;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Rotation Period</th>
            <th scope="col">Orbital Period</th>
            <th scope="col">Diameter</th>
            <th scope="col">Climate</th>
            <th scope="col">Gravity</th>
            <th scope="col">Terrain</th>
            <th scope="col">Surface Water</th>
            <th scope="col">Population</th>
            <th scope="col">Films</th>
            <th scope="col">Created</th>
            <th scope="col">Edited</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
        { data2.map((planet) => (
          <tbody key={ planet.name }>
            <tr>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
