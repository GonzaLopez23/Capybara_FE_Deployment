import styles from "../../styles/Product.module.css";

export interface IProduct {
  nombre: string;
  precio: number;
  id: number;
  onClick: (p: number) => void;
  //   image
}

const Product: React.FC<IProduct> = ({ nombre, precio, id, onClick }) => {
  return (
    <div className={styles.container} onClick={() => onClick(id)}>
      <img className={styles.img} src="/mate.png" />
      <span className={styles.text}>{nombre}</span>
      <span className={styles.text}>{`$ ${precio}`}</span>
    </div>
  );
};

export default Product;
