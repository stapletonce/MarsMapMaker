///////////////////////////////////////////////////////////////////////////////////////
// DATEDROPDOWN.JS ///////////////////////////////////////////////////////////////////
// This component displays  a checkbox on the left of each fieldCard ////////////////
// Giving the user to decide if they want to use that fieldCard in the map or not //
///////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { connect } from "react-redux";

// CSS & Styling
import "semantic-ui-react";

// Action Creators
import { formatDate } from "../actions/"

////////////////////////////////////////////////
///////////////////////////////////////////////


class DateDropdown extends React.Component {

    state = {
        currentChosen: null
    };

    // uses the clicked list-item in the dropdown to create an object to be passed into the dropdownUpdate action
    // updates specific object in the redux store
    updateValue = e => {
        const newValue = e.target.value
        let needsCenturySelection = false

        // Vets the dropdown selection of have 2 or 4 whys for the purposes of using/not using the century dropdown
        if (newValue.includes("YY") && !newValue.includes("YYYY"))
            needsCenturySelection = true

        const obj = {
            dateFormat: newValue,
            hasTwoYs: needsCenturySelection
        }
        this.props.formatDate(obj)
    }



    render() {

        let num = -1
        // helper function to list "options" based on the 'type' of field (numbers or letters...) 
        let filter = (f) => {
            num += 1
            if (num === 0)
                return <option key={num} value="Select Date Format" disabled hidden>Select Date Format</option>;
            else
                return <option key={num} value={f.title}>{f.title}</option>;
        };

        // creates the dropdown, uses filter() to specify which items are included in dropdown
        // IFF You have selected a date formate and SUCCESSFULLY selected sesar option, disable date dropdown
        console.log(this.props.hasChosenDateFormat)
        console.log(this.props.hasChosenDropdown)
        // case for loaded in js mapping file where the date is already previously selected  
        if (this.props.hasChosenDateFormat && this.props.dateFormatSelected) {
            return (
                <select defaultValue={this.props.dateFormatSelected} disabled selected className="ui search dropdown" onChange={this.updateValue}>
                    {this.props.list.map((field) => filter(field))}
                </select>
            );
        }

        else if ((this.props.hasChosenDateFormat && this.props.hasChosenDropdown)) {
            return (
                <select defaultValue={'Select Date Format'} disabled selected className="ui search dropdown" onChange={this.updateValue}>
                    {this.props.list.map((field) => filter(field))}
                </select>
            );
        }

        else {
            return (
                <select className="ui search dropdown" onChange={this.updateValue}>
                    {this.props.list.map((field) => filter(field))}
                </select>
            );
        }

    }
}

const mapStateToProps = (state) => {
    return {
        hasChosenDropdown: state.hasChosenDropdownOption,
        hasChosenDateFormat: state.hasChosenDateFormat,
        dateFormatSelected: state.chosenDateFormat
    };
};


export default connect(mapStateToProps, { formatDate })(DateDropdown);