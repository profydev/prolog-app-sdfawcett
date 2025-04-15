import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";

describe("Issue List", () => {
  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssuesPage1");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    }).as("getIssuesPage2");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3", {
      fixture: "issues-page-3.json",
    }).as("getIssuesPage3");

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssuesPage1"]);
    cy.wait(500);

    // loading animation should no longer exist in dom
    cy.get('[data-cy="loading-animation"]').should("not.exist");

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the issues", () => {
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      //cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      //cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      //cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
    });

    it("persists page after reload", () => {
      cy.get("@next-button").click();
      //cy.contains("Page 2 of 3");

      cy.reload();
      cy.wait(["@getProjects", "@getIssuesPage2"]);
      cy.wait(1500);
      //cy.contains("Page 2 of 3");
    });
  });
});

// Filtering the issue list
describe("Issue list filter, status", () => {
  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssuesPage1");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    }).as("getIssuesPage2");

    // request mocks for open filter
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&status=open",
      {
        fixture: "filter/status/issues-open-page-1.json",
      },
    ).as("getIssuesPage1Open");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=2&status=open",
      {
        fixture: "filter/status/issues-open-page-2.json",
      },
    ).as("getIssuesPage2Open");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=3&status=open",
      {
        fixture: "filter/status/issues-open-page-3.json",
      },
    ).as("getIssuesPage3Open");

    // request mocks for resolved filter
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&status=resolved",
      {
        fixture: "filter/status/issues-resolved-page-1.json",
      },
    ).as("getIssuesPage1Resolved");

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssuesPage1"]);
    cy.wait(500);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");

    // set filter options
    cy.get('[data-cy="issueStatusFilter"]').as("issueStatusFilter");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it('filters the issue list by "open"', () => {
      // open the select option,
      cy.get("@issueStatusFilter").select("open");
      // wait for request to resolve
      cy.wait(["@getIssuesPage1Open"]);

      // // check page 1
      cy.url().should("include", "/issues?page=1&status=open");
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 10);
      cy.get("@next-button").click();
      // // check page 2
      cy.url().should("include", "/issues?page=2&status=open");
      cy.wait(["@getIssuesPage2Open"]);
      cy.contains("Page 2 of 3");
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 10);
      cy.get("@next-button").click();
      // // check page 3
      cy.url().should("include", "/issues?page=3&status=open");
      cy.wait(["@getIssuesPage3Open"]);
      cy.contains("Page 3 of 3");
      cy.get("@next-button").should("have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 2);
    });

    it('filter issue list by "resolved', () => {
      // open the select option,
      cy.get("@issueStatusFilter").select("resolved");

      // wait for request to resolve
      cy.wait(["@getIssuesPage1Resolved"]);

      // check page 1
      cy.url().should("include", "/issues?page=1&status=resolved");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 10);
    });
  });
});

describe("Issue list filter, level", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssuesPage1");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    }).as("getIssuesPage2");

    // request mocks for the error filter
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&level=error",
      {
        fixture: "filter/level/issues-error-page-1.json",
      },
    ).as("getIssuesPage1Error");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=2&level=error",
      {
        fixture: "filter/level/issues-error-page-2.json",
      },
    ).as("getIssuesPage2Error");

    // request mocks for the warning filter
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&level=warning",
      {
        fixture: "filter/level/issues-warning-page-1.json",
      },
    ).as("getIssuesPage1Warning");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=2&level=warning",
      {
        fixture: "filter/level/issues-warning-page-2.json",
      },
    ).as("getIssuesPage2Warning");

    // request mocks for the 'info' filter
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&level=info",
      {
        fixture: "filter/level/issues-info-page-1.json",
      },
    ).as("getIssuesPage1Info");

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssuesPage1"]);
    cy.wait(500);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");

    // grab filter option
    cy.get('[data-cy="issueLevelFilter"]').as("issueLevelFilter");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it('filters the issue list by "error"', () => {
      cy.get("@issueLevelFilter").select("error");

      // wait for request to resolve
      cy.wait(["@getIssuesPage1Error"]);

      // check page 1
      cy.url().should("include", "/issues?page=1&level=error");
      cy.contains("Page 1 of 2");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 10);
      cy.get("@next-button").click();

      // check page 2
      cy.url().should("include", "/issues?page=2&level=error");
      cy.wait(["@getIssuesPage2Error"]);
      cy.contains("Page 2 of 2");
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 2);
      cy.get("@next-button").should("have.attr", "disabled");
    });

    it('filters the issue list by "warning"', () => {
      cy.get("@issueLevelFilter").select("warning");

      // wait for request to resolve
      cy.wait(["@getIssuesPage1Warning"]);

      // check page 1
      cy.url().should("include", "/issues?page=1&level=warning");
      cy.contains("Page 1 of 2");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 10);
      cy.get("@next-button").click();

      // check page 2
      cy.url().should("include", "/issues?page=2&level=warning");
      cy.wait(["@getIssuesPage2Warning"]);
      cy.contains("Page 2 of 2");
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 2);
      cy.get("@next-button").should("have.attr", "disabled");
    });

    it('filters the issue list by "info"', () => {
      cy.get("@issueLevelFilter").select("info");

      // wait for request to resolve
      cy.wait(["@getIssuesPage1Info"]);

      // check page 1
      cy.url().should("include", "/issues?page=1&level=info");
      cy.contains("Page 1 of 1");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 4);
      cy.get("@next-button").should("have.attr", "disabled");
    });
  });
});

