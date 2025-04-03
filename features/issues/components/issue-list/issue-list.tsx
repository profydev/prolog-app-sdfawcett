import type { Level, Query, Status } from "@api/issues.types";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useRouter } from "next/router";
import { useGetIssues } from "../../api/use-get-issues";
import { Filter } from "../filter";
import { useFilter } from "../context/filter-context";
import styles from "./issue-list.module.scss";
import { IssueRow } from "./issue-row";

export function IssueList() {
  const { status, level, projectName } = useFilter();
  const router = useRouter();

  const page = Number(router.query.page || 1);
  const navigateToPage = (
    newPage: number,
    status: Status,
    level: Level,
    projectName: string,
  ) => {
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
    return <div>Loading</div>;
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
      <Filter navigateToPage={navigateToPage} />
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
            onClick={() => navigateToPage(page - 1, status, level, projectName)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page + 1, status, level, projectName)}
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
