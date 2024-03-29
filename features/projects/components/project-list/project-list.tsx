import { ProjectCard } from "../project-card";
import { ErrorMessage } from "../../../ui/error-message";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";
import { LoadingAnimation } from "features/ui/loading-animation";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingAnimation />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <ErrorMessage
        message="There was a problem while loading the project data"
        reload={() => refetch()}
      />
    );
  }

  return (
    <ul className={styles.list} data-cy="project-list">
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
