import { HTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./checkbox.module.scss";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

export enum CheckboxType {
  check = "check",
  partly = "partly",
}

interface CheckboxProps {
  size?: CheckboxSize;
  label?: string;
  checkboxType?: CheckboxType;
}

interface CheckBoxAttributes extends HTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  checked?: boolean;
}

export const Checkbox = ({
  size = CheckboxSize.sm,
  label = "",
  checkboxType = CheckboxType.check,
  ...checkboxProps
}: CheckBoxAttributes & CheckboxProps) => {
  console.log(checkboxProps);
  return (
    <label
      data-disabled={checkboxProps.disabled}
      className={classNames(
        styles[size],
        styles.checkbox,
        styles[checkboxType],
      )}
    >
      {label ? `${label}` : null}
      <input type="checkbox" {...checkboxProps} />
      <span></span>
    </label>
  );
};
