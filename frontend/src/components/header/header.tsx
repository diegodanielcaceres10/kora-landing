import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.scss";
import koraIcon from "/favicon.png";

const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Cómo funciona", to: "/como-funciona" },
  { label: "FAQ", to: "/faq" },
  { label: "Sobre Kora", to: "/sobre-kora" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

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
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={koraIcon} alt="Kora" />
          </Link>
        </div>

        <nav
          className={[
            styles.nav__links,
            isMenuOpen ? styles["nav__links--open"] : "",
          ].join(" ")}
        >
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={[
                styles.nav__link,
                pathname === to ? styles["nav__link--active"] : "",
              ].join(" ")}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* <button type="button" className={styles.nav__button}>
          <i className="fa-regular fa-circle-user"></i>
          <span>Iniciar sesión</span>
        </button> */}
      </div>
    </header>
  );
}
