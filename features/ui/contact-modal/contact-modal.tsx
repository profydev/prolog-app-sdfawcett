import React, { ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames";
import styles from "./contact-modal.module.scss";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export function ContactModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className={classNames(styles.modalOverlay)} onClick={props.toggle}>
          <section
            onClick={(e) => e.stopPropagation()}
            className={classNames(styles.modalBox)}
          >
            <div className={styles.modalBody}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/mail.svg" alt="" className={styles.icon} />

              <h2 className={styles.title}>Contact Us Via EMail</h2>
              <p className={styles.description}>
                Any questions? Send us an email at prolog@profy.dev. We usually
                answer within 24 hours.
              </p>

              <div id="modalButtons" className={styles.buttons}>
                <Link href="mailto:profysupport@prolog-app.com?subject=Support%20Request%20:&body=message%20goes%20here">
                  Open Email App
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
