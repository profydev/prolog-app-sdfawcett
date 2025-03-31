import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";
import type { Status } from "@api/issues.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  status: Status,
  options?: { signal?: AbortSignal },
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, status },
    signal: options?.signal,
  });
  return data;
}
