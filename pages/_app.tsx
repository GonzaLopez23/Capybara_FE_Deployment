import "../styles/globals.css";
import styles from "../styles/App.module.css";
import type { AppProps } from "next/app";
import TopBar from "../components/TopBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <TopBar />
      <Component {...pageProps} />
    </div>
  );
}
