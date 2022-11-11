import Image from "next/image";
import styles from "../styles/TopBar.module.css";

const TopBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.menuContainer}
        alt=""
        src={"/menu.jpeg"}
        width={70}
        height={70}
      />
      <Image
        className={styles.carritoContainer}
        alt=""
        src={"/carrito.jpeg"}
        width={70}
        height={70}
      />

      <div className={styles.titleContainer}>
        <span>CAPYBARA</span>
      </div>
    </div>
  );
};

export default TopBar;
