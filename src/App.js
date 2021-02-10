import { useState, useCallback } from "react";
import axios from "axios";
import debounce from "debounce";

const App = () => {
  const [response, updateResponse] = useState({});
  const [loading, updateLoading] = useState(false);
  const [searchValue, updateSearchValue] = useState("");

  const nextLink = !loading && response.next;
  const previousLink = !loading && response.previous;

  const search = useCallback(
    debounce(async (url) => {
      const response = await axios.get(url);
      updateLoading(false);
      updateResponse(response.data || {});
    }, 500),
    []
  );

  const onChange = (event) => {
    const value = event.target.value;
    updateSearchValue(value);
    updateLoading(true);
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        response.results?.map((result) => (
          <div key={result.name}>{result.name}</div>
        ))
      )}
      <button
        disabled={!previousLink}
        onClick={() => {
          updateLoading(true);
          search(previousLink);
        }}
      >
        Previous
      </button>
      <button
        disabled={!nextLink}
        onClick={() => {
          updateLoading(true);
          search(nextLink);
        }}
      >
        Next
      </button>
    </>
  );
};

export default App;
