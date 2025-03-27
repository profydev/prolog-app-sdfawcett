import { DetailedHTMLProps, InputHTMLAttributes } from "react";

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
    <label aria-label={!label ? ariaText : ""}>
      {label ? <span>{label}</span> : null}

      <span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {icon ? <img src={icon} alt="" /> : null}
        <input {...inputProps} type="text" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {error ? <img src="/icons/alert-circle.svg" alt="" /> : null}
      </span>

      {hint && <p>{hint}</p>}
      {error && <p>{errorText}</p>}
    </label>
  );
};
