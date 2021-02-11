import styles from "./CharacterCard.module.css";

const CharacterCard = (character) => (
  <div className={styles.card}>
    <dl className={styles.attributeList}>
      <dt>Name</dt>
      <dd>{character.name}</dd>
      <dt>Birth Year</dt>
      <dd>{character.birth_year}</dd>
      <dt>Height</dt>
      <dd>{character.height}cm</dd>
      <dt>Mass</dt>
      <dd>{character.mass}kg</dd>
      <dt>Hair Colour</dt>
      <dd>{character.hair_color}</dd>
      <dt>Skin Colour</dt>
      <dd>{character.skin_color}</dd>
      <dt>Eye Colour</dt>
      <dd>{character.eye_color}</dd>
      <dt>Gender</dt>
      <dd>{character.gender}</dd>
      <dt>Films</dt>
      <dd>
        <ul>
          {character.films.map((film) => (
            <li key={film}>{film}</li>
          ))}
        </ul>
      </dd>
    </dl>
  </div>
);

export default CharacterCard;
