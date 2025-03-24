import { MutableRefObject, useEffect, useRef } from "react";
import type { Option } from "../Select";
import style from "./list.module.scss";

interface ListProps {
  groupName: string;
  options: Option[];
  selected: Option | null;
  setSelected: React.Dispatch<Option | null>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  action: (value: string) => void;
  lastSelected: MutableRefObject<string | null>;
}

export const List = ({
  groupName,
  options,
  selected,
  setSelected,
  isOpen,
  setIsOpen,
  action,
  lastSelected,
}: ListProps) => {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const selectList = list.current;
    if (isOpen) {
      const selectedInput = selectList?.querySelector<HTMLInputElement>(
        `input[value="${selected?.value}"]`,
      );
      const firstInput = selectList?.querySelector<HTMLInputElement>(
        "input:first-of-type",
      );

      if (selectedInput) {
        selectedInput.focus();
      } else {
        firstInput?.focus();
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case "Tab":
        case "Enter":
        case "Escape": {
          const selectedValue =
            selectList?.querySelector<HTMLInputElement>("input:focus")?.value;
          const targetOption = options.find(
            (option) => option.value === selectedValue,
          );

          if (
            targetOption?.value === lastSelected.current ||
            (targetOption?.value === "" && lastSelected.current === null)
          ) {
            setIsOpen(false);
            return;
          }
          lastSelected.current =
            targetOption === undefined ? null : targetOption.value;
          setIsOpen(false);
          action(targetOption?.value || "");
          break;
        }
      }
    };

    selectList?.addEventListener("keydown", handleKey);

    return () => {
      selectList?.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, setIsOpen, setSelected, selected, options, action, lastSelected]);

  useEffect(() => {
    if (
      isOpen ||
      selected === null ||
      selected?.value === lastSelected.current ||
      (lastSelected.current === null && selected.value === "")
    )
      return;
    lastSelected.current = selected.value || null;
    action(selected.value);
  }, [isOpen, selected, action, lastSelected]);

  return (
    <ul
      id={`${groupName}Id`}
      ref={list}
      className={style.list}
      data-open={isOpen}
    >
      <>
        {options.map((option) => (
          <li
            className={style.selectOption}
            key={option.name}
            data-active={option.value === selected?.value}
          >
            <label
              onMouseDown={() => {
                if (
                  option.value === selected?.value ||
                  (option.value === "" && lastSelected.current === null)
                ) {
                  setIsOpen(false);
                  return;
                }
                lastSelected.current = option.value;
                setSelected(option);
                setIsOpen(false);
                action(option.value);
              }}
              className={style.itemLabel}
            >
              {/* eslint-disable-next-line */}
              {option.img ? <img src={option.img} alt="" /> : null}
              {option.name}
              <input
                type="radio"
                name={groupName}
                value={option.value}
                onChange={() => {
                  setSelected(option);
                }}
                checked={option.value === selected?.value}
              />
              {/* eslint-disable-next-line */}
              <img src="/icons/check-md.svg" alt="" className={style.check} />
            </label>
          </li>
        ))}
      </>
    </ul>
  );
};
