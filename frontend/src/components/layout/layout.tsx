import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

export function Layout() {
  return (
    <main className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
