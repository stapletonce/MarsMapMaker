import React from 'react';
import './App.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CheckboxExample from './CheckBox'
import DropDown from './DropDown'
import { selectedField } from '../actions'

class FieldCard extends React.Component {

    state = { isGreen: this.props.hasContent }


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

            <div className={btnClass}>
                <div className="checkBox" onClick={this.changeColor.bind(this)}> <CheckboxExample isChecked={this.state.isGreen} /> </div>
                <div className="fieldTitle">{this.props.fieldTitle}</div>
                <div className="fieldVal" >{value}</div>
                <div className="dropDown"> <DropDown /> </div>
            </div>)
    };
}

export default connect(null)(FieldCard);