import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./contact-modal.module.scss";
import { Button, ButtonColor, ButtonSize } from "../button";

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
              <img src="/icons/mail.svg" alt="mail" className={styles.icon} />

              <h2 className={styles.title}>Contact Us Via EMail</h2>
              <p className={styles.description}>
                Any questions? Send us an email at prolog@profy.dev. We usually
                answer within 24 hours.
              </p>

              <div className={styles.buttonContainer}>
                <Button
                  className={styles.button}
                  size={ButtonSize.lg}
                  color={ButtonColor.gray}
                  onClick={props.toggle}
                >
                  Cancel
                </Button>
                <Button
                  className={styles.button}
                  size={ButtonSize.lg}
                  color={ButtonColor.primary}
                  onClick={() =>
                    (location.href =
                      "mailto:prolog@profy.dev?subject=Support%20Request%20:&body=message%20goes%20here")
                  }
                >
                  Open Email App
                </Button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
