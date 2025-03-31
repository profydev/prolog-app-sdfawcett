export enum IssueLevel {
  info = "info",
  warning = "warning",
  error = "error",
}

export type Issue = {
  id: string;
  projectId: string;
  name: string;
  message: string;
  stack: string;
  level: IssueLevel;
  numEvents: number;
  numUsers: number;
};

export type Status = "resolved" | "open" | "";
export type Level = "Error" | "Warning" | "Info" | "";
export interface Query {
  page: number;
  status?: Status;
  level?: Level;
  search?: string;
}
