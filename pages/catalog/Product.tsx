import { IProductResponse } from ".";
import styles from "../../styles/Product.module.css";

export interface IProduct {
  product: IProductResponse;
  onClick: (p: number) => void;
  //   image
}

const Product: React.FC<IProduct> = ({ product, onClick }) => {
  return (
    <div className={styles.container} onClick={() => onClick(product.id)}>
      <img className={styles.img} src="/mate.png" />
      <span className={styles.text}>{product.nombre}</span>
      <span className={styles.text}>{`$ ${product.precio}`}</span>
    </div>
  );
};

export default Product;
