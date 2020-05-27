import React from "react";
import "semantic-ui-react";

import { connect } from "react-redux";

class FormatDropdown extends React.Component{

    updateValue = e => {
        const valueType = e.target.value
        console.log(valueType)
    }


    render(){

        return (
            <select  onChange={this.updateValue}>
                <option value={"choose data format"} disabled selected hidden>format type</option>
                <option value={"string"}> string </option>
                <option value={"date"}> date </option>
                <option value={"measurement"}> measurement</option>                
            </select>
        );
    }
}

export default connect(null)(FormatDropdown);