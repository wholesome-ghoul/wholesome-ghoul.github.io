import { mount } from "@cypress/react";
import Header from "../Header";

describe("Header", () => {
  it("renders", () => {
    mount(<Header />);
  });
});

