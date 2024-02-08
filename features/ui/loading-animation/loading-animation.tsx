import style from "./loading.module.scss";

export function LoadingAnimation() {
  return <div className={style.loading} data-cy="loading-animation"></div>;
}
