import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [newData, setNewData] = useState(data);
  const [filterInput, setFilterInput] = useState('');
  const [columnInput, setColumnInput] = useState('population');
  const [operatorInput, setOperatorInput] = useState('maior que');
  const [valueInput, setValueInput] = useState(0);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [array, setArray] = useState([]);

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
    setNewData(filteredData);
  }, [filteredData]);

  useEffect(() => {
    const compareBy = {
      'maior que': (a, b) => a > b,
      'menor que': (a, b) => a < b,
      'igual a': (a, b) => a === b,
    };

    let arr = [];
    currentFilters.forEach((curr) => {
      if (curr.columnInput) {
        const newFilteredData = filteredData.filter(
          (planet) => !compareBy[curr.operatorInput](Number(
            planet[curr.columnInput],
          ), Number(curr.valueInput)),
        );
        arr = [...arr, ...newFilteredData];
      }
    });
    setArray([...arr]);
  }, [currentFilters, filteredData]);

  useEffect(() => {
    const filt = [];
    currentFilters.forEach((curr) => {
      filt.push(curr.columnInput);
    });
    setColumnFilters(filt);
  }, [currentFilters]);

  const values = useMemo(() => ({
    data,
    loading,
    error,
    filterInput,
    filteredData,
    newData,
    columnInput,
    operatorInput,
    valueInput,
    currentFilters,
    columnFilters,
    array,
    setFilterInput,
    setColumnInput,
    setOperatorInput,
    setValueInput,
    setCurrentFilters,
  }), [
    data,
    loading,
    error,
    filterInput,
    filteredData,
    newData,
    columnInput,
    operatorInput,
    valueInput,
    currentFilters,
    columnFilters,
    array,
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
