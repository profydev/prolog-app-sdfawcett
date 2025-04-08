import Image from "next/image";
import { useFilter } from "../context/filter-context";
import type { Status, Level } from "@api/issues.types";

interface NoIssuesProps {
  navigateToPage: (
    newPage: number,
    status: Status,
    Level: Level,
    projectName: string,
  ) => void;
}

export function NoIssues({ navigateToPage }: NoIssuesProps) {
  const { setStatus, setLevel, setProjectName } = useFilter();
  return (
    <div role="region">
      <Image src="/images/not-found.png" alt="" width={152} height={118} />
      <h2>No issues found</h2>
      <p>
        Either the filters you selected are too restricive or there are no
        issues for your projects.
      </p>
      <button
        type="button"
        onClick={() => {
          if (setStatus) setStatus("");
          if (setLevel) setLevel("");
          if (setProjectName) setProjectName("");
          localStorage.removeItem("filterOptions");
          navigateToPage(1, "", "", "");
        }}
      >
        Clear Filters
      </button>
    </div>
  );
}
