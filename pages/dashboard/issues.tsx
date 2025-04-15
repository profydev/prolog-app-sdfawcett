import { PageContainer } from "@features/layout";
import { IssueList } from "@features/issues";
import type { NextPage } from "next";
import { FilterContextProvider } from "@features/issues";

const IssuesPage: NextPage = () => {
  return (
    <PageContainer
      title="Issues"
      info="Overview of errors, warnings, and events logged from your projects."
    >
      <FilterContextProvider>
        <IssueList />
      </FilterContextProvider>
    </PageContainer>
  );
};

export default IssuesPage;
