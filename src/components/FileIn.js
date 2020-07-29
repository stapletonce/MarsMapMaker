///////////////////////////////////////////////////////////////////////////////////////
// FILEIN.JS /////////////////////////////////////////////////////////////////////////
// This component displays a file input box on the first screen /////////////////////
// This input box recieves 1 or 2 CSVS OR that combination with 1 JS file //////////
///////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { connect } from "react-redux";
import Papa from 'papaparse';
import './App.scss';
import classNames from 'classnames';

import { formatDate, century } from '../actions/'

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

class FileIn extends React.Component {

    constructor() {
        super();
        this.state = {
            numberOfEmptyCards: 0,
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
            csvfile3: undefined,
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
        else if (event.target.files[2] === undefined) {
            this.setState({
                csvfile: event.target.files[0],
                csvfile2: event.target.files[1]
            });
        }
        else {
            this.setState({
                csvfile: event.target.files[0],
                csvfile2: event.target.files[1],
                csvfile3: event.target.files[2]
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
        let count = 0;
        if (this.state.files !== undefined) {
            for (let i = 0; i < this.state.files.length; i++) {
                if (this.state.files[i].type === "text/javascript")
                    count += 1
            }
        }

        if (this.state.files === undefined) {
            this.refreshFileIn()
            alert("You have not selected a file!")
            return
        }
        else if (this.state.files.length === 1 && count === 1) {
            this.refreshFileIn()
            alert("You have only selected one mapping file with no additional CSV try again!")
            return
        }
        else if (this.state.files.length > 3) {
            this.refreshFileIn()
            alert("You have selected more that 3 files, try again!")
            return
        }
        else if (this.state.files.length === 3 && count !== 1) {
            this.refreshFileIn()
            alert("You have either selected too many CSV or too many mapping files!")
            return
        }

        for (let i = 0; i < this.state.files.length; i++) {
            Papa.parse(this.state.files[i], {
                complete: this.updateData,
                header: true
            });
        }

        this.setState({ loaded: true })

    };

    removeBrackets = (arr) => {

        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            if (i !== 3)
                newArr.push(arr[i])
        }
        return newArr
    }

    startPushingHelper = (result, i, jsArr) => {
        console.log(JSON.stringify(Object.values(result.data[i])[1]))

        if (!(JSON.stringify(Object.values(result.data[i])[0]).replace(/(\r\n|\n|\r)/gm, "").includes("["))) {


            console.log("FLAG 1: " + Object.values(result.data[i])[0])
            jsArr.push(JSON.stringify(Object.values(result.data[i])[0]).replace(/(\r\n|\n|\r)/gm, "").replace(" ", ""))
        }

        else {
            // if (Object.values(result.data[i])[0].includes("[") && Object.values(result.data[i])[0].includes("]")) {
            //     let value = JSON.stringify(Object.values(result.data[i])[0])
            //     value.replace(" ", "")
            //     value.replace("[", "")
            //     value.replace("]", "")
            //     console.log(value)
            // }

            console.log("FLAG 4: " + Object.values(result.data[i])[0].includes("["))

            let firstIndexFormat;
            // where we handle multivalue selections
            firstIndexFormat = JSON.stringify(Object.values(result.data[i])[0]).split(" ")
            console.log(firstIndexFormat)
            // BANDAID
            // One of the multivalue selections has an extra space in the mapOutput, this is a quick fix
            // However, when mars reads in mapping file, space may still need to be taken care of
            if (firstIndexFormat.length === 5 || firstIndexFormat.length === 6) {
                console.log("FLAG 2: " + Object.values(result.data[i])[0])
                //firstIndexFormat[4] = firstIndexFormat[4]
                firstIndexFormat = this.removeBrackets(firstIndexFormat)
            }

            console.log("CHANGED: " + firstIndexFormat + " : " + firstIndexFormat.length)

            if (firstIndexFormat.length === 4)
                firstIndexFormat[3] = firstIndexFormat[3].substring(0, firstIndexFormat[3].length - 3)
            else if (firstIndexFormat.length === 5)
                firstIndexFormat[3] = firstIndexFormat[3].substring(2, firstIndexFormat[3].length - 1)
            console.log("BEFORE IT GOES IN: " + firstIndexFormat[2] + firstIndexFormat[3])
            jsArr.push(firstIndexFormat[2] + firstIndexFormat[3])
            if ((Object.values(result.data[i])[1] !== undefined && Object.values(result.data[i])[1]).length >= 1) {

                console.log("FLAG 3: " + Object.values(result.data[i])[1].length)
                for (let j = 0; j < (Object.values(result.data[i])[1]).length; j++) {
                    console.log("LATEST: " + Object.values(result.data[i])[1][j])
                    if (Object.values(result.data[i])[1][j] !== "")
                        jsArr.push(firstIndexFormat[2] + (Object.values(result.data[i])[1][j]).substring(2, (Object.values(result.data[i])[1][j]).length - 1))
                }
            }
        }
        console.log(jsArr)
    }

    foundSection = () => {

    }

    // uses function from App.js (callbackFromParent) to retrieve the result/data from FileIn.js
    updateData(result) {
        let removeIndex = []


        // checks to see if the file "result" is a JS mapping file, this file always starts with Start::::
        if (Object.keys(result.data[0])[0].includes("//Start::::")) {
            let finalStr = ""
            let needsCenturyPrefix = false

            // JS mapping file has a section "let map..." which is where we want to retrieve our sesar selections and clean the data
            let jsArr = []
            let prefix = ""
            let dateIdArr = []
            let dateIdentified = false;
            // start pushing is where we find "let map..." and start reading
            let startPushing = false;
            // parsing out a javascript file
            for (let i = 1; i < result.data.length - 1; i++) {
                //console.log(Object.values(result.data[i]))
                if (JSON.stringify(Object.values(result.data[i - 1])[0]).replace(/(\r\n|\n|\r)/gm, "").includes("let map")) {
                    startPushing = true
                }
                else if (JSON.stringify(Object.values(result.data[i - 1])[0]).replace(/(\r\n|\n|\r)/gm, "").includes("const scrippsDate")) {
                    dateIdentified = true
                }
                else if (JSON.stringify(Object.values(result.data[i - 1])[0]).replace(/(\r\n|\n|\r)/gm, "").includes("}")) {
                    startPushing = false
                }
                else if (JSON.stringify(Object.values(result.data[i])[0]).replace(/(\r\n|\n|\r)/gm, "").includes("return y")) {
                    dateIdentified = false
                }



                let arr

                if (startPushing === true) {
                    this.startPushingHelper(result, i, jsArr)
                }
                else if (dateIdentified === true) {
                    if (Object.values(result.data[i])[0].includes("y")) {
                        arr = Object.values(result.data[i])[0].split(" ")
                        prefix = arr[7]
                    }
                    // create array of the JS mapping file already selected date numbers
                    if (Object.values(result.data[i])[0].includes("y")) {
                        arr = Object.values(result.data[i])[0].split(" ")
                        dateIdArr.push(arr[arr.length - 1].match(/[0-9]+/g)[0])
                        dateIdArr.push(Object.values(result.data[i])[1][0].match(/[0-9]+/g)[0])
                    }
                    else {
                        dateIdArr.push(Object.values(result.data[i])[0].match(/[0-9]+/g)[0])
                        dateIdArr.push(Object.values(result.data[i])[1][0].match(/[0-9]+/g)[0])
                    }
                }


                if (dateIdArr.length === 6) {
                    // create a string of the date number array above
                    // use that string to identify the finalStr to display automatically in the date dropdown

                    let dateFormatStr = dateIdArr.join('')
                    switch (dateFormatStr) {

                        case "046242":
                            finalStr = "YYYYMMDD"
                            break
                        case "044262":
                            finalStr = "YYYYDDMM"
                            break
                        case "440222":
                            finalStr = "DDMMYYYY"
                            break
                        case "442202":
                            finalStr = "MMDDYYYY"
                            break
                        case "048252":
                            finalStr = "YYYY/MM/DD"
                            break
                        case "045282":
                            finalStr = "YYYY/DD/MM"
                            break
                        case "643202":
                            finalStr = "MM/DD/YYYY"
                            break;
                        case "640232":
                            finalStr = "DD/MM/YYYY"
                            break;
                        case "026232":
                            //prefix = this.props.centuryChosen.substr(0, 2)
                            finalStr = "YY/MM/DD or YY-MM-DD"
                            needsCenturyPrefix = true
                            break;
                        case "623202":
                            finalStr = "MM/DD/YY or MM-DD-YY"
                            needsCenturyPrefix = true
                            //prefix = this.props.centuryChosen.substr(0, 2)
                            break;
                        case "023262":
                            //prefix = this.props.centuryChosen.substr(0, 2)
                            finalStr = "MM/DD/YY or MM-DD-YY"
                            needsCenturyPrefix = true
                            break;
                        case "620232":
                            finalStr = "DD/MM/YY or DD-MM-YY"
                            needsCenturyPrefix = true
                            //prefix = this.props.centuryChosen.substr(0, 2)
                            break;
                        default:
                    }
                }

                if (needsCenturyPrefix === true) {

                    const newValue = prefix + "00"
                    const obj = {
                        chosenCentury: newValue
                    }

                    this.props.century(obj)


                }

                let newJSArr = []
                // any identical elements in jsArr, only append them once into newJSArr

                for (let i = 0; i < jsArr.length; i++) {
                    if (!newJSArr.includes(jsArr[i])) {
                        newJSArr.push(jsArr[i])
                    }
                }
                jsArr = newJSArr
            }
            // call dateFormat
            const obj = {
                dateFormat: finalStr,
                hasTwoYs: needsCenturyPrefix
            }
            this.props.formatDate(obj)


            // more string cleaning
            // some of the cleaning in the code could be a little smoother with one regex, but some of the symbols we're a little more complicating so handled as strings
            for (let i = 0; i < jsArr.length; i++) {

                jsArr[i] = jsArr[i].replace(/(|\r\n|\s|})/gm, "")
                jsArr[i] = jsArr[i].replace("}", "")
                jsArr[i] = jsArr[i].replace(/\\/g, '')
                jsArr[i] = jsArr[i].replace(/"/g, "")
                jsArr[i] = jsArr[i].replace(" ", "")
                if (jsArr[i] !== "") {
                    jsArr[i] = jsArr[i].split(":")
                    jsArr[i][0] = jsArr[i][0].replace(" ", "")
                    jsArr[i][1] = jsArr[i][1].replace(" ", "")
                }
                else
                    removeIndex.push(i)

            }
            // removes any empty strings as elements in the jsArr
            for (let i = 0; i < removeIndex.length; i++) {
                jsArr.splice(removeIndex[i], 1)
            }

            // establish state that we have a jsArr
            this.setState({ jsFile: jsArr, includesJsFile: true, isJsFile: true })
        }

        // this is where we combine objects if there are multiple csv's for the purpose of being able to toggle through tuples of both files
        // we limit the number of toggles but the minimum size of the files (Ex: CSV1.length = 3 && CSV2.length = 10, then user can toggle through 3 times)
        var data = result;
        let finalToggleArray = []
        let toggleArr = this.state.toggleValues;
        let minimum = Math.min(data.data.length, toggleArr.length)
        if (this.state.isJsFile === false) {
            if (toggleArr.length !== 0 && (this.state.files[1] !== undefined || this.state.files[2] !== undefined)) {

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
            else if (toggleArr.length === 0) {
                toggleArr = toggleArr.concat(data.data)
            }


            this.setState({
                toggleValues: toggleArr,
                totalFileSize: this.state.totalFileSize + Object.keys(data.data[0]).length,
                fieldNames: this.state.fieldNames.concat(Object.keys(data.data[0])),
                fieldValues: this.state.fieldValues.concat(Object.values(data.data[0]))
            })
        }


        let arr = [this.state.fieldNames, this.state.fieldValues]

        // we want to make sure that we have handled all CSV's and JS files before we use the callback function
        this.setState({ num: this.state.num + 1 })
        if (this.state.num === this.state.files.length - 1) {
            //force card edit replace 5 with  this.numOfEmptyCards
            this.props.callbackFromParent(arr, this.state.totalFileSize, this.state.toggleValues, this.state.jsFile, 1)
        }

        // this function checks every file to see if it is a JS or CSV file, if JS certain parts of the code are ignored, if CSV the same applies
        this.setState({ isJsFile: false })
    }
    /*force card edit */
    // numOfCards = (event) => {
    //     console.log("HERE HERE HERE : " + event.target.value)
    //     console.log("function: " + parseInt(event.target.value))
    //     this.setState({ numberOfEmptyCards: parseInt(event.target.value) })

    // }

    render() {

        // CSS flipflop for loaded or non-loaded file
        let readerClass = classNames({
            'fileReaderUnloaded': this.state.loaded === false,
            'fileReaderLoaded': this.state.loaded === true
        });

        return (
            <div className={readerClass}>

                <h2>Import File(s)!</h2>

                <input
                    className="csv__input"
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
                {/*force card edit */}
                {/* <div style={{ padding: "0px", margin: "0px", paddingTop: "10px" }}>
                    
                    <select onChange={this.numOfCards} style={{ paddingTop: "10px", width: "120px" }} class="ui search dropdown">
                        <option value="">Extra Cards</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div> */}

                <p />
                <button onClick={this.importCSV}> Import now!</button>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hasChosenDropdown: state.hasChosenDropdownOption,
        hasChosenDateFormat: state.hasChosenDateFormat,
        dateFormatSelected: state.chosenDateFormat
    };
};

export default connect(mapStateToProps, { formatDate, century })(FileIn);
