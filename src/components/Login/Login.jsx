import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import imgLogo from "../../assets/unacYellowLogo.svg";
import imgLogin from "./../../assets/illustrationLogin.png";
import { useUser } from "../../core/hooks/useUser";
import styles from "./Login.module.css";
import { Seo } from "../layout/Seo";

const Login = () => {
  // const [email, setEmail] = useState(null)
  // const [password, setPassword] = useState(null)
  const [email, setEmail] = useState("jesielvirtualsa@gmail.com");
  const [password, setPassword] = useState("1234567890");
  const [remember, setRemember] = useState(false);

  const { login, loading, error } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === null && password === null) {
      Swal.fire({
        title: "<strong>Faltan datos</strong>",
        icon: "info",
        html:
          "Está intentando iniciar sesión sin <b>ninguna información</b>, " +
          "por favor ingrese sus credenciales!",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Intentar de nuevo",
        confirmButtonAriaLabel: "Intentar de nuevo",
        cancelButtonText: "Cancelar",
        cancelButtonAriaLabel: "Cancelar",
      });
    } else if (
      (email === null && password != null) ||
      (password === null && email != null)
    ) {
      Swal.fire({
        title: "<strong>Faltan datos</strong>",
        icon: "info",
        html: "Faltan datos para iniciar sesión!",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Intentar de nuevo",
        confirmButtonAriaLabel: "Intentar de nuevo",
        cancelButtonText: "Cancelar",
        cancelButtonAriaLabel: "Cancelar",
      });
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <>
      <Seo title="Iniciar sesión" subtitle="Ingrese con sus credenciales" />

      <div className={styles.Login}>
        <div className={styles.wrapper_login}>
          <div className={styles.container_form}>
            <div className={styles.wrapper_image_logo}>
              <Link to="/">
                <LogiImg src={imgLogo} alt="" className={styles.img_logo} />
              </Link>
            </div>
            <h1 className={styles.h1_Form}>Inicia sesión</h1>
            <form className={styles.form_login} onSubmit={handleSubmit}>
              <label htmlFor="email" className={styles.label_email}>
                Dirección email
              </label>
              <input
                type="email"
                id="email"
                className={styles.input_email}
                placeholder="Ingresa tu email aquí..."
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="password" className={styles.label_password}>
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className={styles.input_password}
                placeholder="Ingresa tu contraseña aquí..."
                onChange={(e) => setPassword(e.target.value)}
              />

              <br />

              <div className={styles.wrapper_remember}>
                <div className={styles.wrapper_checkbox}>
                  <input
                    type="checkbox"
                    id="checkbox"
                    className={styles.input_checkbox}
                    onChange={(e) => setRemember(e.target.value)}
                  />
                  <label htmlFor="checkbox" className={styles.label_checkbox}>
                    Recordar contraseña
                  </label>
                </div>
                <a href="" className={styles.save_password}>
                  ¿Recuperar contraseña?
                </a>
              </div>

              {loading && (
                <span className={styles.label_checkbox}>Cargando</span>
              )}

              {error && (
                <span
                  className={styles.label_checkbox}
                  style={{ color: "red" }}
                >
                  Error, intente nuevamente
                </span>
              )}

              <LoginButton type="submit">Iniciar sesión</LoginButton>
            </form>
          </div>
        </div>
        <div className={styles.wrapper_img}>
          <img src={imgLogin} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;

export const LoginButton = styled.button`
  border: none;
  height: 100%;
  margin: 0px;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: 1px solid #f5a800;
  /* background: #f5f5f5; */
  /* background: #eeeeee; */
  background: none;
  color: #f5a800;
  cursor: pointer;

  :hover {
    background-color: #f5a800;
    color: #ffffff;
  }
`;

const LogiImg = styled.img`
  width: 190px;
  cursor: pointer;

  :hover {
    background: rgba(47, 128, 237, 0.1);
    background: #9e1b1b0e;
    background: #eeeeee;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
`;
