import { useContext } from 'react';
import FilterContext from '../context/FilterContext';
import useFetch from '../hooks/useFetch';

export default function Table() {
  const input = useContext(FilterContext);
  const { filterInput } = input;
  const { value } = filterInput;
  const { data, loading } = useFetch('https://swapi.dev/api/planets');
  delete data.residents;

  let data2;
  if (value) {
    data2 = data.filter((planet) => planet.name.includes(value));
  } else {
    data2 = data;
  }

  return (
    <div>
      { loading && <h1>Carregando...</h1> }
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
