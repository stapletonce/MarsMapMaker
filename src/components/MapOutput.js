import React from 'react';
import { connect } from 'react-redux';
import saveAs from 'file-saver';
import { formatDate } from "../actions/"

import mars from '../icons/planet.png';

class MapOutput extends React.Component {
    constructor(props) {
        super(props);
       

    }

    //this takes in the chosen date format and creates the text that corresponds to how the user wants the entry to be manipulated
    createDateFormatString = (chosenFormat) => {
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
                prefix = this.props.centuryChosen.substr(0,2)
                y = "0,2"
                d = "6,2"
                m = "3,2"
                break;
            case "MM/DD/YY":
                prefix = this.props.centuryChosen.substr(0,2)
                y = "6,2"
                d = "3,2"
                m = "0,2"
                break;
            case "YY/DD/MM":
                prefix = this.props.centuryChosen.substr(0,2)
                y = "0,2"
                d = "3,2"
                m = "6,2"
                break;
            case "DD/MM/YY":
                prefix = this.props.centuryChosen.substr(0,2)
                y = "6,2"
                d = "0,2"
                m = "3,2"
                break;
        }

        let letDateString = "const scrippsDate = (scrippsValue) => {\n  const y  =  \"" + prefix + "\" + " + "scrippsValue.substr(" + y + ")\n  const d = scrippsValue.substr(" + d + ")\n  const m = scrippsValue.substr(" + m + ")\n  return y + '-' + m + '-' + d + 'T00:00:00Z'\n}\n"
        return letDateString
    }

    //this method loops through the array entries in the store multiple times to append to the string based on corresponding SesarTitles selected that
    createMapString() {
        let letMapString = "let map = {\n"
        let lastIndexOfContent = -1
        let singleLastIndexOfContent = -1
        let sample_found = -1
        let description_found = -1
        let field_found = -1
        let size_found = -1

        //for formatting need to track the relative last entry of each multivalue and single value and the last entry used
        
        for (let j = 0; j < this.props.ent.length; j++){
            //these conditionals track the last occurance of each type of sesarTitle
            if (this.props.ent[j].sesarTitle !==  "" && this.props.ent[j].sesarTitle !== "field_name" && this.props.ent[j].sesarTitle !== "sample_comment" && this.props.ent[j].sesarTitle !== "description" && this.props.ent[j].sesarTitle !== "size")
                singleLastIndexOfContent = j
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
        const findFinalPosition = [singleLastIndexOfContent, sample_found, description_found, field_found, size_found]
        lastIndexOfContent = Math.max(...findFinalPosition)
        
        
        let singlesAppendingString = "";
        for (let i = 0; i < this.props.ent.length; i++) {
            if (this.props.ent[i].sesarTitle !== "" &&
            this.props.ent[i].sesarTitle !== "field_name" &&
            this.props.ent[i].sesarTitle !== "sample_comment" &&
            this.props.ent[i].sesarTitle !== "description" &&
            this.props.ent[i].sesarTitle !== "size"){
  
                if (i !== singleLastIndexOfContent || i + 1 >= this.props.ent.length)
                    singlesAppendingString += "     " + this.props.ent[i].sesarTitle + ": " + this.props.ent[i].header + ",\n"
                else if (i === lastIndexOfContent && field_found < 0 && sample_found < 0 && size_found < 0 && description_found < 0)
                    singlesAppendingString += "     " + this.props.ent[i].sesarTitle + ": " + this.props.ent[i].header
                else if (i === singleLastIndexOfContent)
                    singlesAppendingString += "     " + this.props.ent[i].sesarTitle + ": " + this.props.ent[i].header + ",\n"
            }
            
        }
       
        let multiAppendingString = ""
        if (field_found > -1) {
            
            multiAppendingString += "     field_name: ["
            for (let z = 0; z < this.props.ent.length; z++){
                if (this.props.ent[z].sesarTitle === "field_name"){
                    if (z === field_found && (sample_found < 0 || size_found < 0 || description_found < 0))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\"]\n"
                    else if (z === field_found && (sample_found > -1 || size_found > -1 || description_found > -1))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\"],\n"
                    else if (z < lastIndexOfContent)
                        multiAppendingString += "\"" + this.props.ent[z].header + "\", "
                }
                

            
            }
        }
        if (sample_found > -1){
            
            multiAppendingString += "     sample_comment: ["
            for (let z = 0; z < this.props.ent.length; z++){
                if (this.props.ent[z].sesarTitle === "sample_comment"){
                    if (z === sample_found && (size_found < 0 || description_found < 0))
                        multiAppendingString += "\"" + this.props.ent[z].header + "\"]\n"
                    else if (z === sample_found && (size_found > -1 || description_found > -1))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\"],\n"
                    else if (z < lastIndexOfContent)
                        multiAppendingString += "\"" + this.props.ent[z].header + "\", "
                    }
            }
        }

        if (description_found > -1){
            
            multiAppendingString += "     description: ["
            for (let z = 0; z < this.props.ent.length; z++){
                if (this.props.ent[z].sesarTitle === "description"){
                    if (z === description_found && (size_found < 0))
                        multiAppendingString += "\"" + this.props.ent[z].header + "\"]\n"
                    else if (z === description_found && (size_found > -1))
                        multiAppendingString += " \"" + this.props.ent[z].header + "\"],\n"
                    else if (z < lastIndexOfContent)
                        multiAppendingString += "\"" + this.props.ent[z].header + "\", "
                    }
            }
        }

        if (size_found > -1){
            
            multiAppendingString += "     size: ["
            for (let z = 0; z < this.props.ent.length; z++){
                if (this.props.ent[z].sesarTitle === "size"){
                    if (z === size_found)
                        multiAppendingString += "\"" + this.props.ent[z].header + "\"]\n"
                    else if (z < lastIndexOfContent)
                        multiAppendingString += "\"" + this.props.ent[z].header + "\", "
                    }
            }
        }

        let appendingString = singlesAppendingString + multiAppendingString + "}\n"

        letMapString = letMapString.concat(appendingString)
        
        return letMapString
    }

    finalAppend = () => {
        let fileString = "//Start::::\n"
        alert(this.props.dateFormat)
        return fileString + this.createDateFormatString(this.props.dateFormat) + this.createMapString()
    }


    createMapFile = () => {
        
        const fileOutput = new Blob([ this.finalAppend() ] ,{type: "text/javascript;charset=utf-8"})
        saveAs(fileOutput, "test.js")
    }

    render() {
        return (
            <div style={{ float: "right", paddingTop: "1%", paddingLeft: "1.2em", paddingRight: "2em" }} align="center" className="marsIcon">
                            <img className="mars" src={mars} alt="marsIcon" onClick={ () => this.createMapFile()}></img>
                            <h4 style={{ padding: "0%", margin: "0%" }}>Click to Map</h4>
                        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        multiValue: state.multiValues,
        pairMeasurement: state.sizeOuterArray,
        singleMeasure: state.singleMeasureArr,
        dateFormat: state.substringDateFormat,
        centuryChosen: state.century
    };
};
    

export default connect(mapStateToProps, { formatDate })(MapOutput);