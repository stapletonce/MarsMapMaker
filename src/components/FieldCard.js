///////////////////////////////////////////////////////////////////////////////////////
// FIELDCARD.JS //////////////////////////////////////////////////////////////////////
// This component displays  a checkbox on the left of each fieldCard ////////////////
// Giving the user to decide if they want to use that fieldCard in the map or not //
///////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import './App.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CheckboxExample from './CheckBox';
import DropDown from './DropDown';
import { removeContent, totalMultiValueCount, forceEdit, persistingDataConcat, persistingDataUpdate } from '../actions';
import { Dropdown } from 'semantic-ui-react';
const { options } = require('./sesarOptions')

class FieldCard extends React.Component {

    state = {
        sesarChosen: "",
        dropDownChosen: false,
        resetDropDown: false,
        isDate: false,
        isMeasurement: false,
        areEditing: true,
        updatedValue: this.props.fieldValue,
        type: this.props.fieldType,
        key: this.props.key,
        isGreen: this.props.hasContent,
        sesarOptions: options,
        formattedString: "",
        index: -1
    }

    // switch between CSS classes to switch between green and white
    btnClass = classNames({
        'field_container3': this.props.addedNewField,
        'field_container1': this.state.isGreen,
        'field_container2': !this.state.isGreen,
    });

    // helper function to limit length of 'fieldValue' displayed in the UI
    lengthCheckedValue = (fieldVal) => {
        //console.log(fieldVal)
        let value = fieldVal;

        if (value === "<METADATA_ADD>") {
            value = "ADDED_CARD : " + String(this.props.id + 1)
        }

        else if (value.length > 25) {
            value = value.slice(0, 20);
            value = value + "..."
        }
        return value
    }

    getOne2One = () => {
        let arr = []
        for (let i = 0; i < this.state.sesarOptions.length; i++) {
            if (this.state.sesarOptions[i].format === "one2one")
                arr.push(this.state.sesarOptions[i].title)
        }
        return arr
    }



    // helper function to display a dropdown IFF it is also green / checked!
    // sizeCallback={this.getSizeCallback}
    filterDrop = () => {
        if (this.state.isGreen === true)
            return <div className="dropDown"><DropDown addedNew={this.props.addedNewField} refresh={this.refreshFieldCard} callback={this.fileCallback} title={this.props.fieldTitle} id={this.props.id} value={this.props.fieldValue} fieldType={this.state.type} one2one={this.getOne2One()} list={this.state.sesarOptions} /> </div>
        else
            return <div className="dropDownNoData">---</div>
    }





    // onClick of the checkmark, change the color of the bar between green and white

    fileCallback = (data, title) => {
        let currentComponent = this
        console.log(data)

        if (title === "field_name" || title === "description" || title === "sample_comment" || title === "geological_age" || title === "size") {
            if (data !== "") {

                currentComponent.setState({ updatedValue: this.props.fieldTitle + ":" + data, dropDownChosen: true, formattedString: this.multiStringOutputFunction(this.props.id, title) })

            }
            else
                currentComponent.setState({ updatedValue: this.props.fieldTitle + ":Not Provided", dropDownChosen: true })
        }

        else if (this.props.fieldValue === "") {
            currentComponent.setState({ updatedValue: "Not Provided", dropDownChosen: true, index: -1 })
        }

        else if (title === "first") {
            currentComponent.setState({ updatedValue: data, dropDownChosen: true, index: -1 })
        }
        else {
            if (this.props.ent[this.props.id].header === "<METADATA>" || this.props.ent[this.props.id].header.includes("<METADATA_ADD>")) {

                currentComponent.setState({ updatedValue: data, dropDownChosen: true, index: -1 })
            }
            else {
                currentComponent.setState({ updatedValue: data, dropDownChosen: true, index: -1 })

            }
        }
    }

    multiValuesBoolHelp = (jsFileValue) => {
        let valid = false;
        let options = ["field_name", "description", "sample_comment", "size", "geological_age"]

        for (let i = 0; i < options.length; i++) {
            if (jsFileValue === options[i]) {
                valid = true
            }
        }
        //console.log("HELPER: " + valid)
        return valid
    }

    jsFileValueToggle = () => {
        let valid = false;
        if (this.props.jsFileValues !== undefined) {
            for (let i = 0; i < this.props.jsFileValues.length; i++) {
                if ((this.props.jsFileValues[i][1] === this.props.fieldTitle) && this.multiValuesBoolHelp(this.props.jsFileValues[i][0]))
                    valid = true;
            }
        }

        //console.log("HERE: " + valid)
        return valid
    }

