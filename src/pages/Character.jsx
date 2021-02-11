import { useEffect, useState } from "react";
import { Link } from "@reach/router";
import axios from "axios";

import { CharacterCard } from "../components";

const Character = ({ id }) => {
  const [character, updateCharacter] = useState();

  const getCharacter = async (id) => {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    const filmTitles = await Promise.all(
      response.data.films.map(async (film) => {
        const filmResponse = await axios.get(film);
        return filmResponse.data.title;
      })
    );
    updateCharacter({ ...response.data, films: filmTitles });
  };

  useEffect(() => {
    getCharacter(id);
  }, [id]);

  if (!character) return <p>Loading...</p>;

  return (
    <>
      <p>
        <Link to="/">Back To Search</Link>
      </p>
      <CharacterCard {...character} />
    </>
  );
};

export default Character;
