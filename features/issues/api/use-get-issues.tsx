import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue, Level } from "@api/issues.types";
import type { Status } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(page?: number) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page];
}

export function useGetIssues(page: number, status: Status, level: Level) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page),
    ({ signal }) => getIssues(page, status, level, { signal }),
    { keepPreviousData: true },
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(getQueryKey(page + 1), ({ signal }) =>
        getIssues(page + 1, status, level, { signal }),
      );
    }
  }, [query.data, page, status, level, queryClient]);
  return query;
}
