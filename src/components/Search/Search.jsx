import { Input } from "../../ui";
import styles from "./Search.module.css";

const Search = ({ label, id, value, onChange }) => {
  return (
    <div className={styles.search}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <Input id={id} value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
