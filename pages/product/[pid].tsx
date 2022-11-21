import { Add, PlusOne, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { updateCart, useCart } from "../../services/cart";
import styles from "../../styles/ProductDetail.module.css";

const producto = {
  nombre: "Mate",
  precio: 100,
  descripcion:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ",
};

const ProductDetail = () => {
  const { cart } = useCart();

  const router = useRouter();
  const { pid } = router.query;

  const navigateToCatalog = () => router.push("/catalog");

  const [quantity, setQuantity] = useState(1);

  if (pid === undefined || Array.isArray(pid)) {
    navigateToCatalog();
    return <></>;
  }

  const productId = Number(pid);

  if (isNaN(productId)) {
    navigateToCatalog();
    return <></>;
  }

  const handleChangeQuantity = (step: number) => () =>
    setQuantity((prev) => prev + step);

  const handleAddToCart = () => {
    const inCart = cart.items.some((i) => i.id === productId);

    const newCart = inCart
      ? {
          // producto ya en el carrito
          ...cart,
          items: cart.items.map((prod) => {
            if (prod.id === productId) {
              return { ...prod, quantity: prod.quantity + quantity };
            }
            return prod;
          }),
        }
      : {
          // producto nuevo en el carrito
          ...cart,
          items: cart.items.concat([
            {
              id: productId,
              price: producto.precio,
              name: producto.nombre,
              quantity,
            },
          ]),
        };

    updateCart(newCart);

    toast.info(() => (
      <span>
        Producto agregado al <Link href="/cart">carrito</Link>
      </span>
    ));
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>{producto.nombre}</span>
      <div className={styles.line}></div>
      <img className={styles.img} src="/mate.png" />
      <div className={styles.detailContainer}>
        <span>{producto.descripcion}</span>
        <div className={styles.pickerContainer}>
          <span>{`$ ${producto.precio * quantity}`}</span>
          <div className={styles.counterPicker}>
            <IconButton onClick={handleChangeQuantity(1)}>
              <Add />
            </IconButton>
            <span>{quantity}</span>
            <IconButton
              disabled={quantity === 1}
              onClick={handleChangeQuantity(-1)}
            >
              <Remove />
            </IconButton>
          </div>
        </div>
        <Button onClick={handleAddToCart} className={styles.button}>
          Agregar al carrito
        </Button>
      </div>
      <div className={styles.buttonCatalogoContainer}>
        <Button onClick={navigateToCatalog} className={styles.button}>
          Volver al catálogo
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
