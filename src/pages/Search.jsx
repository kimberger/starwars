import { useState } from "react";
import { Link } from "@reach/router";
import { useGet } from "../hooks";
import { Button } from "../ui";
import { SearchForm } from "../components";

const getIdFromResult = (result) => {
  const { length, [length - 1]: id } = result.url.split("/").filter(Boolean);
  return id;
};

const Search = () => {
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
      <SearchForm
        id="character-search"
        value={searchValue}
        onChange={onChange}
        label="Character"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        response.results?.map((result) => (
          <div key={result.name}>
            <Link to={`/character/${getIdFromResult(result)}`}>
              {result.name}
            </Link>
          </div>
        ))
      )}
      <Button disabled={!previousLink} onClick={() => search(previousLink)}>
        Previous
      </Button>
      <Button disabled={!nextLink} onClick={() => search(nextLink)}>
        Next
      </Button>
    </>
  );
};

export default Search;