describe('Issue list filter, "search"', () => {
  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssuesPage1");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    }).as("getIssuesPage2");

    // request mocks for the 'project' filter
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&project=backend",
      {
        fixture: "filter/project/issues-backend-page-1.json",
      },
    ).as("getIssuesPage1Project");

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssuesPage1"]);
    cy.wait(500);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");

    // set filter option
    cy.get('[data-cy="issueProjectNameFilter"]').as("issueProjectNameFilter");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it('filters the issue list by "project"', () => {
      cy.get("@issueProjectNameFilter").type("backend{enter}");

      // wait for request to resolve
      cy.wait(["@getIssuesPage1Project"]);

      // check page 1
      cy.url().should("include", "/issues?page=1&project=backend");
      cy.contains("Page 1 of 1");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 5);
      cy.get("@next-button").should("have.attr", "disabled");
    });
  });
});

describe('Issue list filter, "level" and "status"', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssuesPage1");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    }).as("getIssuesPage2");

    // request mock for level "error" and status "open"
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&status=open&level=error",
      {
        fixture: "filter/level-status/issues-open-error-page-1.json",
      },
    ).as("getIssuesPage1ErrorOpen");

    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssuesPage1"]);
    cy.wait(500);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");

    // grab filter option
    cy.get('[data-cy="issueStatusFilter"]').as("issueStatusFilter");
    cy.get('[data-cy="issueLevelFilter"]').as("issueLevelFilter");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it('filters the issue list by "error" and "open"', () => {
      // select "error" from the level filter
      cy.get("@issueLevelFilter").select("error");
      cy.get("@issueStatusFilter").select("open");

      // wait for request to resolve
      cy.wait(["@getIssuesPage1ErrorOpen"]);

      // check page 1
      cy.url().should("include", "/issues?page=1&status=open&level=error");
      cy.contains("Page 1 of 1");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 8);
      cy.get("@next-button").should("have.attr", "disabled");
    });
  });
});

describe('Issue list filter, "level", "status" and "project"', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssuesPage1");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    }).as("getIssuesPage2");

    // request mock for level "error", status "open" and project "backend"
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&status=open&level=error&project=backend",
      {
        fixture:
          "filter/status-level-project/issues-open-error-frontend-page-1.json",
      },
    ).as("getIssuesPage1ErrorOpenBackend");

    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssuesPage1"]);
    cy.wait(500);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");

    // grab filter option
    cy.get('[data-cy="issueStatusFilter"]').as("issueStatusFilter");
    cy.get('[data-cy="issueLevelFilter"]').as("issueLevelFilter");
    cy.get('[data-cy="issueProjectNameFilter"]').as("issueProjectNameFilter");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it('filters the issue list by "error", "open" and "backend"', () => {
      // select "error" from the level filter
      cy.get("@issueLevelFilter").select("error");
      cy.get("@issueStatusFilter").select("open");
      cy.get("@issueProjectNameFilter").type("backend{enter}");

      // wait for request to resolve
      cy.wait(["@getIssuesPage1ErrorOpenBackend"]);

      // check page 1
      cy.contains("Page 1 of 1");
      cy.url().should(
        "include",
        "/issues?page=1&status=open&level=error&project=backend",
      );
      cy.get("tbody tr").should("have.length", 8);
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("@next-button").should("have.attr", "disabled");
    });
  });
});
