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

    // loading animation should be visible
    cy.get('[data-cy="loading-animation"]').should("be.visible");

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
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
    });

    it("persists page after reload", () => {
      cy.get("@next-button").click();
      cy.contains("Page 2 of 3");

      cy.reload();
      cy.wait(["@getProjects", "@getIssuesPage2"]);
      cy.wait(1500);
      cy.contains("Page 2 of 3");
    });
  });
});

// Issue filters tests
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
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1&open=true", {
      fixture: "status/issues-open-page-1.json",
    }).as("getIssuesPage1Open");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2&open=true", {
      fixture: "status/issues-open-page-2.json",
    }).as("getIssuesPage2Open");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3&open=true", {
      fixture: "status/issues-open-page-3.json",
    }).as("getIssuesPage3Open");

    // request mocks for resolved filter
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&resolved=true",
      {
        fixture: "status/issues-resolved-page-1.json",
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
    cy.get('[data-cy="issueLevelFilter"]').as("issueLevelFilter");
    cy.get('[data-cy="issueProjectNameFilter"]').as("issueProjectNameFilter");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it('filters the issue list by "open"', () => {
      // open the select option,
      cy.get("@issueStatusFilter").select("open");

      // wait for request to resolve
      cy.wait(["@getProjects", "@getIssuesPage1Open"]);

      // check page 1
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 10);
      cy.get("@next-button").click();

      // check page 2
      cy.wait(["@getProjects", "@getIssuesPage2Open"]);
      cy.contains("Page 2 of 3");
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 10);
      cy.get("@next-button").click();

      // check page 3
      cy.wait(["@getProjects", "@getIssuesPage3Open"]);
      cy.contains("Page 3 of 3");
      cy.get("@next-button").should("have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 2);
    });

    it('filter issue list by "resolved', () => {
      // open the select option,
      cy.get("@issueStatusFilter").select("resolved");

      // wait for request to resolve
      cy.wait(["@getProjects", "@getIssuesPage1Resolved"]);

      // check page 1
      cy.contains("Page 1 of 1");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.get("tbody tr").should("have.length", 6);
    });
  });
});
