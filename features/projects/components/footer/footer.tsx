import React from "react";
import Image from "next/image";
import styles from "./footer.module.scss";

const navItems = [
  { title: "Docs", url: "#" },
  { title: "API", url: "#" },
  { title: "Help", url: "#" },
  { title: "Community", url: "#" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.version}>
        <p>Version: {process.env.appVersion}</p>
      </div>
      <ul className={styles.nav}>
        {navItems.map((item) => (
          <li key={item.title} className={styles.navItem}>
            <a className={styles.link} href={item.url}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.logoContainer}>
        <Image src="/icons/logo-small.svg" width={23} height={33} alt="logo" />
      </div>
    </footer>
  );
}
