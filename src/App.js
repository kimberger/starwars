import { useState } from "react";
import { useGet } from "./hooks";
import styles from "./App.module.css";
import { Button } from "./ui";
import { Search } from "./components";

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
    <div className={styles.app}>
      <Search
        id="character-search"
        value={searchValue}
        onChange={onChange}
        label="Character"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        response.results?.map((result) => (
          <div key={result.name}>{result.name}</div>
        ))
      )}
      <Button disabled={!previousLink} onClick={() => search(previousLink)}>
        Previous
      </Button>
      <Button disabled={!nextLink} onClick={() => search(nextLink)}>
        Next
      </Button>
    </div>
  );
};

export default App;
