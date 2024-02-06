import { ProjectStatus } from "@api/projects.types";
import mockProjects from "../fixtures/projects.json";

describe("project list", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];
      const statusToText = {
        [ProjectStatus.stable]: "Stable",
        [ProjectStatus.warning]: "Warning",
        [ProjectStatus.error]: "Critical",
      };

      // get all project cards
      cy.get('[data-cy="main-content-container"]')
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          const status = mockProjects[index].status as ProjectStatus;
          cy.wrap($el).contains(statusToText[status]);
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });

    describe("project list error", () => {
      beforeEach(() => {
        cy.intercept("GET", "https://prolog-api.profy.dev/project", {
          body: {},
          statusCode: 400,
        }).as("getProjectsWithError");

        cy.visit("http://localhost:3000/dashboard");
      });
      it("error message displayed on failed request", () => {
        // intercept request with error
        cy.wait("@getProjectsWithError")
          .wait("@getProjectsWithError")
          .wait("@getProjectsWithError")
          .wait("@getProjectsWithError");

        // check that error message text renders
        cy.get("main").contains(
          "There was a problem while loading the project data",
        );
      });

      it("data is successfully retrieved after inital error, data is displayed", () => {
        // intercept request with error
        cy.wait("@getProjectsWithError")
          .wait("@getProjectsWithError")
          .wait("@getProjectsWithError")
          .wait("@getProjectsWithError");

        // check that error message text renders
        cy.get("main").contains(
          "There was a problem while loading the project data",
        );

        // intercept request with data
        cy.intercept("GET", "https://prolog-api.profy.dev/project", {
          fixture: "projects.json",
        }).as("getProjects");

        cy.get("main").contains("Try again").click();

        cy.wait("@getProjects");

        // check that project list is displayed
        cy.get('[data-cy="project-list"]').find("li").should("have.length", 3);
      });
    });
  });
});
