import { Level, Status } from "@api/issues.types";
import { useFilter } from "../context/filter-context";
import { useEffect, useState } from "react";

interface FilterProps {
  navigateToPage: (
    newPage: number,
    status: Status,
    Level: Level,
    projectName: string,
  ) => void;
}

export function Filter({ navigateToPage }: FilterProps) {
  const { setStatus, setLevel, setProjectName, status, level, projectName } =
    useFilter();
  const [name, setName] = useState(projectName);

  useEffect(() => {
    if (projectName === "") setName("");
  }, [projectName]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (setStatus && setLevel && setProjectName) {
          setStatus(status);
          setLevel(level);
          setProjectName(projectName);
        }
        navigateToPage(1, status, level, name);
      }}
    >
      <label aria-label="Filter status by 'unresolved' or 'resolved'">
        <select
          onChange={(e) => {
            const status = e.target.value as Status;
            if (setStatus) setStatus(status);
            navigateToPage(1, status, level, projectName);
          }}
          value={status}
        >
          <option value="">--</option>
          <option value="open">Unresolved</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>

      <label aria-label="Filter level by 'error', 'warning', or 'info'">
        <select
          onChange={(e) => {
            const level = e.target.value as Level;
            if (setLevel) setLevel(level);
            navigateToPage(1, status, level, projectName);
          }}
          value={level}
        >
          <option value="">--</option>
          <option value="error">Error</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </label>
      <label aria-label="Filter by project name">
        <input
          type="text"
          maxLength={25}
          onBlur={(e) => {
            const projectName = e.target.value;
            if (setProjectName) setProjectName(projectName);
            navigateToPage(1, status, level, projectName);
          }}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
    </form>
  );
}
