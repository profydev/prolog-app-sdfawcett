import { useEffect, useRef, useState } from "react";
import style from "./select.module.scss";
import { useClickOutside } from "@features/hooks";
import { List } from "./components/List";

export interface Option {
  name: string;
  value: string;
  img?: string;
}

interface SelectProps {
  options: Option[];
  action: (value: string) => void;
  value: string | null;
  ariaText: string;
  groupName: string;
  hasEmpty?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: string;
  hintText?: string;
  error?: boolean;
  errorText?: string;
}

export const Select = ({
  action,
  options,
  value,
  groupName,
  ariaText,
  placeholder = "Select",
  hasEmpty = false,
  label,
  icon,
  disabled,
  hintText,
  error,
  errorText,
}: SelectProps) => {
  const [selected, setSelected] = useState<Option | null>(() => {
    if (value === null) return null;
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption || null;
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (isOpen === false) return;
    setIsOpen(false);
  });
  const lastSelected = useRef<string | null>(
    selected === null ? null : selected.value,
  );

  useEffect(() => {
    if (value === null) {
      setSelected(null);
      lastSelected.current = null;
    }
  }, [value]);

  return (
    <div className={style.select} ref={ref}>
      {label ? <p className={style.labelText}>{label}</p> : null}
      <div className={style.listContainer}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          role="combobox"
          aria-controls={`${groupName}Id`}
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="listbox"
          aria-label={ariaText}
          disabled={disabled}
          data-empty={!selected?.value}
          data-error={error}
          data-cy={groupName}
        >
          {/* eslint-disable-next-line */}
          {icon ? <img src={icon} alt="" /> : null}
          {!selected?.name || selected?.value === ""
            ? placeholder
            : selected.name}
          {/* eslint-disable-next-line */}
          <img src="/icons/chevron.svg" alt="" data-open={isOpen} />
        </button>
        {hintText ? <p className={style.hintText}>{hintText}</p> : null}
        {error && errorText && !disabled ? (
          <p className={style.errorText}>{errorText}</p>
        ) : null}
        <List
          groupName={groupName}
          options={
            hasEmpty ? [{ name: "---", value: "" }, ...options] : options
          }
          selected={selected}
          setSelected={setSelected}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          action={action}
          lastSelected={lastSelected}
        />
      </div>
    </div>
  );
};
