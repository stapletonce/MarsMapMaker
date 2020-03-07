import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';
import './App.css';

export default class CheckboxExample extends Component {
    state = { checked: this.props.isChecked }
    toggle = () => this.setState((prevState) => ({ checked: !prevState.checked }))


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
