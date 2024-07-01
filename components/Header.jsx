import Link from "next/link";
import classes from "./Header.module.scss";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Header = () => {
  const { cartProducts } = useContext(CartContext);
  return (
    <header className={classes.header}>
      <Center>
        <div className={classes.header__wrapper}>
          <Link className={classes.header__logo} href={"/"}>
            Elogistik
          </Link>
          <nav className={classes.header__styledNav}>
            <Link className={classes.header__navLink} href={"/"}>
              Home
            </Link>
            <Link className={classes.header__navLink} href={"/products"}>
              Produkty
            </Link>
            <Link className={classes.header__navLink} href={"/categories"}>
              Kategorie
            </Link>
            <Link className={classes.header__navLink} href={"/account"}>
              Konto
            </Link>
            <Link className={classes.header__navLink} href={"/cart"}>
              Cart ({cartProducts.length})
            </Link>
          </nav>
        </div>
      </Center>
    </header>
  );
};

export default Header;
