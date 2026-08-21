import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import { useLogin } from "../features/account/hooks/useLogin";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { submit, status, error } = useLogin();
  const navigate = useNavigate();

  const isLoading = status === "loading";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    const result = await submit({ email, password });
    if (result) {
      navigate("/");
    }
  };

  return (
    <section className={styles.account}>
      <div className={styles.account__content}>
        <header>
          <p className={styles.account__eyebrow}>Iniciar sesión</p>
          <h1 className={styles.account__title}>Entrá a tu cuenta</h1>
        </header>

        <form className={styles.account__form} onSubmit={handleSubmit}>
          <div className={styles.account__field}>
            <label className={styles.account__label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.account__input}
              placeholder="vos@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className={styles.account__field}>
            <label className={styles.account__label} htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={styles.account__input}
              placeholder="••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.account__submit}
            disabled={isLoading}
          >
            {isLoading && (
              <span className={styles.account__spinner} aria-hidden="true" />
            )}
            <span>{isLoading ? "Ingresando..." : "Iniciar sesión"}</span>
          </button>

          {status === "error" && (
            <p className={styles.account__error} role="alert">
              {error}
            </p>
          )}

          <div className={styles.account__links}>
            <Link to="/olvide-contrasena" className={styles.account__link}>
              Olvidé mi contraseña
            </Link>
            <Link to="/crear-cuenta" className={styles.account__link}>
              Crear cuenta
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
