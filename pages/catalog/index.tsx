import { CircularProgress, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../../services/fetcher";
import styles from "../../styles/Catalogo.module.css";
import Product, { IProduct } from "../../components/Product";

// const opciones = ["Mátes", "Mochilas", "Termos"];

export interface IProductResponse {
  cantidad: number;
  // categoria
  descripcion: string;
  id: number;
  nombre: string;
  precio: number;
}

export interface ICategory {
  id: number;
  nombre: string;
  descripcion: string;
}

const Catalogo: React.FC = () => {
  const router = useRouter();

  const [categorySelected, setCategorySelected] = useState<number | null>(null);

  const { data: dataProducts, error: errorProducts } = useSWR<
    IProductResponse[]
  >(
    [
      categorySelected !== null
        ? "/api/v1/productos/search"
        : "/api/v1/productos",
      categorySelected !== null
        ? {
            params: {
              search: "categoria.id:" + categorySelected,
            },
          }
        : undefined,
    ],
    fetcher
  );

  const { data: dataCategories, error: errorCategories } = useSWR<ICategory[]>(
    "/api/v1/categorias",
    fetcher
  );

  const handleNewOption = (cId: number | null) => setCategorySelected(cId);

  const showProduct = (id: number) => router.push(`/product/${id}`);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Catálogo</span>

      <div className={styles.line}></div>
      <div className={styles.lista}>
        <span
          onClick={() => handleNewOption(null)}
          className={`${styles.listItem} ${
            categorySelected === null ? styles.listItemSelected : undefined
          }`}
        >
          Todos
        </span>

        {dataCategories === undefined ? (
          <div className={styles.spinnerContainer}>
            <CircularProgress />
          </div>
        ) : (
          dataCategories.map((c) => (
            <Tooltip key={c.id} title={c.descripcion} placement="right">
              <span
                onClick={() => handleNewOption(c.id)}
                className={`${styles.listItem} ${
                  categorySelected === c.id
                    ? styles.listItemSelected
                    : undefined
                }`}
              >
                {c.nombre}
              </span>
            </Tooltip>
          ))
        )}
      </div>

      <div className={styles.productsContainer}>
        <div className={styles.productsContainerScroller}>
          {dataProducts === undefined ? (
            <div className={styles.spinnerContainer}>
              <CircularProgress />
            </div>
          ) : (
            dataProducts.map((p) => (
              <Product
                key={p.id}
                product={p}
                onClick={() => showProduct(p.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
