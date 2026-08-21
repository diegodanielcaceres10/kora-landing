import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./ForgotPasswordPage.module.scss";
import { useForgotPassword } from "../features/account/hooks/useForgotPassword";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { submit, status, error } = useForgotPassword();

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    submit({ email });
  };

  return (
    <section className={styles.account}>
      <div className={styles.account__content}>
        <header>
          <p className={styles.account__eyebrow}>Recuperar acceso</p>
          <h1 className={styles.account__title}>Olvidé mi contraseña</h1>
        </header>

        {isSuccess ? (
          <div className={styles.account__success}>
            <p className={styles.account__successTitle}>Listo</p>
            <p className={styles.account__successDescription}>
              Si el email existe en Kora, te va a llegar un correo con los
              pasos para restablecer tu contraseña.
            </p>
          </div>
        ) : (
          <form className={styles.account__form} onSubmit={handleSubmit}>
            <p className={styles.account__description}>
              Ingresá el email de tu cuenta y te enviamos un link para crear
              una nueva contraseña.
            </p>

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

            <button
              type="submit"
              className={styles.account__submit}
              disabled={isLoading}
            >
              {isLoading && (
                <span className={styles.account__spinner} aria-hidden="true" />
              )}
              <span>{isLoading ? "Enviando..." : "Enviar instrucciones"}</span>
            </button>

            {status === "error" && (
              <p className={styles.account__error} role="alert">
                {error}
              </p>
            )}
          </form>
        )}

        <Link to="/iniciar-sesion" className={styles.account__link}>
          Volver a iniciar sesión
        </Link>
      </div>
    </section>
  );
}
