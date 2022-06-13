import { mount } from "@cypress/react";
import TextField from "../TextField";

describe("TextField", () => {
  it("renders", () => {
    mount(<TextField />);
  });
});

