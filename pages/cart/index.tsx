import { Add, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo } from "react";
import Button from "../../components/Button";
import { ICart, IProduct, updateCart, useCart } from "../../services/cart";
import styles from "../../styles/Cart.module.css";

interface IProductList {
  product: IProduct;
  handleQuantity: (pid: number) => (step: number) => () => void;
}

// eslint-disable-next-line react/display-name
const ProductList = React.memo<IProductList>(({ product, handleQuantity }) => {
  return (
    <>
      <span className={styles.productListName}>{product.name}</span>
      <div className={styles.productListCounter}>
        <IconButton onClick={handleQuantity(product.id)(1)}>
          <Add />
        </IconButton>
        <span>{product.quantity}</span>
        <IconButton onClick={handleQuantity(product.id)(-1)}>
          <Remove />
        </IconButton>
      </div>
      <span>{`$${product.price * product.quantity}`}</span>
    </>
  );
});

const Cart: React.FC = () => {
  const { cart } = useCart();

  const router = useRouter();

  const gotoCatalog = () => router.push("/catalog");

  const handleQuantity = useCallback(
    (pid: number) => (step: number) => () =>
      updateCart((prev) => ({
        ...prev,
        items: prev.items
          .map((p) => {
            if (p.id !== pid) return p;

            return { ...p, quantity: p.quantity + step };
          })
          .filter((p) => p.quantity > 0), // eliminamos los items del carrito
      })),
    []
  );

  const total = cart.items.reduce(
    (prev, current) => prev + current.price * current.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <span className={styles.title}>Carrito de compras</span>
      <div className={styles.line}></div>
      <div className={styles.listContainer}>
        <div className={styles.lineListHeader} />
        <div className={styles.listHeaderContainer}>
          <span className={styles.titleList}>Cantidad</span>
          <span className={styles.titleList}>Subtotal</span>
        </div>
        <div className={styles.listContent}>
          <>
            {cart.items.map((p, i) => (
              <ProductList
                product={p}
                handleQuantity={handleQuantity}
                key={p.id}
              />
            ))}
          </>
        </div>
      </div>
      <div className={styles.footer}>
        <Button onClick={gotoCatalog} className={styles.button}>
          Volver al catálogo
        </Button>
        <span className={styles.resume}>{`Total $${total}`}</span>
      </div>
    </div>
  );
};

export default Cart;
