import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);

  const refresh = () => {
    fetch(url)
      .then((result) => result.json())
      .then((d) => setData(d.results));
  };

  useEffect(() => {
    refresh();
  }, []);

  return { data, refresh };
}
