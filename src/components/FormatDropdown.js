import React from "react";
import "semantic-ui-react";

import { connect } from "react-redux";

import { isDate } from "../actions/"

class FormatDropdown extends React.Component {

    updateValue = e => {
        // if (e.target.value === "date") {
        //     let index = this.props.id
        //     const obj = {
        //         index: this.props.id,
        //         oldValue: "",
        //         value: "",
        //         header: "",
        //     }
        //     this.props.isDate(obj)
        // }
        // else if (e.target.value === "measurement")
        console.log("hello")
    }


    render() {

        return (
            <select onChange={this.updateValue}>
                <option value={"choose data format"} disabled selected hidden>format type</option>
                <option value={"string"}> string </option>
                <option value={"date"}> date </option>
                <option value={"measurement"}> measurement</option>
            </select>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        useOnce: state.useOnce,
        dateFormat: state.chosenDateFormat,
        hasChosen: state.hasChosenDateFormat
    };
};

export default connect(mapStateToProps, { isDate })(FormatDropdown);