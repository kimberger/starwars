import { useEffect, useState } from "react";
import axios from "axios";

const Character = ({ id }) => {
  const [character, updateCharacter] = useState();
  const [films, updateFilms] = useState([]);

  const getCharacter = async (id) => {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    const filmTitles = await Promise.all(
      response.data.films.map(async (film) => {
        const filmResponse = await axios.get(film);
        return filmResponse.data.title;
      })
    );
    updateCharacter(response.data);
    updateFilms(filmTitles);
  };

  useEffect(() => {
    getCharacter(id);
  }, [id]);

  return character ? (
    <>
      <p>Birth Year: {character.birth_year}</p>
      {films.map((film) => (
        <p key={film}>{film}</p>
      ))}
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default Character;
