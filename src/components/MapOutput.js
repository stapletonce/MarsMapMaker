///////////////////////////////////////////////////////////////////////////////////////
// MAPOUTPUT.JS /////////////////////////////////////////////////////////////////////////
// This component displays an icon in the center of the toolbar /////////////////////
// This input box recieves 1 or 2 CSVS OR that combination with 1 JS file //////////
///////////////////////////////////////////////////////////////////////////////////
//FIX
import React from 'react';
import { connect } from 'react-redux';
import saveAs from 'file-saver';
import { formatDate } from "../actions/"

import mars from '../icons/planet.png';
//import { sum } from 'd3';
//need to handle single value measurements and size unit mapping Size unit should always be 'cm'
//
class MapOutput extends React.Component {
    state = { functionIDs: [] }
    forceEditFunction = () => {
        let id = 0;
        let functID = ""

        let sortedPersistent = this.props.persist
        sortedPersistent.sort((a, b) => (a.index > b.index) ? 1 : -1)
        //for (let i = 0; i < sortedPersistent.length; i++)
        //    {alert(sortedPersistent[i].header) }

        for (let i = 0; i < this.props.ent.length; i++) {
            if ((this.props.ent[i].header === "<METADATA>" || this.props.ent[i].header === "<METADATA_ADD>") && this.props.ent[i].isGreen && this.props.ent[i].value !== "<METADATA_ADD>") {
                functID = functID + "const forceEditID" + id + "= () => {" + "\n" + "let mapMakerHeader = " + "\"" + sortedPersistent[id].header + "\"" + "\n  return " + "\"" + this.props.ent[i].value + "\"" + ";\n}\n"
                let appendValue = "forceEditID" + id
                let arr = this.state.functionIDs
                arr.push(appendValue)
                //alert("This is checking id: " + "  "+ id + "   " + appendValue + "  " + this.props.ent[i].value)
                this.setState(state => ({ functionIDs: arr }))
                //alert("BLEH" + this.state.functionIDs)
                id++
            }
        }
        return functID
    }

    //this takes in the chosen date format and creates the text that corresponds to how the user wants the entry to be manipulated
    createDateFormatString = (chosenFormat) => {
        let letDateString = ""

        if (chosenFormat !== "start") {
            let y = ""
            let d = ""
            let m = ""
            let prefix = ""
            switch (chosenFormat) {
                case "YYYYMMDD":
                    y = "0,4"
                    d = "6,2"
                    m = "4,2"
                    break
                case "YYYYDDMM":
                    y = "0,4"
                    d = "4,2"
                    m = "6,2"
                    break
                case "DDMMYYYY":
                    y = "4,4"
                    d = "0,2"
                    m = "2,2"
                    break
                case "MMDDYYYY":
                    y = "4,4"
                    d = "2,2"
                    m = "0,2"
                    break
                case "YYYY/MM/DD":
                    y = "0,4"
                    d = "8,2"
                    m = "5,2"
                    break
                case "YYYY/DD/MM":
                    y = "0,4"
                    d = "5,2"
                    m = "8,2"
                    break
                case "MM/DD/YYYY":
                    y = "6,4"
                    d = "3,2"
                    m = "0,2"
                    break;
                case "DD/MM/YYYY":
                    y = "6,4"
                    d = "0,2"
                    m = "3,2"
                    break;
                case "YY/MM/DD":
                    prefix = this.props.centuryChosen.substr(0, 2)
                    y = "0,2"
                    d = "6,2"
                    m = "3,2"
                    break;
                case "MM/DD/YY":
                    prefix = this.props.centuryChosen.substr(0, 2)
                    y = "6,2"
                    d = "3,2"
                    m = "0,2"
                    break;
                case "YY/DD/MM":
                    prefix = this.props.centuryChosen.substr(0, 2)
                    y = "0,2"
                    d = "3,2"
                    m = "6,2"
                    break;
                case "DD/MM/YY":
                    prefix = this.props.centuryChosen.substr(0, 2)
                    y = "6,2"
                    d = "0,2"
                    m = "3,2"
                    break;
                default:
            }

            letDateString = "const scrippsDate = (scrippsValue) => {\n  const y  =  \"" + prefix + "\" + " + "scrippsValue.substr(" + y + ")\n  const d = scrippsValue.substr(" + d + ")\n  const m = scrippsValue.substr(" + m + ")\n  return y + '-' + m + '-' + d + 'T00:00:00Z'\n}\n\n"
        }
        else {
            letDateString = ""
        }
        return letDateString
    }

    // createSizeConversionString(precisionChosen) {
    //     //must find which field contains the presicion field and what unit it is in
    //     //default to MM which is 10
    //     let secondInPair = []
    //     let unit = { size: "mm",
    //                 divisor: "10"}

