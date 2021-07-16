import React from "react";
import { render } from "@testing-library/react-native";

import SectionHeader from "../SectionHeader";

describe("SectionHeader component", () => {
  it("should match the snapshot", () => {
    const component = render(
      <SectionHeader iconName={"io-copy"} title={"global.id"} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
