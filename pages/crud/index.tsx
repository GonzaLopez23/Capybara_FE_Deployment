import { style } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Crud.module.css";

const Index = () => {
  const [auth, setAuth] = useState(false);

  const router = useRouter();

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

  if (auth) {
    return (
      <div className={styles.container}>
        <h3 className={styles.titulo}>Dashboard</h3>
        <form  className={styles.form} >
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  return <></>;
};

export default Index;
