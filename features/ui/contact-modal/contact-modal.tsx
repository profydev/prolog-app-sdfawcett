import React, { ReactNode } from "react";
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
          <div
            onClick={(e) => e.stopPropagation()}
            className={classNames(styles.modalBox)}
          >
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
