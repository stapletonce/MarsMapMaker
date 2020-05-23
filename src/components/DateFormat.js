import React from 'react';
import ReactModal from 'react-modal';
import DropDown from './DropDown'
import { connect } from 'react-redux';
import { render } from '@testing-library/react';

class DateFormat extends React.Component {
    // value is format function specification (the actual code in string format)
    // title is appearance
    dateFormatOption = [
        {title: "DD/MM/YYYY", value:"substring", type: "date"},
        {title: "MM/DD/YYYY", value:"substring", type: "date"},
        {title: "YYYY/DD/MM", value:"substring", type: "date"},
        {title: "YYYY/MM/DD", value:"substring", type: "date"},
        {title: "MMDDYYYY", value:"substring", type: "date"},
        {title: "DDMMYYYY", value:"substring", type: "date"},
        {title: "YYYYDDMM", value:"substring", type: "date"},
        {title: "YYYYMMDD", value:"substring", type: "date"},
    ]
render()
    {   return (
            this.props.appear ?
                <ReactModal isOpen={this.props.appear}>
                    <button onClick={this.props.onClose}> Finish Formatting</button>
                    <div className="dropDown"> 
                        <p>Please select date format</p> 
                        <DropDown title={this.dateFormatOption} value={this.dateFormatOption} fieldType={"date"} list={this.dateFormatOption} /> 
                    </div>
                </ReactModal> : null
            )
    }

}

export default DateFormat;