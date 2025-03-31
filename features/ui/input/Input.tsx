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
      data-error={error}
    >
      {label ? <span className={style.labelText}>{label}</span> : null}

      <span className={style.inputBox}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {icon ? <img src={icon} alt="" className={style.inputIcon} /> : null}
        <input {...inputProps} type="text" />

        {error ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/icons/alert-circle.svg"
            alt=""
            className={style.errorIcon}
          />
        ) : null}
      </span>

      {hint && <span className={style.hintText}>{hint}</span>}
      {error && <span className={style.errorText}>{errorText}</span>}
    </label>
  );
};
