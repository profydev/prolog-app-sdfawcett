import packageJSON from "../../package.json";

describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    // check that footer renders correct app version number
    it("renders app version", () => {
      cy.get('[data-cy="footer-container"]')
        .find("p")
        .contains(`Version: ${packageJSON.version}`);
    });

    // check that each link is named correctly and leads to the correct href
    it("links are working", () => {
      cy.get('[data-cy="footer-ul"]')
        .contains("Docs")
        .should("have.attr", "href", "#");

      cy.get('[data-cy="footer-ul"]')
        .contains("API")
        .should("have.attr", "href", "#");

      cy.get('[data-cy="footer-ul"]')
        .contains("Help")
        .should("have.attr", "href", "#");

      cy.get('[data-cy="footer-ul"]')
        .contains("Community")
        .should("have.attr", "href", "#");

      // check that correct number of footer links exist
      cy.get('[data-cy="footer-ul"]').find("li").should("have.length", 4);
    });

    // check that footer renders correct logo image
    it("renders logo", () => {
      cy.get('[data-cy="footer-container"]')
        .find("img")
        .should("have.attr", "src", "/icons/logo-small.svg");
    });
  });
});
