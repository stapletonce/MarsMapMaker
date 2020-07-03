import React, { Component } from 'react';

// CSS & Styling
import { Checkbox } from 'semantic-ui-react';
import './App.css';
///////////////////////////////////////////
////////////////////////////////////////////////

export default class CheckboxExample extends Component {
    state = { checked: this.props.isChecked }
    toggle = () => {
        this.props.greenCallback()
        this.setState({ checked: !this.props.isChecked })
    }

    render() {
        return (
            <div className="innerCheckbox">
                <Checkbox
                    onChange={this.toggle}
                    checked={this.state.checked}
                />
            </div>
        )
    }
}
