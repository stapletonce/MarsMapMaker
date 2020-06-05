import React from "react";
import { connect } from "react-redux";

// CSS & Styling
import "semantic-ui-react";

// Action Creators
import { addToSizeArray, clearSizeArray, addSingleMeasure } from "../actions/"

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
        let sizeArray = this.props.sizeArray

        // If "First in Pair" is selected
        if (value === "first") {
            dex = 0



        }


        // If "Measurment" is selected 
        else {
            dex = 2

            if (((sizeArray[2].currentID !== this.props.id && sizeArray[2].currentID !== -1) && (sizeArray[0].pairHeader !== "" || sizeArray[1].pairHeader !== "")) ||
                (sizeArray[2].pairHeader !== "" && sizeArray[2].currentID !== this.props.id) ||
                (sizeArray[0].pairHeader !== "" && sizeArray[0].currentID !== this.props.id) || (sizeArray[1].pairHeader !== "" && sizeArray[1].currentID !== this.props.id)
            ) {
                alert("You have already selected a pair, you cannot also use a single measurement!")
                this.props.refresh();
                return
            }
            if (this.props.sizeArray[0].pairHeader !== "") {
                let obj = { id: 0 }
                this.props.clearSizeArray(obj)
            }
            else if (this.props.sizeArray[1].pairHeader !== "") {
                let obj = { id: 1 }
                this.props.clearSizeArray(obj)
            }
        }
        if (value === "first") {
            const obj = {
                header: this.props.title,
                value: this.props.mapValue,
                index: dex,
                cardID: this.props.id,

                nextHeader: this.props.ent[this.props.id + 1].header,
                nextValue: this.props.ent[this.props.id + 1].value,
                nextID: this.props.id + 1
            }
            this.props.addToSizeArray(obj)
        } else {
            const obj = {
                header: this.props.title,
                value: this.props.mapValue,
                cardID: this.props.id
            }
            this.props.addSingleMeasure(obj)
        }


    }

    render() {
        /*
        if (
            (((this.sizeArrayLoop() === 2 && this.props.ent[this.props.id].sesarTitle === "size" && this.props.sizeArray[1].pairHeader !== "") &&
                (this.sizeArrayLoop() === 2 && this.props.ent[this.props.id].sesarTitle === "size" && this.props.sizeArray[0].pairHeader !== "")) ||
                (this.sizeArrayLoop() === 1 && this.props.sizeArray[2].pairHeader !== "")
            )
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
        */

        if (this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== "") {
            return (
                <select onChange={this.updateValue}>
                    <option value={"choose data format"} disabled hidden>format type</option>
                    <option value={"first"} disabled >1st in Pair </option>
                    <option value={"second"} disabled selected>  2nd in Pair</option>
                    <option value={"measurement"} disabled >Measurement</option>
                </select>
            );

        }
        else {
            return (
                <select onChange={this.updateValue}>
                    <option value={"choose data format"} disabled selected hidden>format type</option>
                    <option value={"first"}>1st in Pair </option>
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
        sizeArray: state.sizeArray,
        pairArr: state.sizeOuterArray,
        hasInit: state.hasInit
    };
};

export default connect(mapStateToProps, { addToSizeArray, clearSizeArray, addSingleMeasure })(FormatDropdown);