import React from "react";
import Header from "@/components/Header";
import classes from "../styles/Cart.module.scss";
import Center from "@/components/Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, resetCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      setIsSuccess(true);
      resetCart();
    }
  }, []);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };

  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };

  const goToPayment = async () => {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  let total = 0;

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <div className={classes.columnsWrapper}>
            {" "}
            <div className={classes.box}>
              <h1>Dziękujemy za złożenie zamówienia! </h1>
              <p>
                Wyślemy maila z potwierdzeniem kiedy zamówienie zostanie wysłane
              </p>
            </div>
          </div>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <div className={classes.columnsWrapper}>
          <div className={classes.box}>
            <h2>Koszyk</h2>
            {!cartProducts.length ? (
              <div>Twój koszyk jest pusty</div>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th>Ilość</th>
                    <th>Cena</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className={classes.productInfoCell}>
                        <div className={classes.productImageBox}>
                          <img src={product.images[0]} alt={product.title} />
                        </div>
                        {product.title}
                      </td>
                      <td>
                        <button
                          onClick={() => lessOfThisProduct(product._id)}
                          className={classes.button}
                        >
                          -
                        </button>
                        <div className={classes.quantityLabel}>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </div>
                        <button
                          onClick={() => moreOfThisProduct(product._id)}
                          className={classes.button}
                        >
                          +
                        </button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
          {!!cartProducts.length && (
            <div className={classes.box}>
              <h2>Informacje o zamówieniu</h2>

              <Input
                type="text"
                placeholder="Imię"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <div className={classes.cityHolder}>
                <Input
                  type="text"
                  placeholder="Miasto"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Kod Pocztowy"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
              <Input
                type="text"
                placeholder="Ulica"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Kraj"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />

              <button className={classes.btn} onClick={goToPayment}>
                Kontynuowanie płatności
              </button>
            </div>
          )}
        </div>
      </Center>
    </>
  );
};

export default CartPage;
