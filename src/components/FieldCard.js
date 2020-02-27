import React from 'react';
import './App.css';
import classNames from 'classnames';

class FieldCard extends React.Component {

    state = { fieldTitle: "", sesarValue: "", fieldValue: "", isGreen: false }

    changeColor = (e) => {
        e.preventDefault();
        console.log(this.state.isGreen)
        this.setState({ isGreen: !this.state.isGreen })
    }

    render() {

        let btnClass = classNames({
            'field_container1': this.state.isGreen,
            'field_container2': !this.state.isGreen
        });
        return (
            <div className={btnClass} onClick={this.changeColor.bind(this)}>
                <div className="fieldTitle">{this.props.fieldTitle}</div>
                <div className="fieldVal">{this.props.fieldValue}</div>
            </div>)
    };
}

export default FieldCard;