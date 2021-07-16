import React from "react";
import { render } from "@testing-library/react-native";

import LinkRow from "../LinkRow";

describe("LinkRow component", () => {
  it("should match the snapshot", () => {
    const component = render(
      <LinkRow text={"global.media.email"} href={"mail.com"} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
