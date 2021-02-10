import { useState } from "react";
import axios from "axios";

const App = () => {
  const [results, updateResults] = useState([]);
  const [searchValue, updateSearchValue] = useState("");

  const search = async (value) => {
    const response = await axios.get(
      `https://swapi.dev/api/people/?search=${value}`
    );
    updateResults(response.data.results);
  };

  const onChange = (event) => {
    const value = event.target.value;
    updateSearchValue(value);
    search(value);
  };

  return (
    <>
      <div>
        <label htmlFor="character-search">Character</label>
        <input
          id="character-search"
          className="input"
          value={searchValue}
          onChange={onChange}
        />
      </div>
      {results.map((result) => (
        <div key={result.name}>{result.name}</div>
      ))}
    </>
  );
};

export default App;
