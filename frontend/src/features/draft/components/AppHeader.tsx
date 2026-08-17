import { useState } from "react";
import styles from "./AppHeader.module.scss";
import koraIcon from "/favicon.png";

const NAV_LINKS = ["Inicio", "Cómo funciona", "FAQ", "Sobre Kora"];

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.nav}>
      <div className={styles.nav__content}>
        <div className={styles.nav__logo}>
          <button
            type="button"
            className={styles.nav__menu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars-staggered"></i>
            )}
          </button>
          <img src={koraIcon} alt="" />
        </div>

        <nav
          className={[
            styles.nav__links,
            isMenuOpen ? styles["nav__links--open"] : "",
          ].join(" ")}
        >
          {NAV_LINKS.map((link, i) => (
            <span
              key={link}
              className={[
                styles.nav__link,
                i === 0 ? styles["nav__link--active"] : "",
              ].join(" ")}
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </span>
          ))}
        </nav>

        <button type="button" className={styles.nav__button}>
          <i className="fa-regular fa-circle-user"></i>
          <span>Iniciar sesión</span>
        </button>
      </div>
    </header>
  );
}
