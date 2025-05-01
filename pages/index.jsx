import { useState, useEffect } from "react";
import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import Image from "next/image";
import { ContactModal } from "../features/ui/contact-modal";
import useIsMobile from "../features/hooks/useIsMobile";

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
  { name: "Hourglass", icon: "/icons/company-logos/hourglass.svg" },
];

const customerList = [
  {
    name: "Mollie Hall",
    title: "Web Developer, Sisyphus",
    avatar: "/images/mollie-hall.png",
    category: "Frontend Development",
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
  const isMobile = useIsMobile();

  const toggle = () => {
    setisOpen(!isOpen);
  };

  // use effect to lock and add scroll when nav is open.
  useEffect(() => {
    if (isMobile) setNavOpen(false);
    else {
      setNavOpen(true);
    }
  }, [isMobile]);

  return (
    <div className={styles.index}>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />

        <button
          aria-label={`click to ${navOpen === true ? "close" : "open"} menu}`}
          aria-controls="home-navigation"
          aria-expanded={navOpen === true ? true : false}
          onClick={() => {
            if (navOpen === true) {
              setNavOpen(false);
              document.body.style.overflow = "unset";
            } else {
              setNavOpen(true);
              document.body.style.overflow = "hidden";
            }
          }}
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
          <div className={styles.heroContainer}>
            <h1>
              Your Issues In Sight.
              <br /> At All Times.
            </h1>
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
          </div>
        </section>

        <section
          id="company-list"
          aria-label="description of companies that use ProLog"
          className={styles.companies}
        >
          <div className={styles.companiesContainer}>
            <p>Join 4,000+ companies using Prolog</p>
            <ul
              className={styles.companyList}
              aria-label="list of companies that use prolog"
            >
              {companyList.map((company) => (
                <li key={company.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={company.icon}
                    alt={`Logo for the ${company.name} logo`}
                  ></img>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="testimonials"
          aria-label="Customer testimonials"
          className={styles.testimonials}
        >
          <div className={styles.testimonialsTitle}>
            <h2>Don&#39;t Only Trust Our Words</h2>
            <p>Our customers around the globe share their opinions.</p>
          </div>
          <div className={styles.testimonialCards}>
            {customerList.map((customer) => (
              <div key={customer.name} className={styles.customer}>
                <div>
                  <h3 className={styles.customerCategory}>
                    {customer.category}
                  </h3>
                  <p className={styles.customerText}>{customer.testimonial}</p>
                </div>

                <div className={styles.customerInfo}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={customer.avatar}
                    alt={`${customer.name} avatar`}
                  ></img>
                  <p className={styles.customerName}>{customer.name}</p>
                  <p className={styles.customerTitle}>{customer.title}</p>
                </div>
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
