import { useState } from "react";
import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import { ContactModal } from "../features/ui/contact-modal";

const navItems = [
  { text: "Home", href: Routes.home },
  { text: "Products", href: Routes.products },
  { text: "Documentation", href: Routes.documentation },
  { text: "Pricing", href: Routes.pricing },
];

const IssuesPage = () => {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };

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
      <button className={styles.contactButton} onClick={toggle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>

      <ContactModal isOpen={isOpen} toggle={toggle}>
        <div>Yaay!!! Our Modal is rendered Properly.</div>
      </ContactModal>
    </div>
  );
};

export default IssuesPage;
