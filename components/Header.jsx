import Link from "next/link";
import classes from "./Header.module.scss";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

const Header = () => {
  const { cartProducts } = useContext(CartContext);

  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <header className={classes.header}>
      <Center>
        <div className={classes.header__wrapper}>
          <Link className={classes.header__logo} href={"/"}>
            Elogistik
          </Link>
          <nav
            className={`${classes.header__styledNav} ${
              mobileNavActive ? classes.header__styledNavActive : ""
            }`}
          >
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
          <button
            onClick={() => setMobileNavActive((prev) => !prev)}
            className={classes.header__navButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={classes.svg}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </button>
        </div>
      </Center>
    </header>
  );
};

export default Header;
