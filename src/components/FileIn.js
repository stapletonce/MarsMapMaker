import React from 'react';
import Papa from 'papaparse';
import './App.css';
import classNames from 'classnames';


class FileIn extends React.Component {

    constructor() {
        super();
        this.state = {
            toggleValues: [],
            fieldNames: [],
            fieldValues: [],
            num: -1,
            readyToInit: false,
            totalFileSize: 0,
            includesJsFile: false,
            isJsFile: false,
            jsFile: undefined,
            files: undefined,
            csvfile: undefined,
            csvfile2: undefined,
            loaded: false
        };
        this.updateData = this.updateData.bind(this);
    }

    // helper method for selected CSV to read information from the file
    handleChange = event => {

        this.setState({ files: event.target.files })
        if (event.target.files[1] === undefined) {
            this.setState({
                csvfile: event.target.files[0]
            });
        }
        else {
            this.setState({
                csvfile: event.target.files[0],
                csvfile2: event.target.files[1]
            });

        }
    };

    refreshFileIn = () => {
        setTimeout(() => {
            this.setState({ loaded: !this.state.loaded });
        }, 0);  // ------------------------------> timeout 0

        setTimeout(() => {
            this.setState({ loaded: !this.state.loaded });
        }, 10);
    }

    // onclick helper function to parse the CSV with PapaParse 
    importCSV = () => {

        if (this.state.files === undefined) {
            this.refreshFileIn()
            alert("You have not selected a file!")
            return
        }

        else if (this.state.files.length > 2) {
            this.refreshFileIn()
            alert("You have selected more than two files!")
            return
        }

        if (this.state.files.length > 1) {
            for (let i = 0; i < 2; i++) {
                Papa.parse(this.state.files[i], {
                    complete: this.updateData,
                    header: true
                });
            }
        }
        else {
            Papa.parse(this.state.files[0], {
                complete: this.updateData,
                header: true
            });

        }

        this.setState({ loaded: true })

    };

    // uses function from App.js (callbackFromParent) to retrieve the result/data from FileIn.js
    updateData(result) {

        if (Object.keys(result.data[0])[0].includes("//Start::::")) {
            let jsArr = []

            let startPushing = false;

            // parsing out a javascript file
            for (let i = 1; i < result.data.length - 1; i++) {
                if (JSON.stringify(Object.values(result.data[i - 1])[0]).replace(/(\r\n|\n|\r)/gm, "").includes("let map")) {
                    startPushing = true
                }
                else if (JSON.stringify(Object.values(result.data[i - 1])[0]).replace(/(\r\n|\n|\r)/gm, "").includes("}")) {
                    startPushing = false
                }
                if (startPushing === true) {
                    if (!(JSON.stringify(Object.values(result.data[i])[0]).replace(/(\r\n|\n|\r)/gm, "").includes("["))) {
                        console.log(JSON.stringify(Object.values(result.data[i])[0]).replace(/(\r\n|\n|\r)/gm, ""))
                        jsArr.push(JSON.stringify(Object.values(result.data[i])[0]).replace(/(\r\n|\n|\r)/gm, ""))
                    }
                    else {
                        let firstIndexFormat;
                        // where we handle multivalue selections
                        console.log(JSON.stringify(Object.values(result.data[i])))
                        firstIndexFormat = JSON.stringify(Object.values(result.data[i])[0]).split(" ")
                        console.log(firstIndexFormat[2])
                        console.log(JSON.stringify(Object.values(result.data[i])[1][0]))
                        console.log(JSON.stringify(Object.values(result.data[i])[1][1]))
                        firstIndexFormat[3] = firstIndexFormat[3].substring(3, firstIndexFormat[3].length - 3)
                        console.log("   " + firstIndexFormat[2] + " " + firstIndexFormat[3])
                        jsArr.push("\"   " + firstIndexFormat[2] + " " + firstIndexFormat[3] + "\"")
                        for (let j = 0; j < JSON.stringify(Object.values(result.data[i])[1]).length; j++) {
                            jsArr.push("\"   " + firstIndexFormat[2] + " " + (Object.values(result.data[i])[1][0]).substring(2, (Object.values(result.data[i])[1][0]).length - 1) + "\"")
                        }
                    }
                }
                let newJSArr = []
                for (let i = 0; i < jsArr.length; i++) {
                    if (!newJSArr.includes(jsArr[i])) {
                        newJSArr.push(jsArr[i])
                    }
                }
                jsArr = newJSArr
            }

            for (let i = 0; i < jsArr.length - 1; i++) {

                jsArr[i] = jsArr[i].replace(/(|\r\n|\s|})/gm, "")
                jsArr[i] = jsArr[i].replace("}", "")
                console.log(jsArr[i])
                jsArr[i] = jsArr[i].split(":")
                jsArr[i][0] = jsArr[i][0].replace(" ", "")
                jsArr[i][0] = jsArr[i][0].substring(2)
                jsArr[i][1] = jsArr[i][1].substring(1, jsArr[i][1].length - 1)
            }
            this.setState({ jsFile: jsArr, includesJsFile: true, isJsFile: true })
        }





        var data = result;
        let finalToggleArray = []
        let toggleArr = this.state.toggleValues;
        let minimum = Math.min(data.data.length, toggleArr.length)
        if (this.state.isJsFile === false) {
            if (toggleArr !== [] && this.state.csvfile2 !== undefined) {

                if (minimum < 10) {
                    for (let i = 0; i < (minimum % 10); i++) {
                        const finalObj = { ...toggleArr[i], ...data.data[i] }
                        finalToggleArray.push(finalObj)
                    }
                }
                else {
                    for (let i = 0; i < (minimum % 10) + (10 - (minimum % 10)); i++) {
                        const finalObj = { ...toggleArr[i], ...data.data[i] }
                        finalToggleArray.push(finalObj)
                    }
                }
                toggleArr = finalToggleArray

            }
            toggleArr = toggleArr.concat(data.data)

            this.setState({
                toggleValues: toggleArr,
                totalFileSize: this.state.totalFileSize + Object.keys(data.data[0]).length,
                fieldNames: this.state.fieldNames.concat(Object.keys(data.data[0])),
                fieldValues: this.state.fieldValues.concat(Object.values(data.data[0]))
            })
        }

        let arr = [this.state.fieldNames, this.state.fieldValues]
        if (this.state.csvfile2 !== undefined) {
            this.setState({ num: this.state.num + 1 })
            if (this.state.num === 1) {
                this.props.callbackFromParent(arr, this.state.totalFileSize, this.state.toggleValues, this.state.jsFile)
            }
        }
        else {
            this.props.callbackFromParent(arr, this.state.totalFileSize, this.state.toggleValues)
        }

        this.setState({ isJsFile: false })
    }

    render() {

        // CSS flipflop for loaded or non-loaded file
        let readerClass = classNames({
            'fileReader': this.state.loaded === false,
            'fileReader1': this.state.loaded === true
        });

        return (
            <div className={readerClass}>

                <h2>Import File(s)!</h2>

                <input
                    className="csv-input"
                    type="file"
                    accept=".csv, .js"
                    ref={input => {
                        this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                    multiple="multiple"
                />
                <p />
                <button onClick={this.importCSV}> Import now!</button>

            </div>
        );
    }
}

export default FileIn;
