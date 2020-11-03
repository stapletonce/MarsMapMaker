import React from 'react';
import { shallow } from 'enzyme'
//{ } imports non default component
import { DropDown } from "../components/DropDown";

const fsLibrary = require('fs');

let actualValues = []

const wrapper = shallow(<DropDown list={[]} />);

let resultOf1 = wrapper.instance().entWithContent([{"value":""},{"value":"X"}]);
actualValues.push({ "ID": 1, "actualResult": resultOf1});

let resultOf2 = wrapper.instance().entWithContent([{"value":""},{"value":""}]);
actualValues.push({ "ID": 2, "actualResult": resultOf2});

let resultOf3 = wrapper.instance().entWithContent(2);
actualValues.push({ "ID": 3, "actualResult": resultOf3});

let resultOf4 = wrapper.instance().entWithContent(3.14);
actualValues.push({ "ID": 4, "actualResult": resultOf4});

let resultOf5 = wrapper.instance().entWithContent("cat");
actualValues.push({ "ID": 5, "actualResult": resultOf5});


const returnValuesWrapped = { results: actualValues }
const converttoJSON = JSON.stringify(returnValuesWrapped, null, 4)
fsLibrary.writeFile('../../reports/actualResults.json', converttoJSON, (error) => {
	if (error) throw error;
});

describe('dummy', () => {
	it('0 to be 0', () => {
		expect(0).toBe(0);});});