    greenToggle = () => {
        this.jsFileValueToggle()
        let currentComponent = this
        currentComponent.setState({
            isGreen: !this.state.isGreen,
            updatedValue: this.props.fieldValue
        })

        const obj = {
            oldValue: this.props.fieldValue,
            value: this.props.fieldValue,
            header: this.props.fieldTitle,
            id: this.props.id,
            isGreen: !this.state.isGreen
        }
        this.props.removeContent(obj)
        this.setState({ isGreen: !this.state.isGreen })
        //REMOVED TO AVOID FLICKERING UPON CLICKING USE CHECKBOX
        //if (!this.state.isGreen) {
        //this.refreshFieldCard()
        //}
        this.render()
    }



    fieldMetricFunction = (firstInPair, secondInPair) => {
        let finalProduct = parseInt(firstInPair);

        if (secondInPair !== "0") {
            let second = parseInt(secondInPair)
            finalProduct = finalProduct + second / 10
        }
        else {
            finalProduct = String(finalProduct) + ".0 cm"
            return finalProduct
        }

        finalProduct = String(finalProduct) + " cm"

        return finalProduct
    }

    refreshFieldCard = () => {
        setTimeout(() => {
            let obj = {
                oldValue: this.props.fieldCard,
                id: this.props.id,
                value: this.props.fieldValue,
                header: this.props.fieldTitle,
                isGreen: this.props.isGreen
            }
            this.setState({ isGreen: !this.state.isGreen });
            this.setState({ sesarChosen: "", updatedValue: this.props.fieldValue })
            this.props.removeContent(obj)
            //this.props.clearSingleMeasureArray(obj)
        }, 0);  // ------------------------------> timeout 0

        setTimeout(() => {
            this.setState({ isGreen: !this.state.isGreen });
        }, 10);
    };

    entMultiSizeCount = (id, title) => {
        let objects = ["field_name", "description", "sample_comment", "geological_age", "size"]
        let index;
        let count;
        if (this.props.jsFileValues === undefined)
            count = 1
        else
            count = 0

        for (let i = 0; i < this.props.ent.length; i++) {
            if (this.props.ent[i].sesarTitle === title) {
                count += 1
            }
        }
        for (let j = 0; j < objects.length; j++) {
            if (objects[j] === title)
                index = j
        }


        const obj = {
            num: count,
            ftitle: title,
            findex: index
        }
        this.props.totalMultiValueCount(obj);
        return String(count)
    }

    findMultiValueSpot = (id, title) => {
        let searchOption = ""
        let count = 1
        searchOption = title

        for (let i = 0; i < id; i++) {
            if (this.props.ent[i].sesarTitle === searchOption)
                count += 1
        }
        return String(count)
    }



    multiStringOutputFunction = (id, title) => {
        this.entMultiSizeCount(id, title);
        let valid = false;
        let objects = ["field_name", "description", "sample_comment", "geological_age", "size"]
        let index;
        for (let j = 0; j < objects.length; j++) {
            if (objects[j] === title) {
                index = j
                valid = true
            }

        }
        if (valid === false) {
            this.setState({ index: -1 })
            this.forceUpdate()
        }
        else
            this.setState({ index: index })

        let formattedString = ""
        formattedString += this.findMultiValueSpot(id, title) + " of "
        this.setState({ formattedString: formattedString })
        return formattedString


    }


    isMultiValue = (title) => {
        let objects = ["field_name", "description", "sample_comment", "geological_age", "size", "collection_start_date", "collection_end_date"]
        let valid = false
        for (let j = 0; j < objects.length; j++) {
            if (objects[j] === title)
                valid = true
        }
        return valid
    }

    areEditing = () => {
        this.setState({ areEditing: !this.state.areEditing })
    }

    forceEdit = (event) => {
        let obj = {}
        let persistentMetaData = {}

        if (event.key === 'Enter') {
            persistentMetaData = {
                index: this.props.id,
                value: this.props.ent[this.props.id].value,
                header: this.props.ent[this.props.id].header,
                forceID: this.props.persist.length,
                isMetaData: this.props.ent[this.props.id].header.includes("<METADATA>"),
                isMetaDataAdd: this.props.ent[this.props.id].header.includes("<METADATA_ADD>")
            }

            this.setState({ areEditing: !this.state.areEditing, updatedValue: event.target.value })
            if (this.props.ent[this.props.id].header.includes("<METADATA_ADD>")) {
                obj = {
                    index: this.props.id,
                    value: event.target.value,
                    header: "<METADATA_ADD>"
                }
            }
            else {
                obj = {
                    index: this.props.id,
                    value: event.target.value,
                    header: "<METADATA>"
                }
            }

            let alreadySet = false
            for (let i = 0; i < this.props.persist.length; i++) {
                if (this.props.persist[i].index === persistentMetaData.index) {
                    alreadySet = true
                    break
                }
            }

            if (alreadySet) { console.log("Header already recorded") }
            else {
                this.props.persistingDataConcat(persistentMetaData)
            }

            this.props.forceEdit(obj)
        }
    }



