import React from 'react';
import './App.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CheckboxExample from './CheckBox';
import DropDown from './DropDown';
import { removeContent } from '../actions';
const { options } = require('./sesarOptions')

class FieldCard extends React.Component {

    state = {
        sesarChosen: "",
        resetDropDown: false,
        isDate: false,
        isMeasurement: false,
        updatedValue: this.props.fieldValue,
        type: this.props.fieldType,
        key: this.props.key,
        isGreen: this.props.hasContent,
        sesarOptions: options


    }

    //static getDerivedStateFromProps(props, state) {
    //if (props.fieldValue !== state.updatedValue) {
    //return {
    //updatedValue: props.fieldValue,
    //};
    //}

    // Return null if the state hasn't changed
    //return null;
    //}


    // switch between CSS classes to switch between green and white
    btnClass = classNames({
        'field_container1': this.state.isGreen,
        'field_container2': !this.state.isGreen
    });

    // helper function to limit length of 'fieldValue' displayed in the UI
    lengthCheckedValue = (fieldVal) => {
        //console.log(fieldVal)
        let value = fieldVal;

        if (value.length > 25) {
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
            return <div className="dropDown"><DropDown refresh={this.refreshFieldCard} callback={this.fileCallback} title={this.props.fieldTitle} id={this.props.id} value={this.props.fieldValue} fieldType={this.state.type} one2one={this.getOne2One()} list={this.state.sesarOptions} /> </div>
        else
            return <div className="dropDownNoData">---</div>

    }

    // onClick of the checkmark, change the color of the bar between green and white

    fileCallback = (data, title) => {
        let currentComponent = this
        if (title === "field_name" || title === "description" || title === "sample_comment" || title === "geological_age" || title === "size") {
            if (data !== "")
                currentComponent.setState({ updatedValue: this.props.fieldTitle + ": " + data })
            else
                currentComponent.setState({ updatedValue: this.props.fieldTitle + ": NO_DATA" })
        }
        else if (title === "first") {
            currentComponent.setState({ updatedValue: data })
        }
        else {
            currentComponent.setState({ updatedValue: data })
        }

    }

    greenToggle = () => {
        let currentComponent = this
        currentComponent.setState({ isGreen: !this.state.isGreen })
        this.setState({ updatedValue: this.props.fieldValue })

        // if (this.props.pairArr[this.props.id][0].pairHeader !== "") {
        //     const sizeObj = {
        //         cardID: this.props.id,
        //         index: 0
        //     }
        //     this.props.clearSizeArray(sizeObj)
        //     const obj = {
        //         oldValue: this.props.ent[this.props.id + 1].oldValue,
        //         value: this.props.ent[this.props.id + 1].value,
        //         header: this.props.ent[this.props.id + 1].header,
        //         id: this.props.id + 1,
        //         isGreen: this.state.isGreen
        //     }
        //     this.props.removeContent(obj)

        // }

        const obj = {
            oldValue: this.props.fieldValue,
            value: this.props.fieldValue,
            header: this.props.fieldTitle,
            id: this.props.id,
            isGreen: !this.state.isGreen
        }
        this.props.removeContent(obj)
        this.setState({ isGreen: !this.state.isGreen })
        if (!this.state.isGreen) {
            this.refreshFieldCard()
        }
        this.render()
    }

    // getSizeCallback = (data) => {
    //     let currentComponent = this
    //     if (data === "size") {
    //         currentComponent.setState({ sesarChosen: data })
    //         return
    //     }
    //     else {
    //         currentComponent.setState({ sesarChosen: "meeper" })
    //     }

    // }

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


    render() {

        //these renders return different fieldcards based on the hiding toggle value

        //removes the unchecked field card
        if (this.props.hiding && this.state.isGreen === false)
            return null

        // else if ((this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== "")) {
        //     return (
        //         <div className="ui label">
        //             <div className="field_container1" >
        //                 <object className="fieldWidgetNoCheckbox">
        //                     <div className="checkBox">
        //                         <div>----</div>
        //                     </div>
        //                     <div dir="rtl" className="fieldTitle">{this.props.fieldTitle}</div>
        //                     <div className="fieldVal" >{":        " + this.lengthCheckedValue(this.props.fieldValue)}</div>
        //                 </object>
        //                 <object className="arrow">
        //                     <i className="fa fa-angle-double-right"></i>
        //                 </object>

        //                 <object className="dropDownWidget" align="right">
        //                     {((this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== "")) ?
        //                         <div className="mappedValue">{this.fieldMetricFunction(this.props.ent[this.props.id - 1].value, this.props.ent[this.props.id].value)}</div>
        //                         : <div className="mappedValue">{this.lengthCheckedValue(this.state.updatedValue)}</div>
        //                     }

        //                     {this.filterDrop()}
        //                     {((this.state.sesarChosen === "size" || (this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== ""))) ?
        //                         <object className="alignLeft" style={{ paddingLeft: "0.93em" }}>
        //                             <FormatDropdown callback={this.fileCallback} isGreen={this.state.isGreen} id={this.props.id} refresh={this.refreshFieldCard} title={this.props.fieldTitle} mapValue={this.props.fieldValue} /> </object> : <div className="padRight"></div>}
        //                 </object>

        //             </div>
        //         </div>
        //     )
        // }

        //returns the green styled field card
        else if (this.state.isGreen) {
            return (
                <div className="ui label">
                    <div className="field_container1" >
                        <object className="fieldWidget">
                            <div className="checkBox">
                                <CheckboxExample greenCallback={this.greenToggle} isChecked={this.state.isGreen} />
                            </div>
                            <div dir="rtl" className="fieldTitle">{this.props.fieldTitle}</div>
                            <div className="fieldVal" >{":        " + this.lengthCheckedValue(this.props.fieldValue)}</div>
                        </object>
                        <object className="arrow">
                            <i className="fa fa-angle-double-right"></i>
                        </object>

                        <object className="dropDownWidget" align="right">
                            <div className="mappedValue">{this.lengthCheckedValue(this.state.updatedValue)}</div>

                            {this.filterDrop()}
                            {/* {((this.state.sesarChosen === "size" || (this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== ""))) ?
                                <object className="alignLeft" style={{ paddingLeft: "0.93em" }}>
                                    <FormatDropdown callback={this.fileCallback} isGreen={this.state.isGreen} id={this.props.id} refresh={this.refreshFieldCard} title={this.props.fieldTitle} mapValue={this.props.fieldValue} /> </object> : <div className="padRight"></div>} */}
                        </object>

                    </div>
                </div>
            )
        }

        // returns the white styled field card
        else {
            return (
                <div className="ui label">
                    <div className="field_container2">
                        <object className="fieldWidget">
                            <div className="checkBox">
                                <CheckboxExample greenCallback={this.greenToggle} isChecked={this.state.isGreen} />
                            </div>
                            <div dir="rtl" className="fieldTitle">{this.props.fieldTitle}</div>
                            <div className="fieldVal" >{":        " + this.lengthCheckedValue(this.props.fieldValue)}</div>
                        </object>

                        <object className="dropDownWidget" align="right">
                            <div className="mappedValue">{this.lengthCheckedValue(this.state.updatedValue)}</div>
                            {this.filterDrop()}
                            {/* {(this.props.fieldType === "numbers" && this.state.isGreen === true) ?
                                <object className="alignLeft" style={{ paddingLeft: "0.93em" }}>
                                    <FormatDropdown isGreen={this.state.isGreen} id={this.props.id} refresh={this.refreshFieldCard} title={this.props.fieldTitle} mapValue={this.props.fieldValue} /> </object> : <div className="padRight"></div>} */}
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
        useOnce: state.useOnce,
        dateFormat: state.chosenDateFormat,
        hasChosen: state.hasChosenDateFormat,
        pairArr: state.sizeOuterArray,
        hasInit: state.hasInit,
        toggleIndex: state.toggleIndex
    };
};

export default connect(mapStateToProps, { removeContent })(FieldCard);