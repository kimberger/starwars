import { useState } from "react";
import { useGet } from "./hooks";

const App = () => {
  const [searchValue, updateSearchValue] = useState("");
  const [{ loading, response }, search] = useGet();

  const nextLink = !loading && response.next;
  const previousLink = !loading && response.previous;

  const onChange = (event) => {
    const value = event.target.value;
    updateSearchValue(value);
    search(`https://swapi.dev/api/people/?search=${value}`);
  };

  return (
    <>
      <div>
        <label htmlFor="character-search">Character</label>
        <input id="character-search" value={searchValue} onChange={onChange} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        response.results?.map((result) => (
          <div key={result.name}>{result.name}</div>
        ))
      )}
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
