import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";
import { LoadingAnimation } from "features/ui/loading-animation";
import { useState } from "react";
import type { Status, Query, Level } from "@api/issues.types";

export function IssueList() {
  const [status] = useState<Status>("");
  const [level] = useState<Level>("");
  const [projectName] = useState<string>("");

  const router = useRouter();
  const page = Number(router.query.page || 1);
  const navigateToPage = (newPage: number) => {
    const query: Query = { page: newPage };
    if (status) query.status = status;
    if (level) query.level = level;
    if (projectName) query.project = projectName;

    router.push({
      pathname: router.pathname,
      query: { ...query },
    });
  };

  const issuesPage = useGetIssues(page, status, level, projectName);
  const projects = useGetProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingAnimation />
      </div>
    );
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );
  const { items, meta } = issuesPage.data || {};

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Issue</th>
            <th className={styles.headerCell}>Level</th>
            <th className={styles.headerCell}>Events</th>
            <th className={styles.headerCell}>Users</th>
          </tr>
        </thead>
        <tbody>
          {(items || []).map((issue) => (
            <IssueRow
              key={issue.id}
              issue={issue}
              projectLanguage={projectIdToLanguage[issue.projectId]}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <div>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page + 1)}
            disabled={page === meta?.totalPages}
          >
            Next
          </button>
        </div>
        <div className={styles.pageInfo}>
          Page <span className={styles.pageNumber}>{meta?.currentPage}</span> of{" "}
          <span className={styles.pageNumber}>{meta?.totalPages}</span>
        </div>
      </div>
    </div>
  );
}
