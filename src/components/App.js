import React from 'react';
import * as d3 from 'd3';
//import data from '../TEST_DATA.csv';
import CardList from './CardList';
import FileIn from './FileIn';

const parser = (fieldName, length) => {
    let arr = [];
    // 53 is hardcoded, we want size of columns
    for (let i = 0; i < length; i++) {
        arr[i] = fieldName[i];
    }
    return (arr);
}




class App extends React.Component {
    constructor(props) {
        super(props);
        // THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO STATE
        this.state = { fieldNames: [], size: 0, fieldValues: [], data: [] }; // state object, contains properties relevant to component
    }



    fileCallback = (datafromFile) => {
        //this.setState({ data: datafromFile[0] })
        console.log(datafromFile.data)
        let currentComponent = this;
        //d3.csv(datafromFile).then(function (data) {
        currentComponent.setState({
            fieldNames:
                parser(datafromFile.meta.fields, datafromFile.meta.fields.length),
            fieldValues:
                datafromFile.data[0]
        })

        console.log("LOOK LOOK" + this.state.fieldValues)
        //}).catch(function (err) {
        //throw err;
        //});

    }

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            alert(reader.result)
        }
        reader.readAsText(files[0]);
    }



    // React says we have to define render!! You have to display JSX!
    render() {
        //conditio
        return (
            <div>
                <FileIn callbackFromParent={this.fileCallback} />
                <CardList fields={this.state.fieldNames} fieldVal={this.state.fieldValues} />
            </div>
        )

    };
}

export default App;