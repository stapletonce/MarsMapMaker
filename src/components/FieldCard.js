import React from 'react';
import './App.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CheckboxExample from './CheckBox';
import DropDown from './DropDown';
import FormatDropdown from './FormatDropdown';

class FieldCard extends React.Component {

    state = {
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
                title: "current archive",
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
                format: "dateFormat"
            },
            {
                selected: false,
                id: 8,
                title: "collection_end_date",
                key: "field",
                type: "numbers",
                message: "Date when the sample collection was finished",
                format: "dateFormat"
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
                format: "conversion"
            },
            {
                selected: false,
                id: 16,
                title: "size_unit CM IS COMMON",
                type: "numbers",
                format: "one2one"
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
                format: "one2one"
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
                title: "sample description",
                type: "text",
                key: "field",
                format: "one2one"
            },
            {
                selected: false,
                id: 23,
                title: "geological_age",
                key: "field",
                type: "numbers",
                message: "Age of a sample as described by the stratigraphic era",
                format: "one2one"
            },
            {
                selected: false,
                id: 24,
                title: "age (min)MA",
                key: "field",
                type: "numbers",
                format: "one2one"
            },
            {
                selected: false,
                id: 25,
                title: "age (max)MA",
                key: "field",
                type: "numbers",
                format: "one2one"
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
                format: "one2one"
            }

        ]

    }

    // onClick of the checkmark, change the color of the bar between green and white
    changeColor = () => {
        this.setState({ isGreen: !this.state.isGreen })
        this.render()
    }


    render() {

        let btnClass;

        // switch between CSS classes to switch between green and white
        btnClass = classNames({
            'field_container1': this.state.isGreen,
            'field_container2': !this.state.isGreen
        });

        // helper function to limit length of 'fieldValue' displayed in the UI
        const lengthCheckedValue = () => {
            let value = this.props.fieldValue;

            if (value.length > 35) {
                value = value.slice(0, 35);
                value = value + "..."
            }
            return value
        }

        const getOne2One = () => {
            let arr = []
            for (let i = 0; i < this.state.sesarOptions.length; i++) {
                if (this.state.sesarOptions[i].format === "one2one")
                    arr.push(this.state.sesarOptions[i].title)
            }
            return arr

        }


        // helper function to display a dropdown IFF it is also green / checked!
        const filterDrop = () => {
            if (this.state.isGreen === true)
                return <div className="dropDown"><DropDown title={this.props.fieldTitle} id={this.props.id} value={this.props.fieldValue} fieldType={this.props.fieldType} one2one={getOne2One()} list={this.state.sesarOptions} /> </div>
            else
                return <div className="dropDownNoData">---</div>

        }

        // display all fieldCards with or without data when toggle is turned 'off'
        // display only checked fieldCards with toggle is switched 'on' 
        if (this.props.hiding === true && this.state.isGreen === false)
            return null
        else if (this.props.hiding)
            return (
                <div className="ui label">
                    <div className={btnClass}>
                        <object className="fieldWidget">
                            <div dir="rtl" className="fieldTitle">{this.props.fieldTitle}</div>
                            <i className="fa fa-grip-lines-vertical"></i>
                            <div className="fieldVal" >{"|        " + lengthCheckedValue()}</div>
                        </object>
                        <object className="dropDownWidget" align="right">
                            <div className="mappedValue">{lengthCheckedValue()}</div>
                            {filterDrop()}
                            {(this.props.fieldType === "numbers") ?
                            <FormatDropdown title={this.props.fieldTitle} mapValue={this.props.fieldValue} /> : null}
                        </object>
                    </div>
                </div>
            )
        else
            return (
                <div className="ui label">
                    <div className={btnClass}>
                        <object className="fieldWidget">
                            <div className="checkBox" onClick={this.changeColor.bind(this)}>
                                <CheckboxExample isChecked={this.state.isGreen} />
                            </div>
                            <div dir="rtl" className="fieldTitle">{this.props.fieldTitle}</div>
                            <i className="fa fa-grip-lines-vertical"></i>
                            <div className="fieldVal" >{"|        " + lengthCheckedValue()}</div>
                        </object>
                        <object className="dropDownWidget" align="right">
                            <div className="mappedValue">{lengthCheckedValue()}</div>
                            {filterDrop()}
                            {(this.props.fieldType === "numbers") ?
                            <FormatDropdown title={this.props.fieldTitle} mapValue={this.props.fieldValue} /> : null}
                        </object>
                        
                    </div>
                </div>
            )
    };
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        useOnce: state.useOnce,
        dateFormat: state.chosenDateFormat,
        hasChosen: state.hasChosenDateFormat
    };
};

export default connect(mapStateToProps)(FieldCard);