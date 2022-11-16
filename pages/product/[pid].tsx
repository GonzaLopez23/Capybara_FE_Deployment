import { Add, PlusOne, Remove } from "@mui/icons-material";
import { useRouter } from "next/router";
import styles from "../../styles/ProductDetail.module.css";

const producto = {
  id: 1,
  nombre: "Mate",
  precio: 100,
  descripcion:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ",
};

const Product = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className={styles.container}>
      <span className={styles.title}>{producto.nombre}</span>
      <div className={styles.line}></div>
      <img className={styles.img} src="/mate.png" />
      <div className={styles.detailContainer}>
        <span>{producto.descripcion}</span>
        <div className={styles.pickerContainer}>
          <span>{producto.precio}</span>
          <div className={styles.counterPicker}>
            <Add /> <span>1</span> <Remove />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
