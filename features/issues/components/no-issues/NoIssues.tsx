import Image from "next/image";
import { useFilter } from "../context/filter-context";
import type { Status, Level } from "@api/issues.types";
import styles from "./no-issues.module.scss";
import { Button } from "@features/ui";
import { ButtonSize } from "@features/ui";

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
    <div role="region" className={styles.noIssues}>
      <Image src="/images/not-found.png" alt="" width={152} height={118} />
      <h2>No issues found</h2>
      <p>
        Either the filters you selected are too restricive or there are no
        issues for your projects.
      </p>
      <Button
        type="button"
        size={ButtonSize.lg}
        onClick={() => {
          if (setStatus) setStatus("");
          if (setLevel) setLevel("");
          if (setProjectName) setProjectName("");
          localStorage.removeItem("filterOptions");
          navigateToPage(1, "", "", "");
        }}
      >
        Clear filters
      </Button>
    </div>
  );
}
