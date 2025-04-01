import { axios } from "./axios";
import type { Issue, Level } from "./issues.types";
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
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, status, level, project },
    signal: options?.signal,
  });
  return data;
}
