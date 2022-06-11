import { mount } from "@cypress/react";
import A from "../A";

describe("A", () => {
  it("renders", () => {
    mount(<A>Click</A>);
    cy.get("a").contains("Click");
  });
});
