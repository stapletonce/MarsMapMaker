import React from 'react';
//import data from '../TEST_DATA.csv';
import CardList from './CardList';
import FileIn from './FileIn';

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
    fileCallback = (datafromFile) => {

        let currentComponent = this;

        currentComponent.setState({
            fieldNames:
                parser(datafromFile.meta.fields, datafromFile.meta.fields.length),
            fieldValues:
                datafromFile.data[0],
            continue: true
        });
    }

    // React says we have to define render!! You have to display JSX!
    render() {
        //conditio
        return (
            <div>
                <FileIn
                    callbackFromParent={this.fileCallback}
                />
                {this.state.continue ?
                    <CardList
                        fields={this.state.fieldNames}
                        fieldVal={this.state.fieldValues}
                    /> : null}
            </div>
        )
    };
}

export default App;