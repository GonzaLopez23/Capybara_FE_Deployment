import { Add, PlusOne, Remove } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import Button from "../../components/Button";
import { updateCart, useCart } from "../../services/cart";
import fetcher from "../../services/fetcher";
import styles from "../../styles/ProductDetail.module.css";
import { IProductResponse } from "../catalog";

const ProductDetail = () => {
  const { cart } = useCart();

  const router = useRouter();
  const { query, isReady } = useRouter();

  const { pid } = query;

  const { data: dataProduct } = useSWR<IProductResponse>(
    isReady ? `/api/v1/productos/${pid}` : null,
    fetcher
  );

  const productId = Number(pid);

  const navigateToCatalog = () => router.push("/catalog");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (
      (pid === undefined || Array.isArray(pid) || isNaN(productId)) &&
      isReady
    ) {
      navigateToCatalog();
    }
  }, []);

  if (dataProduct === undefined) {
    return (
      <div className={styles.spinnerContainer}>
        <CircularProgress />
      </div>
    );
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
              price: dataProduct.precio,
              name: dataProduct.nombre,
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
      <span className={styles.title}>{dataProduct.nombre}</span>
      <div className={styles.line}></div>
      <img className={styles.img} src="/mate.png" />
      <div className={styles.detailContainer}>
        <span>{dataProduct.descripcion}</span>
        <div className={styles.pickerContainer}>
          <span>{`$ ${dataProduct.precio * quantity}`}</span>
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
