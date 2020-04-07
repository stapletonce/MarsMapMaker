import React from 'react';
import './App.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CheckboxExample from './CheckBox'
import DropDown from './DropDown'
import { selectedField } from '../actions'
import rtl from '../../node_modules/jss-rtl'

class FieldCard extends React.Component {

    state = {
        isGreen: this.props.hasContent,
        sesarOptions: [
            {
                selected: false,
                id: 0,
                title: "no_data",
                key: "field",
                message: "Name of institution",
                format: "one2one"
            },
            {
                selected: false,
                id: 1,
                title: "original_archive",
                key: "field",
                message: "Name of institution",
                format: "one2one"
            },
            {
                selected: false,
                id: 2,
                title: "current archive",
                key: "field",
                format: "one2one"
            },
            {
                selected: false,
                id: 3,
                title: "platform_name",
                key: "field",
                format: "one2one"
            },
            {
                selected: false,
                id: 4,
                title: "cruise_field_prgrm",
                key: "field",
                message: "Name or identifier of the field program during which the sample was collected.",
                format: "one2one",
            },
            {
                selected: false,
                id: 5,
                title: "name",
                key: "field",
                message: "The Name of the sample.",
                format: "one2one"
            },
            {
                selected: false,
                id: 6,
                title: "collection_method",
                key: "field",
                message: "Method by which the sample was collected",
                format: "one2one"
            },
            {
                selected: false,
                id: 7,
                title: "collection_start_date",
                key: "field",
                message: "Date when the sample was collected. The format is YYYY-MM-DDTHH:MM:SSZ",
                format: "dateFormat"
            },
            {
                selected: false,
                id: 8,
                title: "collection_end_date",
                key: "field",
                message: "Date when the sample collection was finished",
                format: "dateFormat"
            },
            {
                selected: false,
                id: 9,
                title: "latitude",
                key: "field",
                message: "Latitude of the location where the sample was collected. (Start latitude for linear sampling features)",
                format: "one2one"
            },
            {
                selected: false,
                id: 10,
                title: "latitude_end",
                key: "field",
                message: "End latitude of the location where the sample was collected (WGS84)",
                format: "one2one"
            },
            {
                selected: false,
                id: 11,
                title: "longitude",
                key: "field",
                message: "Longitude of the location where the sample was collected. (Start longitude for linear sampling features)",
                format: "one2one"
            },
            {
                selected: false,
                id: 12,
                title: "longitude_end",
                key: "field",
                message: "End longitude of the location where the sample was collected (WGS84)",
                format: "one2one"
            },
            {
                selected: false,
                id: 13,
                title: "elevation",
                key: "field",
                message: "Elevation at which a sample was collected (in meters). Use negative values for depth below sea level",
                format: "one2one"
            },
            {
                selected: false,
                id: 14,
                title: "elevation_end",
                key: "field",
                message: "End elevation at which a sample was collected",
                format: "one2one"
            },
            {
                selected: false,
                id: 15,
                title: "size",
                message: "Size of the registered object",
                format: "conversion"
            },
            {
                selected: false,
                id: 16,
                title: "size_unit CM IS COMMON",
                format: "one2one"
            },

            {
                selected: false,
                id: 17,
                title: "collector",
                key: "field",
                message: "Name of the person who collected the sample or name of chief scientist for larger field programs",
                format: "one2one"
            },
            {
                selected: false,
                id: 18,
                title: "primary_location_type",
                key: "field",
                message: "Physiographic feature or type of feture that your sample was collected from",
                format: "one2one"
            },
            {
                selected: false,
                id: 19,
                title: "igsn",
                key: "field",
                message: "(AUTOMATIC) The 9-digit IGSN of the sample",
                format: "one2one"
            },
            {
                selected: false,
                id: 20,
                title: "sample_comment",
                key: "field",
                message: "Any free 'text' comment about the sample",
                format: "one2one"
            },
            {
                selected: false,
                id: 21,
                title: "original_archive",
                key: "field",
                format: "one2one"
            },
            {
                selected: false,
                id: 22,
                title: "sample description",
                key: "field",
                format: "one2one"
            },
            {
                selected: false,
                id: 23,
                title: "geological_age",
                key: "field",
                message: "Age of a sample as described by the stratigraphic era",
                format: "one2one"
            },
            {
                selected: false,
                id: 24,
                title: "age (min)MA",
                key: "field",
                format: "one2one"
            },
            {
                selected: false,
                id: 25,
                title: "age (max)MA",
                key: "field",
                format: "one2one"
            },
            {
                selected: false,
                id: 26,
                title: "classification",
                key: "field",
                message: "Classification",
                format: "one2one"
            },
            {
                selected: false,
                id: 27,
                title: "sample_type",
                key: "field",
                message: "The type of sample which comes from a SESAR controlled list",
                format: "one2one"
            }
        ]
    }


    changeColor = (e) => {
        e.preventDefault();
        this.setState({ isGreen: !this.state.isGreen })
        this.render()
    }

    render() {


        let value = this.props.fieldValue;


        if (value.length > 35) {
            value = value.slice(0, 35);
            value = value + "..."
        }

        let btnClass;

        btnClass = classNames({
            'field_container1': this.state.isGreen,
            'field_container2': !this.state.isGreen


        });

        return (
            <div class="ui label">
                <div className={btnClass}>
                    <object className="fieldWidget">
                        <div className="checkBox" onClick={this.changeColor.bind(this)}> <CheckboxExample isChecked={this.state.isGreen} /> </div>
                        <body dir="rtl" className="fieldTitle">{this.props.fieldTitle}</body>
                        <div className="fieldVal" >{value}</div>
                    </object>
                    <object className="dropDownWidget" align="right">
                        <div className="dropDown"><DropDown title="Select Field" list={this.state.sesarOptions} /> </div>
                        <div className="mappedValue">FIELDCONTENT</div>
                    </object>


                </div>
            </div>)
    };
}
const mapStateToProps = (state) => {
    console.log(state)
}

export default connect(mapStateToProps, { selectedField })(FieldCard);