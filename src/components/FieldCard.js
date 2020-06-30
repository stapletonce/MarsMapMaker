import React from 'react';
import './App.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CheckboxExample from './CheckBox';
import DropDown from './DropDown';
import FormatDropdown from './FormatDropdown';
import { removeContent, clearSizeArray } from '../actions';


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
        sesarOptions: [
            {
                selected: false,
                id: 0,
                title: "",
                key: "field",
                type: "both",
                message: "Name of institution",
                format: "none"
            },
            {
                selected: false,
                id: 1,
                title: "original_archive",
                key: "field",
                type: "text",
                message: "Name of institution",
                format: "one2one"
            },
            {
                selected: false,
                id: 2,
                title: "current_archive",
                key: "field",
                type: "text",
                format: "one2one"
            },
            {
                selected: false,
                id: 3,
                title: "platform_name",
                key: "field",
                type: "text",
                format: "one2one"
            },
            {
                selected: false,
                id: 4,
                title: "cruise_field_prgrm",
                key: "field",
                type: "text",
                message: "Name or identifier of the field program during which the sample was collected.",
                format: "one2one",
            },
            {
                selected: false,
                id: 5,
                title: "name",
                key: "field",
                type: "text",
                message: "The Name of the sample.",
                format: "one2one"
            },
            {
                selected: false,
                id: 6,
                title: "collection_method",
                key: "field",
                type: "text",
                message: "Method by which the sample was collected",
                format: "one2one"
            },
            {
                selected: false,
                id: 7,
                title: "collection_start_date",
                key: "field",
                type: "numbers",
                message: "Date when the sample was collected. The format is YYYY-MM-DDTHH:MM:SSZ",
                format: "one2one"
            },
            {
                selected: false,
                id: 8,
                title: "collection_end_date",
                key: "field",
                type: "numbers",
                message: "Date when the sample collection was finished",
                format: "one2one"
            },
            {
                selected: false,
                id: 9,
                title: "latitude",
                key: "numbers",
                message: "Latitude of the location where the sample was collected. (Start latitude for linear sampling features)",
                format: "one2one"
            },
            {
                selected: false,
                id: 10,
                title: "latitude_end",
                key: "numbers",
                message: "End latitude of the location where the sample was collected (WGS84)",
                format: "one2one"
            },
            {
                selected: false,
                id: 11,
                title: "longitude",
                key: "numbers",
                message: "Longitude of the location where the sample was collected. (Start longitude for linear sampling features)",
                format: "one2one"
            },
            {
                selected: false,
                id: 12,
                title: "longitude_end",
                key: "numbers",
                message: "End longitude of the location where the sample was collected (WGS84)",
                format: "one2one"
            },
            {
                selected: false,
                id: 13,
                title: "elevation",
                key: "numbers",
                message: "Elevation at which a sample was collected (in meters). Use negative values for depth below sea level",
                format: "one2one"
            },
            {
                selected: false,
                id: 14,
                title: "elevation_end",
                key: "numbers",
                message: "End elevation at which a sample was collected",
                format: "one2one"
            },
            {
                selected: false,
                id: 15,
                title: "size",
                message: "Size of the registered object",
                type: "numbers",
                format: "two2oneMeasurement"
            },

            {
                selected: false,
                id: 17,
                title: "collector",
                key: "field",
                type: "text",
                message: "Name of the person who collected the sample or name of chief scientist for larger field programs",
                format: "one2one"
            },
            {
                selected: false,
                id: 18,
                title: "primary_location_type",
                key: "field",
                type: "text",
                message: "Physiographic feature or type of feture that your sample was collected from",
                format: "one2one"
            },
            {
                selected: false,
                id: 19,
                title: "igsn",
                key: "field",
                type: "numbers",
                message: "(AUTOMATIC) The 9-digit IGSN of the sample",
                format: "one2one"
            },
            {
                selected: false,
                id: 20,
                title: "sample_comment",
                key: "field",
                type: "text",
                message: "Any free 'text' comment about the sample",
                format: "multivalue"
            },
            {
                selected: false,
                id: 21,
                title: "latitude",
                type: "numbers",
                key: "field",
                format: "one2one"
            },
            {
                selected: false,
                id: 22,
                title: "description",
                type: "text",
                key: "field",
                format: "multivalue"
            },
            {
                selected: false,
                id: 23,
                title: "geological_age",
                key: "field",
                type: "numbers",
                message: "Age of a sample as described by the stratigraphic era",
                format: "multivalue"
            },
            {
                selected: false,
                id: 26,
                title: "classification",
                key: "field",
                type: "text",
                message: "Classification",
                format: "one2one"
            },
            {
                selected: false,
                id: 27,
                title: "sample_type",
                key: "field",
                type: "text",
                message: "The type of sample which comes from a SESAR controlled list",
                format: "one2one"
            },
            {
                selected: false,
                id: 28,
                title: "latitude_end",
                key: "field",
                type: "numbers",
                message: "Ending Longitude",
                format: "one2one"
            },
            {
                selected: false,
                id: 29,
                title: "longitude",
                key: "field",
                type: "numbers",
                message: "Longitude",
                format: "one2one"
            },
            {
                selected: false,
                id: 30,
                title: "longitude_end",
                key: "field",
                type: "numbers",
                message: "Ending Longitude",
                format: "one2one"
            },
            {
                selected: false,
                id: 31,
                title: "elevation",
                key: "field",
                type: "numbers",
                message: "Water Depth",
                format: "one2one"
            },
            {
                selected: false,
                id: 32,
                title: "elevation_end",
                key: "field",
                type: "numbers",
                message: "Ending Water Depth",
                format: "one2one"
            },
            {
                selected: false,
                id: 32,
                title: "field_name",
                key: "field",
                type: "text",
                message: "Keyed List / Order Pair of Values (Ex: [FACILITY CODE: MARS])",
                format: "multivalue"
            }

        ]


    }


    // switch between CSS classes to switch between green and white
    btnClass = classNames({
        'field_container1': this.state.isGreen,
        'field_container2': !this.state.isGreen
    });

    // helper function to limit length of 'fieldValue' displayed in the UI
    lengthCheckedValue = (fieldVal) => {


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
    filterDrop = () => {
        if (this.state.isGreen === true)
            return <div className="dropDown"><DropDown sizeCallback={this.getSizeCallback} refresh={this.refreshFieldCard} callback={this.fileCallback} title={this.props.fieldTitle} id={this.props.id} value={this.props.fieldValue} fieldType={this.state.type} one2one={this.getOne2One()} list={this.state.sesarOptions} /> </div>
        else
            return <div className="dropDownNoData">---</div>

    }



    // onClick of the checkmark, change the color of the bar between green and white

    fileCallback = (data, title) => {
        let currentComponent = this
        if (title === "field_name" || title === "description" || title === "sample_comment" || title === "geological_age") {
            if (data !== "")
                currentComponent.setState({ updatedValue: this.props.fieldTitle + ": " + data })
            else
                currentComponent.setState({ updatedValue: this.props.fieldTitle + ": NO_DATA" })
        }
        else if (title === "first") {
            currentComponent.setState({ updateValue: data })
        }
        else {
            currentComponent.setState({ updatedValue: data })
        }

    }

    greenToggle = () => {
        let currentComponent = this
        currentComponent.setState({ isGreen: !this.state.isGreen })
        this.setState({ updatedValue: this.props.fieldValue })

        if (this.props.pairArr[this.props.id][0].pairHeader !== "") {
            const sizeObj = {
                cardID: this.props.id,
                index: 0
            }
            this.props.clearSizeArray(sizeObj)
            const obj = {
                oldValue: this.props.ent[this.props.id + 1].oldValue,
                value: this.props.ent[this.props.id + 1].value,
                header: this.props.ent[this.props.id + 1].header,
                id: this.props.id + 1,
                isGreen: this.state.isGreen
            }
            this.props.removeContent(obj)

        }

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

    getSizeCallback = (data) => {
        let currentComponent = this
        if (data === "size") {
            currentComponent.setState({ sesarChosen: data })
            return
        }
        else {
            currentComponent.setState({ sesarChosen: "meeper" })
        }

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
            this.setState({ isGreen: !this.state.isGreen });
            this.setState({ sesarChosen: "" })
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

        else if ((this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== "")) {
            return (
                <div className="ui label">
                    <div className="field_container1" >
                        <object className="fieldWidgetNoCheckbox">
                            <div className="checkBox">
                                <div>----</div>
                            </div>
                            <div dir="rtl" className="fieldTitle">{this.props.fieldTitle}</div>
                            <div className="fieldVal" >{":        " + this.lengthCheckedValue(this.props.fieldValue)}</div>
                        </object>
                        <object className="arrow">
                            <i className="fa fa-angle-double-right"></i>
                        </object>

                        <object className="dropDownWidget" align="right">
                            {((this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== "")) ?
                                <div className="mappedValue">{this.fieldMetricFunction(this.props.ent[this.props.id - 1].value, this.props.ent[this.props.id].value)}</div>
                                : <div className="mappedValue">{this.lengthCheckedValue(this.state.updatedValue)}</div>
                            }

                            {this.filterDrop()}
                            {((this.state.sesarChosen === "size" || (this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== ""))) ?
                                <object className="alignLeft" style={{ paddingLeft: "0.93em" }}>
                                    <FormatDropdown callback={this.fileCallback} isGreen={this.state.isGreen} id={this.props.id} refresh={this.refreshFieldCard} title={this.props.fieldTitle} mapValue={this.props.fieldValue} /> </object> : <div className="padRight"></div>}
                        </object>

                    </div>
                </div>
            )
        }

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
                            {((this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== "")) ?
                                <div className="mappedValue">{this.fieldMetricFunction(this.props.ent[this.props.id - 1].value, this.props.ent[this.props.id].value)}</div>
                                : <div className="mappedValue">{this.lengthCheckedValue(this.state.updatedValue)}</div>
                            }
                            {this.filterDrop()}
                            {((this.state.sesarChosen === "size" || (this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== ""))) ?
                                <object className="alignLeft" style={{ paddingLeft: "0.93em" }}>
                                    <FormatDropdown callback={this.fileCallback} isGreen={this.state.isGreen} id={this.props.id} refresh={this.refreshFieldCard} title={this.props.fieldTitle} mapValue={this.props.fieldValue} /> </object> : <div className="padRight"></div>}
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
                            {(this.props.fieldType === "numbers" && this.state.isGreen === true) ?
                                <object className="alignLeft" style={{ paddingLeft: "0.93em" }}>
                                    <FormatDropdown isGreen={this.state.isGreen} id={this.props.id} refresh={this.refreshFieldCard} title={this.props.fieldTitle} mapValue={this.props.fieldValue} /> </object> : <div className="padRight"></div>}
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

export default connect(mapStateToProps, { removeContent, clearSizeArray })(FieldCard);