    //     //populates precision fields chosen
    //     for (let i = 0; i < this.props.sizeArr.length; i++) {
    //         if (this.props.sizeArr[i][1].pairHeader !== "")
    //             secondInPair = secondInPair.concat( "\"" + this.props.sizeArr[i][1].pairHeader + "\"")
    //     }            

    //     let stringVersion = secondInPair.join(",")
    //     let sizeString = "const size = (scrippsValue, scrippsKey) => {\n  let chosenPrecision =[" + stringVersion + "]\n  return chosenPrecision.includes(scrippsKey) ? scrippsValue/" + unit.divisor + " : scrippsValue\n}\n\n"

    //     return sizeString
    // }

    createMulitValueJoins() {
        const keyValueString = "const keyValueString = (scrippsValue, scrippsKey) => {\n  return scrippsKey + ' : ' + scrippsValue\n}\n\n"
        const delimit = "const delimit = (valueArray) => {\n  return valueArray.join(';')\n}\n\n"

        return keyValueString + delimit
    }

    //these are used for clarity about the string concat below SHOULD RETURN BOTH ARRAYS IN PARSEABLE STRING FORM
    summateSingleHelper = (singleAndValueArray) => { }

    summatePairHelper = (pairAndValuesArray) => { }

    // createSummate() {
    //     //this assumes that the single value is already in the format of CM
    //     let getSingleSums = []
    //     let getRawSingleSums = []

    //     //for single measurement values
    //     let singleSumString = ""

    //     //for pair measurement values
    //     let getPairInfoString = ""

    //     const fourSpace = "    "

    //     for (let z = 0; z < this.props.singleMeasure.length; z++) {
    //         if (this.props.singleMeasure[z].pairHeader !== "") {

    //             //for direct output
    //             singleSumString = "(" + this.props.singleMeasure[z].pairHeader + ") = " + this.props.singleMeasure[z].pairValue

    //             getSingleSums = getSingleSums.concat(singleSumString)

    //             //for avoiding duplicates for pulling pair size values in loop below

    //             let rawObj = {
    //                 header : this.props.singleMeasure[z].pairHeader,
    //                 value : this.props.singleMeasure[z].pairValue
    //             }

    //             getRawSingleSums = getRawSingleSums.concat( rawObj )
    //         }
    //     }

    //     //this assumes that the 1st in pair is in format CM and 2nd in pair is in format MM
    //     let getSizeSums = []
    //     let getRawSize = []
    //     for (let z = 0; z < this.props.sizeArr.length - 1; z++) {
    //         if (this.props.sizeArr[z][0].pairHeader !== "" && !getRawSingleSums.includes(this.props.sizeArr[z][0].header)) {
    //             let rawObj = {
    //                 firstHeader : this.props.sizeArr[z][0].pairHeader,
    //                 firstValue : this.props.sizeArr[z][0].pairValue,
    //                 secondHeader : this.props.sizeArr[z][1].pairHeader,
    //                 secondValue : this.props.sizeArr[z][1].pairValue
    //             }

    //             getRawSize = getRawSize.concat(rawObj)

    //             getPairInfoString = "(" + this.props.sizeArr[z][0].pairHeader + " + " + this.props.sizeArr[z][1].pairHeader + ") = " + this.props.sizeArr[z][0].pairValue + "." + this.props.sizeArr[z][1].pairValue
    //             getSizeSums = getSizeSums.concat(getPairInfoString)
    //             z++    
    //         }
    //     }        

    //     const initialValue = ""
    //     const singleReducer = (accumulator, item) => { return accumulator + fourSpace + "{ header: " + item.header + ", value: "+ item.value + " },\n"}

    //     const pairInitialValue = ""
    //     const pairReducer = (accumulator, item) => { return accumulator + "{\n "+ fourSpace + "firstHeader: " + item.firstHeader + ",\n"+ fourSpace + "firstValue: " + item.firstValue + ",\n" + fourSpace + "secondHeader: " + item.secondHeader + ",\n" + fourSpace + "secondValue :" + item.secondValue + "\n},"}

    //     let summateString = "const summate = () => {\n  "
    //     summateString = summateString + "const singleMeasure = [\n" + getRawSingleSums.reduce(singleReducer, initialValue).replace(/,(?=[^,]*$)/, " ") + "]\n  const pairMeasure = [" + getRawSize.reduce(pairReducer, pairInitialValue).replace(/,(?=[^,]*$)/, " ") + "]\n" //continue to reduce pair values

