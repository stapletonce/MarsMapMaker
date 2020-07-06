import React from 'react';
import mars from '../icons/mars.png'
import CardList from './CardList';
import FileIn from './FileIn';
import classNames from 'classnames';
import Dialog from './Dialog'

import { connect } from 'react-redux';
import { changeInit, initToggle } from '../actions/';

// helper function to set up 'fieldNames' array for the App State

class App extends React.Component {
    constructor(props) {
        super(props);
        // THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO STATE
        this.state = {
            toggleValuesArr: null,
            mapPreview: null,
            isOpened: props.hasBeenOpened,
            jsFile: undefined,
            fieldNames: [],
            size: 0,
            fieldValues: [],
            data: [],
            continue: false
        }; // state object, contains properties relevant to component
    }

    // removes duplicates in an array
    findDuplicates = (names) => {
        let arr = [];
        let final
        let i;
        let j;

        for (i = 0; i < names.length; i++) {
            for (j = 0; j < names.length; j++) {
                if (i !== j && !arr.includes(names[i])) {
                    if (names[i] === names[j]) {
                        arr = arr.concat(names[i])

                    }
                }
            }
        }
        final = arr
        return final
    }

    // removes duplicates from array
    removeDuplicates = (nameArr, valueArr) => {
        let names = nameArr;
        let values = valueArr;
        let i;
        let duplicateArr;
        let final;

        duplicateArr = this.findDuplicates(nameArr, valueArr)

        for (i = nameArr.length - 1; i >= 0; i--) {
            if (duplicateArr.includes(nameArr[i])) {
                duplicateArr.splice(duplicateArr.indexOf(nameArr[i]), 1)
                names.splice(i, 1)
                values.splice(i, 1)
            }
        }

        final = [names, values]

        return final
    }

    // callback function that retrieves data from file, passed through FileIn.js
    // sets state of the the fieldNames, and fieldValues arrays used throughout program
    fileCallback = (datafromFile, totalSize, toggleValues, jsFile) => {

        let currentComponent = this;
        let newNames;
        let newValues;
        let processedValues;
        const toggleObj = {
            arr: toggleValues
        }
        const obj = {
            bool: true
        }

        this.setState({ jsFile: jsFile })

        this.props.initToggle(toggleObj)

        newNames = this.state.fieldNames.slice()
        newNames = newNames.concat(datafromFile[0])

        newValues = this.state.fieldValues
        newValues = newValues.concat(datafromFile[1])

        processedValues = this.removeDuplicates(newNames, newValues)

        currentComponent.setState({
            fieldNames:
                processedValues[0],
            fieldValues:
                processedValues[1],
            continue: true
        });

        if (this.state.fieldNames.length - this.findDuplicates(newNames, newValues).length === totalSize - this.findDuplicates(newNames, newValues).length) {
            this.props.changeInit(obj)
        }
    }

    isOpenCallback = (data) => {
        let currentComponent = this
        console.log(data)
        currentComponent.setState({
            isOpened: true,
            mapPreview: data[1].join("\n")
        })
    }

    // React says we have to define render!! You have to display JSX!
    render() {
        let readerClass = classNames({
            'marsPhoto': this.state.continue === false,
            'marsPhoto1': this.state.continue === true
        });

        return (
            <div>
                <img className={readerClass} src={mars} alt="marsphoto"></img>

                <FileIn
                    callbackFromParent={this.fileCallback}
                />

                {this.state.isOpened ? <Dialog isOpen={this.state.isOpened} onClose={(e) => this.setState({ isOpened: false })}>
                    {this.state.mapPreview.split("\n").map((i) => {
                        return <div>{i}</div>;
                    })}
                </Dialog> : null}

                {this.state.continue ?
                    <CardList
                        jsFileValues={this.state.jsFile}
                        callback={this.isOpenCallback}
                        fields={this.state.fieldNames}
                        toggleVals={this.state.toggleValuesArr}
                        fieldVal={this.state.fieldValues} />
                    : null}
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        hasBeenOpened: state.isOpen,
        toggleArr: state.toggleArr
    };
};

export default connect(mapStateToProps, { changeInit, initToggle })(App);