import { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { newData, loading, array } = useContext(AppContext);
  delete newData.residents;

  const finalData = newData.filter((planet) => {
    let found = true;
    if (array.length > 0) {
      array.forEach((currArray) => {
        if (currArray.name.includes(planet.name)) {
          found = false;
        }
      });
    }
    return found;
  });

  // console.log(finalData);

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
        { finalData.map((planet, index) => (
          <tbody key={ index }>
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
