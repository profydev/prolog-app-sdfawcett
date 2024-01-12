import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  default = "default",
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
  emptyError = "emptyError",
}

export enum ButtonIcon {
  none = "none",
  only = "only",
  leading = "leading",
  trailing = "trailing",
}

type ButtonProps = {
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  className?: string;
  icon?: ButtonIcon;
  onClick: () => void;
};

export function Button({
  children,
  size = ButtonSize.md,
  color = ButtonColor.default,
  icon = ButtonIcon.none,
  className,
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[size],
        styles[color],
        styles[icon],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
