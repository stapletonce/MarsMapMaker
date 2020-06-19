import React from 'react';
import CardList from './CardList';
import FileIn from './FileIn';

import { connect } from 'react-redux';

import { changeInit } from '../actions';

// helper function to set up 'fieldNames' array for the App State
const parser = (fieldName, length) => {
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr[i] = fieldName[i];
    }
    return (arr);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        // THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO STATE
        this.state = { fieldNames: [], size: 0, fieldValues: [], data: [], continue: false }; // state object, contains properties relevant to component
    }

    // callback function that retrieves data from file, passed through FileIn.js
    // sets state of the the fieldNames, and fieldValues arrays used throughout program
    fileCallback = (datafromFile, totalSize) => {

        let currentComponent = this;
        let newNames = this.state.fieldNames.slice()


        newNames = newNames.concat(Object.keys(datafromFile.data[0]))

        let newValues = this.state.fieldValues
        newValues = newValues.concat(Object.values(datafromFile.data[0]))


        currentComponent.setState({
            fieldNames:
                newNames,
            fieldValues:
                newValues,
            continue: true
        });

        if (this.state.fieldNames.length === totalSize) {
            const obj = {
                bool: true
            }
            this.props.hasInit(obj)
        }

    }

    // React says we have to define render!! You have to display JSX!
    render() {
        return (
            <div>
                <FileIn
                    callbackFromParent={this.fileCallback}
                />
                {this.state.continue ?
                    <CardList
                        fields={this.state.fieldNames}
                        fieldVal={this.state.fieldValues} />
                    : null}
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        useOnce: state.useOnce,
        dateFormat: state.chosenDateFormat,
        hasChosen: state.hasChosenDateFormat,
        pairArr: state.sizeOuterArray,
        hasInit: state.hasInit
    };
};

export default connect(mapStateToProps, { changeInit })(App);