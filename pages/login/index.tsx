import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/Login.module.css";


const Index = ():ReactElement => {

  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleUserChange = (e:any) => {
    setUserInput(e.target.value);
  }

  const handlePasswordChange = (e:any) => {
    setPasswordInput(e.target.value);
  }

  const router = useRouter();
  
  const onSubmit = (e:any) => {
    e.preventDefault();
    let hardcodedCred = {
        user: 'admin',
        password: 'capybara'
    }

    if ((userInput == hardcodedCred.user) && (passwordInput == hardcodedCred.password)) {
        const token = '123456abcdef';
        sessionStorage.setItem('auth-token', token);
        router.push('/crud');
    } else {
        alert('wrong User or password combination');
    }
  }

  return(
  <div className={styles.AuthFormContainer}>
      <form className={styles.AuthForm} method="POST" onSubmit={onSubmit}>
        <div className={styles.AuthFormContent}>
          <h3 className={styles.AuthFormTitle}>Sign In</h3>
          <div className="form-group mt-3">
            <label className={styles.FormLabel}>Username</label>
            <input
              type="user"
              className="form-control mt-1"
              placeholder="Enter username"
              value={userInput}
              onChange={handleUserChange}
            />
          </div>
          <div className="form-group mt-3">
            <label className={styles.FormLabel}>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={passwordInput}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-success">
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default Index;
