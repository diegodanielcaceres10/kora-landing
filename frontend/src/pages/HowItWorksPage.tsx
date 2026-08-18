import styles from "./page.module.scss";
import tutorialStyles from "./HowItWorksPage.module.scss";

const HOW_IT_WORKS_ITEMS = [
  {
    icon: "fa-solid fa-sliders",
    title: "Configurá el partido",
    description:
      "Elegí cuántos equipos querés armar y cuántos jugadores tiene cada lado.",
  },
  {
    icon: "fa-solid fa-clipboard-list",
    title: "Cargá a los jugadores",
    description:
      "Sumá los nombres de quienes juegan y revisá que esté todo listo antes del sorteo.",
  },
  {
    icon: "fa-solid fa-wand-magic-sparkles",
    title: "Sorteá y compartí",
    description:
      "Generá los equipos, ajustalos si hace falta y descargá una imagen para mandar al grupo.",
  },
];

export function HowItWorksPage() {
  return (
    <div className={styles.container}>
      <header>
        <p className={styles.eyebrow}>Cómo funciona</p>
        <h1 className={styles.title}>Armá equipos claros sin perder tiempo</h1>
      </header>

      <div className={tutorialStyles.grid}>
        {HOW_IT_WORKS_ITEMS.map(({ icon, title, description }, i) => (
          <article key={title} className={tutorialStyles.item}>
            <span className={tutorialStyles.number}>
              {(i + 1).toString().padStart(2, "0")}
            </span>
            <i className={[icon, tutorialStyles.icon].join(" ")}></i>
            <h2 className={tutorialStyles.itemTitle}>{title}</h2>
            <p className={tutorialStyles.itemDesc}>{description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
