import React from "react";
import "semantic-ui-react";

import { connect } from "react-redux";

import { addToSizeArray } from "../actions/"

class FormatDropdown extends React.Component {

    sizeArrayLoop = () => {
        let count = 0;
        for (let i = 0; i < this.props.ent.length; i++) {
            if (this.props.ent[i].sesarTitle === "size")
                count += 1
        }
        return count
    }

    updateValue = e => {
        let value = e.target.value
        let dex = -1
        if (this.props.mapValue !== "") {
            if (value === "first") {
                dex = 0
                if (this.props.sizeArray[2].pairHeader !== "") {
                    alert("You've already selected another size option as a single measurement! You can either have a pair, or a single measurement")
                    this.props.refresh()
                    return
                }
            }
            else if (value === "second") {
                dex = 1
                if (this.props.sizeArray[2].pairHeader !== "") {
                    alert("You've already selected another size option as a single measurement! You can either have a pair, or a single measurement")
                    this.props.refresh()
                    return
                }
            }
            else {
                dex = 2
                if (this.props.sizeArray[0].pairHeader !== "" || this.props.sizeArray[1].pairHeader !== "") {
                    alert("You've already selected another size option as a pair! You can either have a pair, or a single measurement")
                    this.props.refresh()
                    return
                }
            }
            const obj = {
                header: this.props.title,
                value: this.props.mapValue,
                index: dex
            }

            this.props.addToSizeArray(obj)
        }

        const obj = {
            header: this.props.title,
            value: "---noData--",
            index: dex
        }

        this.props.addToSizeArray(obj)





    }


    // Measurement is the possible option for a size selection that doesn't have a milimeter for example...
    // Doesn't have the precision split!

    render() {
        if ((this.props.sizeArray[2].pairHeader !== "" && this.props.ent[this.props.id].sesarTitle === "size" && this.sizeArrayLoop() === 1) ||
            ((this.sizeArrayLoop() === 2 && this.props.ent[this.props.id].sesarTitle === "size" && this.props.sizeArray[1].pairHeader !== "") &&
                (this.sizeArrayLoop() === 2 && this.props.ent[this.props.id].sesarTitle === "size" && this.props.sizeArray[0].pairHeader !== ""))
        ) {
            return (
                <select disabled onChange={this.updateValue}>
                    <option value={"choose data format"} disabled selected hidden>format type</option>
                    <option value={"first"}>1st in Pair </option>
                    <option value={"second"}>2nd in Pair</option>
                    <option value={"measurement"}>Measurement</option>
                </select>
            );
        }
        else {
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