import { useEffect } from "react";
import { Link } from "@reach/router";

import { useGet } from "../hooks";
import { CharacterCard } from "../components";

const Character = ({ id }) => {
  const [character, getCharacter] = useGet({ initialLoading: true });
  const [films, getFilms] = useGet();

  const filmTitles = films.responses?.map((film) => film.title);

  useEffect(() => {
    getCharacter(`https://swapi.dev/api/people/${id}/`);
    getFilms(character.response?.films);
  }, [id, character.response.films, getCharacter, getFilms]);

  if (character.loading) return <p>Loading...</p>;

  return (
    <>
      <p>
        <Link to="/">Back To Search</Link>
      </p>
      <CharacterCard {...{ ...character.response, films: filmTitles }} />
    </>
  );
};

export default Character;