    render() {

        //these renders return different fieldcards based on the hiding toggle value


        //removes the unchecked field card
        if (this.props.hiding && this.state.isGreen === false)
            return null

        //returns the green styled field card
        else if (this.state.isGreen) {


            if (this.jsFileValueToggle() === true && this.state.dropDownChosen === false) {
                if (this.props.hasInit && this.props.ent[this.props.id].header === "<METADATA>") {
                    return (
                        <div className="ui label">
                            <div className="fieldContainer3" >
                                <object>
                                    <div className="check__box">
                                        <CheckboxExample greenCallback={this.greenToggle} isChecked={this.state.isGreen} />
                                    </div>
                                    <div dir="rtl" className="description__title">{this.props.fieldTitle}</div>
                                    <div className="description__value" >{":        " + this.lengthCheckedValue(this.props.fieldValue)}</div>
                                </object>
                                <object className="arrow">
                                    <i className="fa fa-angle-double-right"></i>
                                </object>
                                <object className="descriptionMapped" align="right">
                                    {(this.state.areEditing === true) ? <div className="description__mapped__content">{this.lengthCheckedValue(this.props.fieldTitle + ": " + this.props.fieldValue)}</div> :
                                        <div style={{ display: "inline-block", width: "150px", paddingRight: "10px" }} class="ui input">
                                            <input onKeyPress={this.forceEdit} style={{ display: "inline-block", width: "150px" }} type="text" placeholder="Search..." />
                                        </div>}
                                    {this.filterDrop()}{(this.state.index !== -1) ? this.state.formattedString + this.props.multiCount[this.state.index].count : ""}
                                    {(this.props.hasInit === true && this.props.ent[this.props.id].sesarTitle !== "" && this.isMultiValue(this.props.ent[this.props.id].sesarTitle) === false) ? <div style={{ paddingLeft: "10px", float: "right", display: "inline" }}>
                                        <button onClick={() => this.areEditing()} style={{ float: "right", width: "35px" }} class="ui icon button">
                                            <i class="edit outline icon"></i>
                                        </button>
                                    </div> : <div style={{ paddingLeft: "10px", float: "right", display: "inline", visibility: "hidden" }}>
                                            <button style={{ float: "right", width: "35px" }} class="ui icon button">
                                                <i class="edit outline icon"></i>
                                            </button>
                                        </div>}
                                </object>
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className="ui label">
                            <div className="fieldContainer1" >
                                <object>
                                    <div className="check__box">
                                        <CheckboxExample greenCallback={this.greenToggle} isChecked={this.state.isGreen} />
                                    </div>
                                    <div dir="rtl" className="description__title">{this.props.fieldTitle}</div>
                                    <div className="description__value" >{":        " + this.lengthCheckedValue(this.props.fieldValue)}</div>
                                </object>
                                <object className="arrow">
                                    <i className="fa fa-angle-double-right"></i>
                                </object>
                                <object className="descriptionMapped" align="right">
                                    {(this.state.areEditing === true) ? <div className="description__mapped__content">{this.lengthCheckedValue(this.props.fieldTitle + ": " + this.props.fieldValue)}</div> :
                                        <div style={{ display: "inline-block", width: "150px", paddingRight: "10px" }} class="ui input">
                                            <input onKeyPress={this.forceEdit} style={{ display: "inline-block", width: "150px" }} type="text" placeholder="Search..." />
                                        </div>}
                                    {this.filterDrop()}{(this.state.index !== -1) ? this.state.formattedString + this.props.multiCount[this.state.index].count : ""}
                                    {(this.props.hasInit === true && this.props.ent[this.props.id].sesarTitle !== "" && this.isMultiValue(this.props.ent[this.props.id].sesarTitle) === false) ? <div style={{ paddingLeft: "10px", float: "right", display: "inline" }}>
                                        <button onClick={() => this.areEditing()} style={{ float: "right", width: "35px" }} class="ui icon button">
                                            <i class="edit outline icon"></i>
                                        </button>
                                    </div> : <div style={{ paddingLeft: "10px", float: "right", display: "inline", visibility: "hidden" }}>
                                            <button style={{ float: "right", width: "35px" }} class="ui icon button">
                                                <i class="edit outline icon"></i>
                                            </button>
                                        </div>}
                                </object>
                            </div>
                        </div>
                    )
                }

            }
            else if (this.props.hasInit && this.props.ent[this.props.id].header === "<METADATA>") {
                return (
                    <div className="ui label">
                        <div className="fieldContainer4" >
                            <object>
                                <div className="check__box">
                                    <CheckboxExample greenCallback={this.greenToggle} isChecked={this.state.isGreen} />
                                </div>
                                <div dir="rtl" className="description__title">{this.props.fieldTitle}</div>
                                <div className="description__value" >{":        " + this.lengthCheckedValue(this.props.fieldValue)}</div>
                            </object>
                            <object className="arrow">
                                <i className="fa fa-angle-double-right"></i>
                            </object>
                            <object className="descriptionMapped" align="right">
                                {(this.props.hasInit === true && this.state.areEditing === true) ? <div className="description__mapped__content">{this.lengthCheckedValue(this.state.updatedValue)}</div> :
                                    <div style={{ display: "inline-block", width: "150px", paddingRight: "10px" }} class="ui input">
                                        <input onKeyPress={this.forceEdit} style={{ display: "inline-block", width: "150px" }} type="text" placeholder="Search..." />
                                    </div>}

                                {this.filterDrop()}
                                {(this.props.hasInit === true && this.props.ent[this.props.id].sesarTitle !== "" && this.isMultiValue(this.props.ent[this.props.id].sesarTitle) === false) ? <div style={{ paddingLeft: "10px", float: "right", display: "inline" }}>
                                    <button onClick={() => this.areEditing()} style={{ float: "right", width: "35px" }} class="ui icon button">
                                        <i class="edit outline icon"></i>
                                    </button>
                                </div> : <div style={{ paddingLeft: "10px", float: "right", display: "inline", visibility: "hidden" }}>
                                        <button style={{ float: "right", width: "35px" }} class="ui icon button">
                                            <i class="edit outline icon"></i>
                                        </button>
                                    </div>}
                                <div>{(this.state.index !== -1) ? this.state.formattedString + this.props.multiCount[this.state.index].count : ""}</div>
                                {/* {this.props.hasInit ?
                                        <div>
                                            {this.findMultiValueSpot(this.props.id, this.props.ent[this.props.id].sesarTitle) + " of " + this.props.totalMulti[this.findObject(this.props.ent[this.props.id].sesarTitle)].count}
                                        </div> :
                                        <div></div>
                                    } */}

                            </object>

                        </div>
                    </div>
                )
            }
            else {
                if (this.props.hasInit && this.props.ent[this.props.id].header.includes("<METADATA_ADD>")) {
                    return (
                        <div className="ui label">
                            <div className="fieldContainer3" >
                                <object>
                                    <div className="check__box">
                                        <CheckboxExample greenCallback={this.greenToggle} isChecked={this.state.isGreen} />
                                    </div>
                                    <div dir="rtl" className="description__title">{"ADDED_CARD"}</div>
                                    <div className="description__value" >{":        " + String(this.props.id + 1)}</div>
                                </object>
                                <object className="arrow">
                                    <i className="fa fa-angle-double-right"></i>
                                </object>
                                <object className="descriptionMapped" align="right">
                                    {(this.props.hasInit === true && this.state.areEditing === true) ? <div className="description__mapped__content">{this.lengthCheckedValue(this.state.updatedValue)}</div> :
                                        <div style={{ display: "inline-block", width: "150px", paddingRight: "10px" }} class="ui input">
                                            <input onKeyPress={this.forceEdit} style={{ display: "inline-block", width: "150px" }} type="text" placeholder="Search..." />
                                        </div>}

                                    {this.filterDrop()}
                                    {(this.props.hasInit === true && this.props.ent[this.props.id].sesarTitle !== "" && this.isMultiValue(this.props.ent[this.props.id].sesarTitle) === false) ? <div style={{ paddingLeft: "10px", float: "right", display: "inline" }}>
                                        <button onClick={() => this.areEditing()} style={{ float: "right", width: "35px" }} class="ui icon button">
                                            <i class="edit outline icon"></i>
                                        </button>
                                    </div> : <div style={{ paddingLeft: "10px", float: "right", display: "inline", visibility: "hidden" }}>
                                            <button style={{ float: "right", width: "35px" }} class="ui icon button">
                                                <i class="edit outline icon"></i>
                                            </button>
                                        </div>}
                                    <div>{(this.state.index !== -1) ? this.state.formattedString + this.props.multiCount[this.state.index].count : ""}</div>
                                    {/* {this.props.hasInit ?
                                        <div>
                                            {this.findMultiValueSpot(this.props.id, this.props.ent[this.props.id].sesarTitle) + " of " + this.props.totalMulti[this.findObject(this.props.ent[this.props.id].sesarTitle)].count}
                                        </div> :
                                        <div></div>
                                    } */}

                                </object>

                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className="ui label">
                            <div className="fieldContainer1" >
                                <object>
                                    <div className="check__box">
                                        <CheckboxExample greenCallback={this.greenToggle} isChecked={this.state.isGreen} />
                                    </div>
                                    <div dir="rtl" className="description__title">{this.props.fieldTitle}</div>
                                    <div className="description__value" >{":        " + this.lengthCheckedValue(this.props.fieldValue)}</div>
                                </object>
                                <object className="arrow">
                                    <i className="fa fa-angle-double-right"></i>
                                </object>
                                <object className="descriptionMapped" align="right">
                                    {(this.props.hasInit === true && this.state.areEditing === true) ? <div className="description__mapped__content">{this.lengthCheckedValue(this.state.updatedValue)}</div> :
                                        <div style={{ display: "inline-block", width: "150px", paddingRight: "10px" }} class="ui input">
                                            <input onKeyPress={this.forceEdit} style={{ display: "inline-block", width: "150px" }} type="text" placeholder="Search..." />
                                        </div>}

                                    {this.filterDrop()}
                                    {(this.props.hasInit === true && this.props.ent[this.props.id].sesarTitle !== "" && this.isMultiValue(this.props.ent[this.props.id].sesarTitle) === false) ? <div style={{ paddingLeft: "10px", float: "right", display: "inline" }}>
                                        <button onClick={() => this.areEditing()} style={{ float: "right", width: "35px" }} class="ui icon button">
                                            <i class="edit outline icon"></i>
                                        </button>
                                    </div> : <div style={{ paddingLeft: "10px", float: "right", display: "inline", visibility: "hidden" }}>
                                            <button style={{ float: "right", width: "35px" }} class="ui icon button">
                                                <i class="edit outline icon"></i>
                                            </button>
                                        </div>}
                                    <div>{(this.state.index !== -1) ? this.state.formattedString + this.props.multiCount[this.state.index].count : ""}</div>
                                    {/* {this.props.hasInit ?
                                        <div>
                                            {this.findMultiValueSpot(this.props.id, this.props.ent[this.props.id].sesarTitle) + " of " + this.props.totalMulti[this.findObject(this.props.ent[this.props.id].sesarTitle)].count}
                                        </div> :
                                        <div></div>
                                    } */}

                                </object>

                            </div>
                        </div>
                    )
                }

            }
        }

        // returns the white styled field card
        else {
            return (
                <div className="ui label">
                    <div className="fieldContainer2">
                        <object>
                            <div className="check__box">
                                <CheckboxExample greenCallback={this.greenToggle} isChecked={this.state.isGreen} />
                            </div>
                            <div dir="rtl" className="description__title">{this.props.fieldTitle}</div>
                            <div className="description__value" >{":        " + this.lengthCheckedValue(this.props.fieldValue)}</div>
                        </object>
                        <object className="descriptionMapped" align="right">
                            <div className="description__mapped__content">{this.lengthCheckedValue(this.state.updatedValue)}</div>
                            {this.filterDrop()}{(this.state.index !== -1) ? this.state.formattedString + this.props.multiCount[this.state.index].count : ""}

                        </object>
                    </div>
                </div>
            )
        }
    };
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        persist: state.persistingMetaData,
        useOnce: state.useOnce,
        dateFormat: state.chosenDateFormat,
        hasChosen: state.hasChosenDateFormat,
        pairArr: state.sizeOuterArray,
        hasInit: state.hasInit,
        toggleIndex: state.toggleIndex,
        totalMulti: state.totalMultiCount,
        toggleArray: state.toggleArr
    };
};
// hello robert
export default connect(mapStateToProps, { forceEdit, removeContent, totalMultiValueCount, persistingDataConcat, persistingDataUpdate })(FieldCard);