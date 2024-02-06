import style from "./error-message.module.scss";
import Image from "next/image";

interface ErrorMessageProps {
  message: string;
  reload: () => void;
}

export function ErrorMessage({ message, reload }: ErrorMessageProps) {
  return (
    <div className={style.errorMessage}>
      <Image
        src="/icons/alert-circle.svg"
        width={20}
        height={20}
        alt="alert message icon"
        data-cy="alert-icon"
      />

      <p>{message}</p>

      <button type="button" onClick={() => reload()}>
        Try again
        <Image
          src="/icons/arrow-right.svg"
          width={20}
          height={20}
          alt="arrow right icon"
          data-cy="arrow-right-icon"
        />
      </button>
    </div>
  );
}
