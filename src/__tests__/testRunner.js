import React from 'react';
import { shallow } from 'enzyme';
//{ } imports non default component
import { DropDown } from "../components/DropDown";
//
const fsLibrary = require('fs');

//
function Joe() { 
	
	
		//
		let actualValues = []
		//
		const wrapper = shallow(<DropDown list={[]} />);
		
		//
		var resultof1 = wrapper.instance().entWithContent([{"value":""},{"value":"X"}]);
		var resultof2 = wrapper.instance().entWithContent([{"value":""},{"value":""}]);
		actualValues.push({"ID": 1, "actualResult": resultof1})
		actualValues.push({"ID": 2, "actualResult": resultof2})
		console.log(JSON.stringify(actualValues) + " this is result")
		//
		const returnValuesWrapped = { results: actualValues }
		const converttoJSON = JSON.stringify(returnValuesWrapped, null, 4)
		fsLibrary.writeFile('../../reports/actualResults.json', converttoJSON, (error) => {
			
			if (error) throw error;
			
			});
		


		//


describe('DropDown Component', () => {
	it('DropDown.entWithContent(input) should return 0', () => {
		const wrapper = shallow(<DropDown list={[]} />);
		let result = wrapper.instance().entWithContent([{"value":""},{"value":""}]);
		expect(result).toBe(-1);
	});
});

}
Joe()
console.log("log after Joe")