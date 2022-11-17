import Button from "../../components/Button";
import styles from "../../styles/Cart.module.css";

const productos = [
  {
    id: 1,
    nombre: "Mate",
    precio: 100,
  },
  {
    id: 1,
    nombre: "Mate",
    precio: 100,
  },
  {
    id: 1,
    nombre: "Mate",
    precio: 100,
  },
  {
    id: 1,
    nombre: "Mate",
    precio: 100,
  },
  {
    id: 1,
    nombre: "Mate",
    precio: 100,
  },
  {
    id: 1,
    nombre: "Mate",
    precio: 100,
  },
];

const Cart: React.FC = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Carrito de compras</span>
      <div className={styles.line}></div>
      <div className={styles.listContainer}>
        <div className={styles.listHeaderContainer}>
          <span className={styles.titleList}>Cantidad</span>

          <span className={styles.titleList}>Subtotal</span>
        </div>
        <div className={styles.listContent}>
          {productos.map((p, i) => (
            <>
              <span className={styles.titleList}>{p.nombre}</span>
              <span className={styles.titleList}>contador</span>
              <span className={styles.titleList}>lol</span>
            </>
          ))}
        </div>
      </div>
      <div className={styles.buttonCatalogoContainer}>
        <Button className={styles.button}>Volver al catálogo</Button>
      </div>
    </div>
  );
};

export default Cart;
