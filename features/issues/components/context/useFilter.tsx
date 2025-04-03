import { useContext } from "react";
import { FilterContext, FilterActionContext } from "./filter-context";

const useFilter = () => {
  const filter = useContext(FilterContext);
  const filterActions = useContext(FilterActionContext);

  return { ...filter, ...filterActions };
};

export default useFilter;
