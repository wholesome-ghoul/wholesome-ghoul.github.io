import { mount } from "@cypress/react";
import Container from "../Container";

describe("Container", () => {
  it("renders", () => {
    mount(<Container>child components</Container>);
    cy.get("div").contains("child components");
  });
});
