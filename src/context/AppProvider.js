import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [filterInput, setFilterInput] = useState('');
  const [columnInput, setColumnInput] = useState('population');
  const [operatorInput, setOperatorInput] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);
  const [currentFilter, setCurrentFilter] = useState({
    columnInput: '',
    operatorInput: '',
    valueInput: 0,
  });

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((d) => setData(d.results))
      .catch((err) => setError(err))
      .finally(setLoading(false));
  }, []);

  useEffect(() => {
    const newFilteredData = data.filter((planet) => planet.name.toLowerCase()
      .includes(filterInput.toLowerCase()));
    setFilteredData(newFilteredData);
  }, [filterInput, data]);

  useEffect(() => {
    if (currentFilter.columnInput) {
      if (currentFilter.operatorInput === 'maior que') {
        const newFilteredData = data.filter((planet) => Number(
          planet[currentFilter.columnInput],
        ) > Number(currentFilter.valueInput));
        setFilteredData(newFilteredData);
      } else if (currentFilter.operatorInput === 'menor que') {
        const newFilteredData = data.filter((planet) => Number(
          planet[currentFilter.columnInput],
        ) < Number(currentFilter.valueInput));
        setFilteredData(newFilteredData);
      } else if (currentFilter.operatorInput === 'igual a') {
        const newFilteredData = data.filter((planet) => Number(
          planet[currentFilter.columnInput],
        ) === Number(currentFilter.valueInput));
        setFilteredData(newFilteredData);
      }
    }
  }, [currentFilter, data]);

  const values = useMemo(() => ({
    data,
    loading,
    error,
    filterInput,
    filteredData,
    columnInput,
    operatorInput,
    valueInput,
    setFilterInput,
    setColumnInput,
    setOperatorInput,
    setValueInput,
    setCurrentFilter,
  }), [
    data,
    loading,
    error,
    filterInput,
    filteredData,
    columnInput,
    operatorInput,
    valueInput,
  ]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  data: PropTypes.object,
}.isRequired;

export default AppProvider;
