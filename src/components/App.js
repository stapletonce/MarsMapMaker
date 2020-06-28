import React from 'react';
import mars from '../icons/mars.png'
import CardList from './CardList';
import FileIn from './FileIn';
import classNames from 'classnames';
import Dialog from './Dialog'

import { connect } from 'react-redux';
import { changeInit } from '../actions/';

// helper function to set up 'fieldNames' array for the App State


class App extends React.Component {
    constructor(props) {
        super(props);
        // THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO STATE
        this.state = { mapPreview: null, isOpened: props.hasBeenOpened, fieldNames: [], size: 0, fieldValues: [], data: [], continue: false }; // state object, contains properties relevant to component
    }

    findDuplicates = (names, values) => {
        let arr = [];
        let arrValues = [];
        for (let i = 0; i < names.length; i++) {
            for (let j = 0; j < names.length; j++) {
                if (i !== j && !arr.includes(names[i])) {
                    if (names[i] === names[j]) {
                        arr = arr.concat(names[i])
                        arrValues = arrValues.concat(values[i])

                    }
                }
            }
        }
        let final = arr
        return final
    }

    removeDuplicates = (nameArr, valueArr) => {
        let names = nameArr;
        let values = valueArr;
        let duplicateArr = this.findDuplicates(nameArr, valueArr)
        for (let i = nameArr.length - 1; i >= 0; i--) {
            if (duplicateArr.includes(nameArr[i])) {
                duplicateArr.splice(duplicateArr.indexOf(nameArr[i]), 1)
                names.splice(i, 1)
                values.splice(i, 1)
            }
        }
        let final = [names, values]
        return final
    }

    // callback function that retrieves data from file, passed through FileIn.js
    // sets state of the the fieldNames, and fieldValues arrays used throughout program
    fileCallback = (datafromFile, totalSize) => {

        let currentComponent = this;
        let newNames = this.state.fieldNames.slice()


        newNames = newNames.concat(datafromFile[0])

        let newValues = this.state.fieldValues
        newValues = newValues.concat(datafromFile[1])

        let processedValues = this.removeDuplicates(newNames, newValues)

        currentComponent.setState({
            fieldNames:
                processedValues[0],
            fieldValues:
                processedValues[1],
            continue: true
        });
        console.log(this.state.fieldNames)
        if (this.state.fieldNames.length - this.findDuplicates(newNames, newValues).length === totalSize - this.findDuplicates(newNames, newValues).length) {
            const obj = {
                bool: true
            }
            this.props.changeInit(obj)
        }

    }
    isOpenCallback = (data) => {
        let currentComponent = this

        currentComponent.setState({ isOpened: true, mapPreview: data[1].join("\n") })
        console.log(data)
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
                        callback={this.isOpenCallback}
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
        hasInit: state.hasInit,
        hasBeenOpened: state.isOpen
    };
};

export default connect(mapStateToProps, { changeInit })(App);