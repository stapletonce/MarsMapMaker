import React from "react";
import { connect } from "react-redux";

// CSS & Styling
import "semantic-ui-react";

// Action Creators
import { century } from "../actions/"
///////////////////////////////////////////
///////////////////////////////////////////////////


class CenturyDropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cent: ["", "1800", "1900", "2000"]
        };
    }

    // uses the clicked list-item in the dropdown to create an object to be passed into the dropdownUpdate action
    // updates specific object in the redux store
    updateValue = e => {
        const newValue = e.target.value

        const obj = {
            chosenCentury: newValue
        }

        this.props.century(obj)

    }

    render() {

        let num = -1
        // helper function to list "options" based on the 'type' of field (numbers or letters...) 
        let filter = (f) => {
            num += 1
            if (num === 0)
                return <option key={num} value="Select Dating Century" disabled selected hidden>Select Century </option>;
            else
                return <option key={num} value={f}>{f}</option>;
        };

        // creates the dropdown, uses filter() to specify which items are included in dropdown
        if ((!this.props.hasTwoYs) ||
            (this.props.hasTwoYs && this.props.hasChosenCentury && this.props.hasChosenDropdown)
        ) {
            return (
                <select disabled className="ui search dropdown" onChange={this.updateValue}>
                    {this.state.cent.map((field) => filter(field))}
                </select>
            )
        }
        else {
            return (
                <select className="ui search dropdown" onChange={this.updateValue}>
                    {this.state.cent.map((field) => filter(field))}
                </select>
            );
        }

    }
}

const mapStateToProps = (state) => {
    return {
        hasChosenDropdown: state.hasChosenDropdownOption,
        hasChosenCentury: state.centuryChosen,
        hasTwoYs: state.hasTwoYs
    };
};


export default connect(mapStateToProps, { century })(CenturyDropDown);