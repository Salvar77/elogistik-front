import classes from "./Input.module.scss";

const Input = (props) => {
  return <input {...props} className={classes.styledInput}></input>;
};

export default Input;
