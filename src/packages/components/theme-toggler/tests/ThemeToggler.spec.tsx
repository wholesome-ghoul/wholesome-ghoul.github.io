import { mount } from "@cypress/react";
import ThemeToggler from "../ThemeToggler";

describe("ThemeToggler", () => {
  it("renders", () => {
    mount(<ThemeToggler size="small" />);
  });
});
