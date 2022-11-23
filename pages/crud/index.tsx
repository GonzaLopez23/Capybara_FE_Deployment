import { CircularProgress, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Crud.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Product, { IProduct } from "../../components/Product";
import useSWR, { mutate } from "swr";
import fetcher from "../../services/fetcher";
import { IProductResponse } from "../catalog/index";
import { ICategory } from "../catalog/index";
import axios from "axios";
import environment from "../../environment";
import { type } from "os";

const Index = () => {
  const [auth, setAuth] = useState(false);

  //INPUTS
  const [nombreInput, setnombreInput] = useState("");
  const [descripcionInput, setdescripcionInput] = useState("");
  const [precioInput, setprecioInput] = useState("");
  const [cantidadInput, setcantidadInput] = useState("");

  const handlenombreChange = (e: any) => {
    setnombreInput(e.target.value);
  };
  const handledescripcionChange = (e: any) => {
    setdescripcionInput(e.target.value);
  };
  const handleprecioChange = (e: any) => {
    setprecioInput(e.target.value);
  };
  const handlecantidadChange = (e: any) => {
    setcantidadInput(e.target.value);
  };

  const router = useRouter();

  const { data: dataProducts, error: errorProducts } = useSWR<
    IProductResponse[]
  >("/api/v1/productos", fetcher);

  const { data: dataCategories, error: errorCategories } = useSWR<ICategory[]>(
    "/api/v1/categorias",
    fetcher
  );

  useEffect(() => {
    const isAuth = (): boolean => {
      const authToken = "123456abcdef";

      if (sessionStorage.getItem("auth-token") === authToken) {
        console.log("good token. Log in.");
        return true;
      }
      console.log("bad token.");
      return false;
    };

    if (isAuth()) {
      setAuth(true);
      return;
    }
    router.push("/login");
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    axios
      .post(environment.BASE_URL + "/api/v1/productos", {
        nombre: nombreInput,
        descripcion: descripcionInput,
        precio: precioInput,
        cantidad: cantidadInput,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setnombreInput("");
    setdescripcionInput("");
    setprecioInput("");
    setcantidadInput("");
  };

  // const onChangeColor = (e: any) => {
  //   categoriaInput = e.target.value;
  // };

  if (auth) {
    return (
      <div className={styles.container}>
        <h3 className={styles.titulo}>CRUD</h3>
        <div className={styles.containerProductos}>
          {dataProducts === undefined ? (
            <div className={styles.spinnerContainer}>
              <CircularProgress />
            </div>
          ) : (
            dataProducts.map((p) => (
              <Product key={p.id} product={p} onClick={() => void 0} />
            ))
          )}
        </div>
        <form className={styles.form}>
          <div className={styles.AuthFormContent}>
            <h3 className={styles.AuthFormTitle}>Añadir producto</h3>
            <div className="form-group mt-3">
              <label className={styles.FormLabel}>Nombre</label>
              <input
                id="nombre"
                className="form-control mt-1"
                placeholder="Introducir nombre"
                value={nombreInput}
                onChange={handlenombreChange}
              />
            </div>
            <div className="form-group mt-3">
              <label className={styles.FormLabel}>Descripcion</label>
              <textarea
                id="descripcion"
                className="form-control mt-1"
                placeholder="Introducir descripcion"
                value={descripcionInput}
                onChange={handledescripcionChange}
              />
            </div>
            <div className="form-group mt-3">
              <label className={styles.FormLabel}>Precio</label>
              <input
                id="precio"
                className="form-control mt-1"
                placeholder="Introducir precio"
                value={precioInput}
                onChange={handleprecioChange}
              />
            </div>
            <div className="form-group mt-3">
              <label className={styles.FormLabel}>Cantidad</label>
              <input
                id="cantidad"
                className="form-control mt-1"
                placeholder="Introducir cantidad de stock"
                value={cantidadInput}
                onChange={handlecantidadChange}
              />
            </div>
            <div className="form-group mt-3">
              <label className={styles.FormLabel}>Categorías</label>
              <select
                className="form-control mt-1"
                id="selectCategoria"
                // onChange={onChangeColor.bind(this)}
              >
                {dataCategories === undefined ? (
                  <div className={styles.spinnerContainer}>
                    <CircularProgress />
                  </div>
                ) : (
                  dataCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={handleSubmit} className="btn btn-success">
                Añadir
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return <></>;
};

export default Index;
