import { useState, useCallback } from "react";
import axios from "axios";
import debounce from "debounce";

const App = () => {
  const [response, updateResponse] = useState({});
  const [searchValue, updateSearchValue] = useState("");

  const nextLink = response.next;
  const previousLink = response.previous;

  const search = useCallback(
    debounce(async (url) => {
      const response = await axios.get(url);
      updateResponse(response.data || {});
    }, 500),
    []
  );

  const onChange = (event) => {
    const value = event.target.value;
    updateSearchValue(value);
    search(`https://swapi.dev/api/people/?search=${value}`);
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
      {response.results?.map((result) => (
        <div key={result.name}>{result.name}</div>
      ))}
      <button disabled={!previousLink} onClick={() => search(previousLink)}>
        Previous
      </button>
      <button disabled={!nextLink} onClick={() => search(nextLink)}>
        Next
      </button>
    </>
  );
};

export default App;
