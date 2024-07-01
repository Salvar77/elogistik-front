import classes from "./Button.module.scss";

const Button = ({ children, size, ...rest }) => {
  const sizeClass = size === "l" ? classes.large : "";
  return (
    <button
      {...rest}
      className={`${classes.styledButton} ${sizeClass} ${classes.large}`}
    >
      {children}
    </button>
  );
};

export default Button;