    //     const readSingleMeasure = "  let singleJoin = \"\"\n   for (let i = 0; i < singleMeasure.length; i++) {\n    singleJoin = singleJoin + singleMeasure[i].header + \" = \" singleMeasure.Value[i] +  \"; \"\n   }\n"
    //     const readPairMeasure = "  let pairJoin = \"\"\n   for (let i = 0; i < pairMeasure; i++) {\n    pairJoin = pairJoin + \"(\" + pairMeasure[i].firstHeader + \" + \" + pairMeasure[i].secondHeader + \")\" + \" = \" + pairMeasure[i].firstValue + \".\" + pairMeasure[i].secondValue + \"; \" \n   }\n return singleMeasure + pairMeasure\n}\n"

    //     summateString = summateString + readSingleMeasure + readPairMeasure
    //     alert(summateString)

    //     return summateString
    // }

    //this method loops through the array entries in the store multiple times to append to the string based on corresponding SesarTitles selected that
    createMapString() {
        //FIX multivalue adds on a comma when it should end the line!
        let letMapString = "let map = {\n"
        let lastIndexOfContent = -1
        let singleLastIndexOfContent = -1
        let geological_age_found = -1
        let sample_found = -1
        let description_found = -1
        let field_found = -1
        let size_found = -1

        //for formatting need to track the relative last entry of each multivalue and single value and the last entry used

        for (let j = 0; j < this.props.ent.length; j++) {
            //these conditionals track the last occurance of each type of sesarTitle
            if (this.props.ent[j].sesarTitle !== "" && this.props.ent[j].value !== "<METADATA_ADD>" && this.props.ent[j].sesarTitle !== "field_name" && this.props.ent[j].sesarTitle !== "sample_comment" && this.props.ent[j].sesarTitle !== "description" && this.props.ent[j].sesarTitle !== "size" && this.props.ent[j].sesarTitle !== "geological_age")
                singleLastIndexOfContent = j
            else if (this.props.ent[j].sesarTitle === "geological_age")
                geological_age_found = j
            else if (this.props.ent[j].sesarTitle === "field_name")
                field_found = j
            else if (this.props.ent[j].sesarTitle === "sample_comment")
                sample_found = j
            else if (this.props.ent[j].sesarTitle === "description")
                description_found = j
            else if (this.props.ent[j].sesarTitle === "size")
                size_found = j
        }

        //this finds the overall last occurance of a value in the array
        const findFinalPosition = [singleLastIndexOfContent, geological_age_found, sample_found, description_found, field_found, size_found]
        lastIndexOfContent = Math.max(...findFinalPosition)


        let singlesAppendingString = "";
        for (let i = 0; i < this.props.ent.length; i++) {
            if (this.props.ent[i].sesarTitle !== "" &&
                this.props.ent[i].value !== "<METADATA_ADD>" &&
                this.props.ent[i].sesarTitle !== "geological_age" &&
                this.props.ent[i].sesarTitle !== "field_name" &&
                this.props.ent[i].sesarTitle !== "sample_comment" &&
                this.props.ent[i].sesarTitle !== "description" &&
                this.props.ent[i].sesarTitle !== "size") {

                if (i === lastIndexOfContent && geological_age_found < 0 && field_found < 0 && sample_found < 0 && size_found < 0 && description_found < 0)
                    singlesAppendingString += "  " + this.props.ent[i].sesarTitle + ": \"" + this.props.ent[i].header + "\"\n"
                else
                    singlesAppendingString += "  " + this.props.ent[i].sesarTitle + ": \"" + this.props.ent[i].header + "\",\n"

            }

        }

        let multiAppendingString = ""
        if (geological_age_found > -1) {

            multiAppendingString += "  geological_age: ["
            for (let z = 0; z < this.props.ent.length; z++) {
                if (this.props.ent[z].sesarTitle === "geological_age") {
                    if (z === geological_age_found && (field_found < 0 && sample_found < 0 && size_found < 0 && description_found < 0))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\" ]\n"
                    else if (z === geological_age_found && (field_found > -1 || sample_found > -1 || size_found > -1 || description_found > -1))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\" ],\n"
                    else
                        multiAppendingString += " \"" + this.props.ent[z].header + "\", "
                }
            }
        }


        if (field_found > -1) {

            multiAppendingString += "  field_name: ["
            for (let z = 0; z < this.props.ent.length; z++) {
                if (this.props.ent[z].sesarTitle === "field_name") {
                    if (z === field_found && (sample_found < 0 && size_found < 0 && description_found < 0))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\" ]\n"
                    else if (z === field_found && (sample_found > -1 || size_found > -1 || description_found > -1))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\" ],\n"
                    else
                        multiAppendingString += " \"" + this.props.ent[z].header + "\", "

                }



            }
        }
        if (sample_found > -1) {

            multiAppendingString += "  sample_comment: ["
            for (let z = 0; z < this.props.ent.length; z++) {
                if (this.props.ent[z].sesarTitle === "sample_comment") {
                    if (z === sample_found && (size_found < 0 && description_found < 0))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\" ]\n"
                    else if (z === sample_found && (size_found > -1 || description_found > -1))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\" ],\n"
                    else if (z < lastIndexOfContent && z < sample_found)
                        multiAppendingString += " \"" + this.props.ent[z].header + "\", "
                }
            }
        }

        if (description_found > -1) {

            multiAppendingString += "  description: ["
            for (let z = 0; z < this.props.ent.length; z++) {
                if (this.props.ent[z].sesarTitle === "description") {
                    if (z === description_found && (size_found < 0))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\" ]\n"
                    else if (z === description_found && (size_found > -1))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\" ],\n"
                    else if (z < lastIndexOfContent && z < description_found)
                        multiAppendingString += " \"" + this.props.ent[z].header + "\", "
                }
            }
        }

        if (size_found > -1) {

            multiAppendingString += "  size: ["
            for (let z = 0; z < this.props.ent.length; z++) {
                if (this.props.ent[z].sesarTitle === "size") {
                    if (z === size_found)
                        multiAppendingString += " \"" + this.props.ent[z].header + "\" ]\n"
                    else if (z < lastIndexOfContent && z < size_found)
                        multiAppendingString += " \"" + this.props.ent[z].header + "\", "
                }
            }
        }

        let appendingString = singlesAppendingString + multiAppendingString + "}\n\n"

        letMapString = letMapString.concat(appendingString)

        return letMapString
    }

