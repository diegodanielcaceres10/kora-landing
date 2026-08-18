import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__meta}>
        <p>© 2026 Kora • Diego Daniel Caceres</p>
      </div>
    </footer>
  );
}
