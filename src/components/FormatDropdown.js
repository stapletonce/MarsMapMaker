import React from "react";
import "semantic-ui-react";

import { connect } from "react-redux";

import { addToSizeArray } from "../actions/"

class FormatDropdown extends React.Component {

    updateValue = e => {
        let value = e.target.value
        let dex = -1

        if (value === "first") {
            dex = 0
        }
        else if (value === "second") {
            dex = 1
        }
        else {
            dex = 2
        }
        const obj = {
            header: this.props.title,
            value: this.props.mapValue,
            index: dex
        }

        this.props.addToSizeArray(obj)



    }

    // Measurement is the possible option for a size selection that doesn't have a milimeter for example...
    // Doesn't have the precision split!

    render() {

        return (
            <select onChange={this.updateValue}>
                <option value={"choose data format"} disabled selected hidden>format type</option>
                <option value={"first"}>1st in Pair </option>
                <option value={"second"}>2nd in Pair</option>

                <option value={"measurement"}>Measurement</option>
            </select>
        );

    }



}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        useOnce: state.useOnce,
        dateFormat: state.chosenDateFormat,
        hasChosen: state.hasChosenDateFormat,
        sizeArray: state.sizeArray
    };
};

export default connect(mapStateToProps, { addToSizeArray })(FormatDropdown);