    logicFunctionAppend() {
        let id = 0;
        let logicID = ""

        for (let i = 0; i < this.props.ent.length; i++) {
            if ((this.props.ent[i].header === "<METADATA>" || this.props.ent[i].header === "<METADATA_ADD>") && this.props.ent[i].isGreen && this.props.ent[i].value !== "<METADATA_ADD>") {
                console.log(this.props.ent[i].sesarTitle)
                console.log(this.state.functionIDs)
                logicID = logicID + "  " + this.props.ent[i].sesarTitle + ": " + this.state.functionIDs[id] + ",\n"
                id++
            }
        }

        return logicID
    }

    createLogicAndCombination() {
        alert("Mapping Accepted!")
        const logic = "let logic = { " + "\n" + this.logicFunctionAppend() + "  collection_start_date: scrippsDate,\n  collection_end_date: scrippsDate,\n  geological_age: keyValueString,\n  field_name: keyValueString,\n  description: keyValueString,\n  sample_comment: keyValueString,\n  size: keyValueString\n  \}\n\n"

        const combination = `let combinations = {
  field_name: delimit,
  description: delimit,
  geological_age: delimit,
  sample_comment: delimit,
  size: delimit
\}\n\n`

        const endOfFile = "return {map, logic, combinations}\n"

        return logic + combination + endOfFile
    }

    finalAppend = () => {
        let dateDoubleCheck = "start"
        for (let i = 0; i < this.props.ent.length; i++) {
            if (this.props.ent[i].sesarTitle === "collection_start_date" || this.props.ent[i].sesarTitle === "collection_end_date") {
                dateDoubleCheck = this.props.dateFormat
                break;
            }
        }

        let fileString = "//Start::::\n"
        fileString = fileString + this.forceEditFunction()
        fileString = fileString + this.createMulitValueJoins()
        fileString = fileString + this.createDateFormatString(dateDoubleCheck)
        fileString = fileString + this.createMapString()
        fileString = fileString + this.createLogicAndCombination()
        //this.createSizeConversionString("mm") +
        //this.createSummate() +
        return fileString
    }


    createMapFile = () => {

        const fileOutput = new Blob([this.finalAppend()], { type: "text/javascript;charset=utf-8" })
        saveAs(fileOutput, "test.js")
    }

    render() {
        return (
            <div style={{ position: "absolute", left: "29.2%", paddingLeft: "200px", margin: "10 auto" }} className="marsOutput">
                <img className="mars--icon" src={mars} alt="marsIcon" onClick={() => this.createMapFile()}></img>
                <h4 style={{ fontFamily: "Lucida Grande", padding: "0%", margin: "0%" }}>Click to Map</h4>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        persist: state.persistingMetaData,
        multiValue: state.multiValues,
        singleMeasure: state.singleMeasureArr,
        dateFormat: state.substringDateFormat,
        centuryChosen: state.century
    };
};


export default connect(mapStateToProps, { formatDate })(MapOutput);