import React from 'react';
import { shallow } from 'enzyme'
//{ } imports non default component
import { DropDown } from "../components/DropDown";


describe('DropDown Component', () => {
	it('DropDown.entWithContent(input) should return 1', () => {
		const wrapper = shallow(<DropDown list={[]} />);
		let result = wrapper.instance().entWithContent([{"value":""},{"value":"X"}]);
		expect(result).toBe(1);
	});
});

describe('DropDown Component', () => {
	it('DropDown.entWithContent(input) should return 0', () => {
		const wrapper = shallow(<DropDown list={[]} />);
		let result = wrapper.instance().entWithContent([{"value":""},{"value":""}]);
		expect(result).toBe(-1);
	});
});

