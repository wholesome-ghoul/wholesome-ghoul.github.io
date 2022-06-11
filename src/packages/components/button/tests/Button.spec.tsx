import { mount } from "@cypress/react";
import Button from "../Button";

describe("Button", () => {
  it("renders", () => {
    mount(<Button onClick={() => {}}>Submit</Button>);
    cy.get("button").contains("Submit");
  });
});
