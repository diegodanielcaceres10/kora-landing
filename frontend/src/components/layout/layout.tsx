import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

export function Layout() {
  return (
    <main className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
