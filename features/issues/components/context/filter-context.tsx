import { createContext, useState, useContext, useEffect } from "react";
import type { Status, Level } from "@api/issues.types";

interface FilterContextProps {
  status: Status;
  level: Level;
  projectName: string;
}

interface FilterActionContextProps {
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setLevel: React.Dispatch<React.SetStateAction<Level>>;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
}

interface FilterContextProviderProps {
  children: React.ReactNode;
}

export const FilterContext = createContext<FilterContextProps>({
  status: "",
  level: "",
  projectName: "",
});
export const FilterActionContext =
  createContext<FilterActionContextProps | null>(null);

export const FilterContextProvider = ({
  children,
}: FilterContextProviderProps) => {
  const [status, setStatus] = useState<Status>("");
  const [level, setLevel] = useState<Level>("");
  const [projectName, setProjectName] = useState<string>("");

  useEffect(() => {
    const filterOptions = localStorage.getItem("filterOptions");
    if (filterOptions) {
      const { status, level, projectName } = JSON.parse(filterOptions);
      setStatus(status);
      setLevel(level);
      setProjectName(projectName);
    }
  }, []);

  return (
    <FilterActionContext.Provider
      value={{ setStatus, setLevel, setProjectName }}
    >
      <FilterContext.Provider value={{ status, level, projectName }}>
        {children}
      </FilterContext.Provider>
    </FilterActionContext.Provider>
  );
};

export const useFilter = () => {
  const filter = useContext(FilterContext);
  const filterActions = useContext(FilterActionContext);

  return { ...filter, ...filterActions };
};
