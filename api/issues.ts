import { axios } from "./axios";
import type { Issue, Level, Query } from "./issues.types";
import type { Page } from "@typings/page.types";
import type { Status } from "@api/issues.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  status: Status,
  level: Level,
  project: string,
  options?: { signal?: AbortSignal },
) {
  const params: Query = { page };
  if (status) params.status = status;
  if (level) params.level = level;
  if (project) params.project = project;
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params,
    signal: options?.signal,
  });
  return data;
}
