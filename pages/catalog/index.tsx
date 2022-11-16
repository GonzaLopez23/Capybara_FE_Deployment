import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Catalogo.module.css";
import Product, { IProduct } from "./Product";

const opciones = ["Mátes", "Mochilas", "Termos"];
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
const Catalogo: React.FC = () => {
  const router = useRouter();

  const [optionSelected, setOptionSelected] = useState<string | null>(null);

  const handleNewOption = (o: string | null) => setOptionSelected(o);

  const showProduct = (id: number) => router.push(`/product/${id}`);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Catálogo</span>

      <div className={styles.line}></div>
      <div className={styles.lista}>
        <span
          onClick={() => handleNewOption(null)}
          className={`${styles.listItem} ${
            optionSelected === null ? styles.listItemSelected : undefined
          }`}
        >
          Todos
        </span>
        {opciones.map((o, i) => (
          <span
            key={i}
            onClick={() => handleNewOption(o)}
            className={`${styles.listItem} ${
              optionSelected === o ? styles.listItemSelected : undefined
            }`}
          >
            {o}
          </span>
        ))}
      </div>

      <div className={styles.productsContainer}>
        <div className={styles.productsContainerScroller}>
          {productos.map((p, i) => (
            <Product key={i} {...p} onClick={() => showProduct(p.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
