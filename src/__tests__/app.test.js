import React from "react";
import React from "react";
import { shallow } from "enzyme";
// { COMPONENT } does not import the connected component
import { App } from "../components/App";
import BrowserApp from "../components/BrowserApp";

describe('App Component',  () => {

  it("App should render without errors", () => {
    const wrapper = shallow(
      <BrowserApp />
    );
    const finder = wrapper.find({ testID: 'App'});
    expect(finder.length).toBe(1);
  });

});




