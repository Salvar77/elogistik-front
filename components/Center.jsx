import classes from "./Center.module.scss";

const Center = ({ children }) => {
  return <div className={classes.center}>{children}</div>;
};

export default Center;
