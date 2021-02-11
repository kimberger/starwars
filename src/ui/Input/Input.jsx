import classnames from "classnames";
import styles from "./Input.module.css";

const Input = ({ className, ...rest }) => {
  const classes = classnames(styles.input);
  return <input {...rest} className={classes} />;
};

export default Input;
