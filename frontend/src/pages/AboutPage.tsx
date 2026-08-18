import styles from "./page.module.scss";
import aboutStyles from "./AboutPage.module.scss";
import authorLogo from "../assets/diegodanielcaceres.png";

export function AboutPage() {
  return (
    <div className={styles.container}>
      <header>
        <p className={[styles.eyebrow, aboutStyles.eyebrow].join(" ")}>
          Sobre Kora
        </p>
        <h1 className={styles.title}>
          Una forma simple de resolver el sorteo antes de jugar
        </h1>
      </header>

      <p className={aboutStyles.description}>
        Kora nació para esos partidos donde nadie quiere perder diez minutos
        repartiendo jugadores. Elegís la cantidad de equipos, cargás la lista y
        dejás que la app haga el trabajo rápido, claro y sin vueltas.
      </p>

      <a
        className={aboutStyles.author}
        href="https://diegodanielcaceres10.github.io/nura/"
        target="_blank"
        rel="noreferrer"
        aria-label="Portfolio de Diego Daniel Caceres"
      >
        <div className={aboutStyles.authorLogo}>
          <img src={authorLogo} alt="Diego Daniel Caceres" />
        </div>
        <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  );
}
