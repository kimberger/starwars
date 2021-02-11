import classnames from "classnames";
import styles from "./Button.module.css";

const Button = ({ className, ...rest }) => {
  const classes = classnames(className, styles.button);
  return <button {...rest} className={classes} />;
};

export default Button;
