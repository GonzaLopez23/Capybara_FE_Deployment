import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src="/background.jpg" />
      </div>
    </div>
  );
}
