import { Add, PlusOne, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import styles from "../../styles/ProductDetail.module.css";

const producto = {
  id: 1,
  nombre: "Mate",
  precio: 100,
  descripcion:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ",
};

const ProductDetail = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (step: number) => () =>
    setQuantity((prev) => {
      //TODO: validar stock
      const result = prev + step;
      if (result === 0) return prev;

      return result;
    });

  const handleClickButtonCatalogo = () => router.push("/catalog");

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
            <IconButton onClick={handleChangeQuantity(-1)}>
              <Remove />
            </IconButton>
          </div>
        </div>
        <Button className={styles.button}>Agregar al carrito</Button>
      </div>
      <div className={styles.buttonCatalogoContainer}>
        <Button onClick={handleClickButtonCatalogo} className={styles.button}>
          Volver al catálogo
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
