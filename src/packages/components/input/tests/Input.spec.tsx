import { mount } from "@cypress/react";
import Input from "../Input";

describe("Input", () => {
  it("renders", () => {
    mount(<Input value="" onChange={() => {}} />);
    cy.get("input");
  });
});
