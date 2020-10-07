import React from "react";
import { shallow } from "enzyme";
// { COMPONENT } does not import the connected component
import { App } from "../components/App";
import { File } from "../components/FileIn";

describe('FileIn Component',  () => {

    it("FileIn should render without errors", () => {
        const wrapper = shallow(
        <App />
      );
      const finder = wrapper.find({ testID: 'FileIn'});
      expect(finder.length).toBe(1);
    });
  
});
  