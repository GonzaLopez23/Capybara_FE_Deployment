import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../components/Button";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const handleClickButtonCatalogo = () => router.push("/catalog");

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src="/background.jpg" />
      </div>
      <div className={styles.caja}>
        <span className={styles.leyenda}>AMARGO Y RETRUCO</span>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={handleClickButtonCatalogo}>
          Catálogo de productos
        </Button>
      </div>
    </div>
  );
}
