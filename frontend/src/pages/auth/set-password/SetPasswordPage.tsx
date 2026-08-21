import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./SetPasswordPage.module.scss";
import { useSetPassword } from "../../../features/account/hooks/useSetPassword";

const MIN_PASSWORD_LENGTH = 8;

export function SetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mismatchError, setMismatchError] = useState<string | null>(null);
  const { submit, status, error } = useSetPassword();

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || !token) return;

    if (password !== confirmPassword) {
      setMismatchError("Las contraseñas no coinciden");
      return;
    }
    setMismatchError(null);
    submit(token, password);
  };

  if (!token) {
    return (
      <section className={styles.setPassword}>
        <div className={styles.setPassword__content}>
          <header>
            <p className={styles.setPassword__eyebrow}>Crear contraseña</p>
            <h1 className={styles.setPassword__title}>Link inválido</h1>
          </header>
          <p className={styles.setPassword__description}>
            Este link no tiene un token válido. Pedí uno nuevo desde
            "Olvidé mi contraseña" o revisá que copiaste la URL completa del
            mail.
          </p>
          <Link to="/forgot" className={styles.setPassword__link}>
            Ir a "Olvidé mi contraseña"
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.setPassword}>
      <div className={styles.setPassword__content}>
        <header>
          <p className={styles.setPassword__eyebrow}>Crear contraseña</p>
          <h1 className={styles.setPassword__title}>Definí tu contraseña</h1>
        </header>

        {isSuccess ? (
          <div className={styles.setPassword__success}>
            <p className={styles.setPassword__successTitle}>¡Listo!</p>
            <p className={styles.setPassword__successDescription}>
              Tu contraseña se guardó correctamente. Ya podés iniciar sesión.
            </p>
            <Link to="/login" className={styles.setPassword__link}>
              Ir a iniciar sesión
            </Link>
          </div>
        ) : (
          <form className={styles.setPassword__form} onSubmit={handleSubmit}>
            <p className={styles.setPassword__description}>
              Elegí una contraseña de al menos {MIN_PASSWORD_LENGTH}{" "}
              caracteres.
            </p>

            <div className={styles.setPassword__field}>
              <label className={styles.setPassword__label} htmlFor="password">
                Nueva contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={styles.setPassword__input}
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={isLoading}
                minLength={MIN_PASSWORD_LENGTH}
                required
              />
            </div>

            <div className={styles.setPassword__field}>
              <label
                className={styles.setPassword__label}
                htmlFor="confirmPassword"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={styles.setPassword__input}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                disabled={isLoading}
                minLength={MIN_PASSWORD_LENGTH}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.setPassword__submit}
              disabled={isLoading}
            >
              {isLoading && (
                <span
                  className={styles.setPassword__spinner}
                  aria-hidden="true"
                />
              )}
              <span>{isLoading ? "Guardando..." : "Guardar contraseña"}</span>
            </button>

            {(mismatchError || (status === "error" && error)) && (
              <p className={styles.setPassword__error} role="alert">
                {mismatchError ?? error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
