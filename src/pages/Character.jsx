import { useEffect, useState } from "react";
import axios from "axios";

const Character = ({ id }) => {
  const [character, updateCharacter] = useState();

  const getCharacter = async (id) => {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    updateCharacter(response.data);
  };

  useEffect(() => {
    getCharacter(id);
  }, [id]);

  return character ? (
    <p>Birth Year: {character.birth_year}</p>
  ) : (
    <p>Loading...</p>
  );
};

export default Character;
