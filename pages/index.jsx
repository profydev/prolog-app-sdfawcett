import { useState, useEffect } from "react";
import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import Image from "next/image";
import { ContactModal } from "../features/ui/contact-modal";

const navItems = [
  { text: "Home", href: Routes.home },
  { text: "Products", href: Routes.products },
  { text: "Documentation", href: Routes.documentation },
  { text: "Pricing", href: Routes.pricing },
];

const companyList = [
  { name: "Layers", icon: "/icons/company-logos/layers.svg" },
  { name: "Sisyphus", icon: "/icons/company-logos/sisyphus.svg" },
  { name: "Circooles", icon: "/icons/company-logos/circooles.svg" },
  { name: "Catalog", icon: "/icons/company-logos/catalog.svg" },
  { name: "Quotient", icon: "/icons/company-logos/quotient.svg" },
];

const customerList = [
  {
    name: "Mollie Hall",
    title: "Web Developer, Sisyphus",
    avatar: "/images/mollie-hall.png",
    category: "Frontend Developer",
    testimonial:
      "Prolog has saved us many times. We get an alert, investgate the error, and fix it. That simple.",
  },
  {
    name: "Alec Whitten",
    title: "Software Architect, Layers",
    avatar: "images/alec-whitten.png",
    category: "Microservice Architectures",
    testimonial:
      "Our services fail from time to time. That’s normal. But with Prolog we’re able to track the issue down in no time. ",
  },
  {
    name: "Kelly Williams",
    title: "Engineering Manager, Catalog",
    avatar: "images/kelly-williams.png",
    category: "Backend Servers",
    testimonial:
      "Prolog’s UI is beautiful and intuitive. It’s simple to find bugs and our devs are always on top of pressing issues.",
  },
];

const IssuesPage = () => {
  const [isOpen, setisOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };

  // use effect to lock and add scroll when nav is open.
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [navOpen]);

  return (
    <div>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />

        <button
          aria-label="click to open or close the menu"
          aria-controls="home-navigation"
          aria-expanded={navOpen === true ? true : false}
          onClick={() => setNavOpen(!navOpen)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/nav-menu.svg" alt="menu" />
        </button>

        <nav
          className={styles.navLinks}
          aria-hidden={navOpen === true ? false : true}
          id="home-navigation"
          aria-label="navigation links for the home page"
        >
          <ul>
            {navItems.map((item) => {
              return (
                <li key={item.text}>
                  <a href={item.link}>{item.text}</a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a className={styles.dashboardLink} href={Routes.projects}>
          Open Dashboard
        </a>
      </header>
      <main>
        <section
          id="hero"
          aria-label="hero section company introduction"
          className={styles.hero}
        >
          <h1>Your Issues In Sight. At All Times.</h1>
          <p>
            Powerful error tracking and monitoring for software applications.
            Trusted by over 4,000 startups.
          </p>
          <Image
            src="/images/macbook.png"
            width={753}
            height={445}
            alt="prolog application being used on a macbook pro"
            priority={true}
          ></Image>
        </section>

        <section
          id="company-list"
          aria-label="description of companies that use ProLog"
        >
          <p>Join 4,000+ companies using Prolog</p>
          <ul>
            {companyList.map((company) => (
              <li key={company.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={company.icon} alt=""></img>
                <p>{company.name}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="testimonials" aria-label="Customer testimonials">
          <h2>Don&#39;t Only Trust Our Words</h2>
          <p>Our Customers around the globe share their opinions.</p>

          <div>
            {customerList.map((customer) => (
              <div key={customer.name} className={styles.customer}>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={customer.avatar}
                    alt={`${customer.name} avatar`}
                  ></img>
                  <h3>{customer.name}</h3>
                  <p>{customer.title}</p>
                </div>
                <p>{customer.category}</p>
                <p>{customer.testimonial}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <button className={styles.contactButton} onClick={toggle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>

      <ContactModal isOpen={isOpen} toggle={toggle} />
    </div>
  );
};

export default IssuesPage;
