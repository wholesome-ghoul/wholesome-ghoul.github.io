import { mount } from "@cypress/react";
import Iframe from "../Iframe";

describe("Iframe", () => {
  it("renders", () => {
    mount(<Iframe src=""></Iframe>);
  });
});
