import { Routes } from "@config/routes";
import styles from "./index.module.scss";

const navItems = [
  { text: "Home", href: Routes.home },
  { text: "Products", href: Routes.products },
  { text: "Documentation", href: Routes.documentation },
  { text: "Pricing", href: Routes.pricing },
];

console.log(navItems);

const IssuesPage = () => {
  return (
    <div>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />

        <nav>
          <ul className={styles.linkContainer}>
            {navItems.map((navItem) => (
              <li key={navItem.text}>
                <a href={navItem.href}>{navItem.text}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className={styles.dashboardLink} href={Routes.projects}>
          Open Dashboard
        </a>
      </header>
      <button
        className={styles.contactButton}
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal",
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>
    </div>
  );
};

export default IssuesPage;
