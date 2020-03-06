import React from 'react';
import './App.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { selectedField } from '../actions'

class FieldCard extends React.Component {

    state = { isGreen: false, hasContent: false }

    changeColor = (e) => {
        e.preventDefault();
        console.log(this.state.isGreen)
        this.setState({ isGreen: !this.state.isGreen })
    }

    render() {

        console.log(this.state.fieldTitle)

        let value = this.props.fieldValue;

        if (value.length > 15) {
            value = value.slice(0, 20);
            value = value + "..."
        }

        let btnClass;

        btnClass = classNames({
            'field_container1': this.state.isGreen,
            'field_container2': !this.state.isGreen,
            'field_container3': this.props.fieldValue !== "",
            'field_container4': this.props.fieldValue === ""

        });
        return (
            <div className={btnClass} onClick={this.changeColor.bind(this)}>
                <div className="fieldTitle">{this.props.fieldTitle}</div>
                <div className={"fieldVal"} >{value}</div>
            </div>)
    };
}

export default connect(null)(FieldCard);