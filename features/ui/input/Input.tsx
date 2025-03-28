import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import style from "./input.module.scss";

interface InputProps {
  error?: boolean;
  errorText?: string;
  label?: string;
  hint?: string;
  icon?: string;
  ariaText: string;
}

interface InputAttributes
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = ({
  error,
  label,
  hint,
  icon,
  errorText,
  ariaText,
  ...inputProps
}: InputAttributes & InputProps) => {
  return (
    <label
      aria-label={!label ? ariaText : ""}
      className={style.inputLabel}
      data-disabled={inputProps.disabled}
    >
      {label ? <span>{label}</span> : null}

      <span className={style.inputBox}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {icon ? <img src={icon} alt="" className={style.inputIcon} /> : null}
        <input {...inputProps} type="text" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {error ? <img src="/icons/alert-circle.svg" alt="" /> : null}
      </span>

      {hint && <p>{hint}</p>}
      {error && <p>{errorText}</p>}
    </label>
  );
};
