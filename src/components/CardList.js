///////////////////////////////////////////////////////////////////////////////////
// CARDLIST.JS ///////////////////////////////////////////////////////////////////
// This component takes data from App.js and creates the cards displayed in UI //
// Renders and creates the toolbar and the fieldCards displayed in UI //////////
///////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import MapOutput from './MapOutput';
import DateDropdown from './DateDropdown';
import CenturyDropDown from './CenturyDropDown';
import FieldCard from './FieldCard';

// CSS & Style
import './App.css';

// REDUX
import { firstState, toggleInUse } from '../actions/';
///////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// there is a particular relationship between checked value and available option in dropdown
// consider formatting specs for outside of 1 to 1 version, comment fields
// add another array in store for values that adds values that can only be used once, iterate array before updating store with new dropdown clicks

const CardList = (props) => {

    // global variables for the Object Array the Redux Store is built on along with the id accumulator 

    const objArray = []
    const useOnce = []
    const outerArr = []
    const singleMeasure = []
    let newKey = -1

    const dateFormatOption = [
        { title: "Select Date Format" },
        { title: "DD/MM/YY or DD-MM-YY", value: "substring", type: "date" },
        { title: "MM/DD/YY or MM-DD-YY", value: "substring", type: "date" },
        { title: "YY/DD/MM or YY-DD-MM", value: "substring", type: "date" },
        { title: "YY/MM/DD or YY-MM-DD", value: "substring", type: "date" },
        { title: "DD/MM/YYYY or DD-MM-YYYY", value: "substring", type: "date" },
        { title: "MM/DD/YYYY or MM-DD-YYYY", value: "substring", type: "date" },
        { title: "YYYY/DD/MM or YYYY-DD-MM", value: "substring", type: "date" },
        { title: "YYYY/MM/DD or YYYY-MM-DD", value: "substring", type: "date" },
        { title: "MMDDYYYY", value: "substring", type: "date" },
        { title: "DDMMYYYY", value: "substring", type: "date" },
        { title: "YYYYDDMM", value: "substring", type: "date" },
        { title: "YYYYMMDD", value: "substring", type: "date" }
    ]

    // used to hide 'non-green / non-checked fields in the UI (hides field and checks)
    const [hide, setHide] = useState(false);
    // used to toggle between the tuples of the csv loaded in
    const [toggleIndex, addToToggleIndex] = useState(0)

    // helper function to dicide the the contents of dropdowns for specific fieldcards
    // if fieldValue contains "0-9 or symbols" it's 'type' will be numbers, else, the type is text
    let typeField = (f) => {

        let type;
        let numbers = /^[0-9,/.-]*$/;

        if (f === "")
            type = "both";
        else if (numbers.test(f) === true)
            type = "numbers";
        else
            type = "text"
        return type
    }

    // maps through fields and creates unique field card entry for each
    // hiding: value to hide entry or not
    // fieldTitle: column attribute of an entry
    // fieldType: defines if content is number or text
    // fieldValue: the content of an column attribute
    // hasContent: for initial filtering of checked cards

    // Content Toggle right->add 1, left->sub 1, refresh->reset to 0
    const rightArrowToggle = () => {
        if (toggleIndex < 9) {
            addToToggleIndex((toggleIndex + 1) % props.toggleArr.length)
            let obj = {
                bool: true
            }
            props.toggleInUse(obj)
        }
    }

    const leftArrowToggle = () => {
        if (toggleIndex > 0) {
            addToToggleIndex((toggleIndex - 1) % props.toggleArr.length)
            let obj = {
                bool: true
            }
            props.toggleInUse(obj)
        }
    }

    const refreshButton = () => {
        addToToggleIndex(0)
        let obj = {
            bool: true
        }
        props.toggleInUse(obj)
    }

    const findSesarPassIn = (field) => {
        let sesarPassIn = "";
        if (props.jsFileValues !== undefined)
            for (let i = 0; i < props.jsFileValues.length; i++) {
                if (field === props.jsFileValues[i][1].replace(" ", "")) {
                    sesarPassIn = (props.jsFileValues[i][0])
                }
            }
        return sesarPassIn
    }

    // maps content to separate fieldcards on the screen
    const fields = props.fields.map((field) => {
        newKey += 1

        let sesarFind = findSesarPassIn(field)

        //create an object and add it to store
        let storedValue = {
            id: newKey,
            sesarTitle: sesarFind,
            oldValue: props.fieldVal[newKey],
            value: props.fieldVal[newKey],
            // this used to be id 
            header: field,
            isDate: false,
            isMeasurement: false,
            isGreen: props.fieldVal[newKey] !== ""
        }

        // after object is created, append it to the object array & add one to the ID
        useOnce.push("")
        objArray.push(storedValue)

        // create the FieldCard that you see in the UI
        // If toggleIndex is 0 then we're on the 1st row so give it raw input
        // Else give it the object.values..
        if (toggleIndex === 0) {
            return (<FieldCard
                jsFileValues={props.jsFileValues}
                toggleInUse={props.usingToggle}
                key={newKey}
                hiding={hide}
                fieldTitle={field}
                id={newKey}
                fieldType={typeField(props.fieldVal[newKey])}
                fieldValue={props.fieldVal[newKey]}
                hasContent={props.fieldVal[newKey] !== ""}
            />)

        }
        else {
            return (
                <FieldCard
                    jsFileValues={props.jsFileValues}
                    toggleInUse={props.usingToggle}
                    key={newKey}
                    hiding={hide}
                    fieldTitle={Object.keys(props.toggleArr[toggleIndex])[newKey]}
                    id={newKey}
                    fieldType={typeField(props.fieldVal[newKey])}
                    fieldValue={Object.values(props.toggleArr[toggleIndex])[newKey]}
                    hasContent={props.fieldVal[newKey] !== ""}
                />
            );
        }
    });


    // uses the action "firstState" with the argument "objArray" to create the Redux Store ***ONE TIME***
    useEffect(() => {
        const initObj = {
            objArr: objArray,
            useOnce: useOnce,
        }
        props.firstState(initObj)
    }, []);


    // shows contents of the store if you click the "help" button in the console (FOR NOW)
    const checkStore = () => {
        console.log(props.ent)
    }

    // This helper function fills the multiValueArray where each index represents the "field_name", "description", or "sample_comment" selections
    const multiValueArrHelper = (options, index, multiArr) => {
        let j;
        for (j = 0; j < 3; j++) {
            if (options.indexOf(props.ent[index].sesarTitle) !== -1) {
                if (props.ent[index].value !== "") {
                    multiArr[options.indexOf(props.ent[index].sesarTitle)].push(props.ent[index].header + ":" + props.ent[index].value)
                    break
                }
                else {
                    multiArr[options.indexOf(props.ent[index].sesarTitle)].push(props.ent[index].header + ":NO_DATA")
                    break
                }
            }
        }
    }

    // Helper function add the "field_name", "description", "sample_comment" title to the beginning of the join(";") array index 
    const appendTitleToFront = (multiValueArr, options) => {
        let i
        for (i = 0; i < 5; i++) {
            if (multiValueArr[i] !== "" && multiValueArr[i] !== undefined)
                multiValueArr[i] = options[i] + " ==> " + multiValueArr[i]
        }
    }


    ////////// Shows (Map Preview / Size Selection Preview / Multi-Value Selections )
    const previewPopUp = () => {

        ////////////////
        // POP-UP LOCAL VARIABLES
        let options = ["field_name", "description", "sample_comment", "geological_age", "size"]
        let multiValueArr = [[], [], [], [], []]
        let mapPreviewArr = []
        //let sizeSelection = ["", "", "", ""]
        let fieldIndex = -1;
        let descripIndex = -1;
        let sampleIndex = -1;
        let geoIndex = -1;
        let sizeIndex = -1;
        let finalSizeSelection;
        let finalMap;
        let finalMultiValue;
        let finalArray;
        let arr = [];
        let i;

        /////////////////////////////////////////////////////////
        /////////// Display Preview of Multi-Value Selections
        for (i = 0; i < props.ent.length; i++) {
            if (props.ent[i].sesarTitle !== "") {
                mapPreviewArr.push(String(props.ent[i].sesarTitle + ":" + props.ent[i].header))
            }
            multiValueArrHelper(options, i, multiValueArr)
        }
        for (i = 0; i < 5; i++) {
            multiValueArr[i] = multiValueArr[i].join("; ")
        }
        appendTitleToFront(multiValueArr, options)

        finalSizeSelection = []
        finalMap = mapPreviewArr
        finalMultiValue = (multiValueArr.join("\n"))

        for (i = 0; i < finalMap.length; i++) {
            if (finalMap[i].includes(options[0])) {
                finalMap[i] = multiValueArr[0]
                if (fieldIndex === -1) {
                    fieldIndex = i
                }
            }
            else if (finalMap[i].includes(options[1])) {
                finalMap[i] = multiValueArr[1]
                if (descripIndex === -1) {
                    descripIndex = i
                }
            }
            else if (finalMap[i].includes(options[2])) {
                finalMap[i] = multiValueArr[2]
                if (sampleIndex === -1) {
                    sampleIndex = i
                }
            }
            else if (finalMap[i].includes(options[3])) {
                finalMap[i] = multiValueArr[3]
                if (geoIndex === -1) {
                    geoIndex = i
                }
            }
            else if (finalMap[i].includes(options[4])) {
                finalMap[i] = multiValueArr[4]
                if (sizeIndex === -1) {
                    sizeIndex = i
                }
            }
        }
        for (i = 0; i < finalMap.length; i++) {
            if (!(arr.includes(finalMap[i]))) {
                if (!(finalMap[i].includes(options[0]) && i !== fieldIndex))
                    arr.push(finalMap[i])
                else if (!(finalMap[i].includes(options[1]) && i !== descripIndex))
                    arr.push(finalMap[i])
                else if (!(finalMap[i].includes(options[2]) && i !== sampleIndex))
                    arr.push(finalMap[i])
                else if (!(finalMap[i].includes(options[3]) && i !== geoIndex))
                    arr.push(finalMap[i])
                else if (!(finalMap[i].includes(options[4]) && i !== sizeIndex))
                    arr.push(finalMap[i])
            }
        }

        finalArray = [finalSizeSelection, arr, finalMultiValue]

        return finalArray
    }

    const dateSelected = () => {
        let found = false
        for (let i = 0; i < props.ent.length; i++) {
            if (props.ent[i].sesarTitle === "collection_start_date" || props.ent[i].sesarTitle === "collection_end_date") {
                found = true
            }
        }
        return found
    }


    return (

        /////////////////////////
        // TOOLBAR /////////////
        ///////////////////////
        // Field Cards ///////
        /////////////////////

        <div>
            <div className="label">
                <div className="label">
                    <div className="arrowDiv">
                        <h4 className="ui header" style={{ fontSize: "18px", padding: "0px", margin: "0px" }}>
                            <div className="content">
                                Toggle Content
                            </div>
                        </h4>
                        <div disabled className="ui grey ribbon label">Current Row: {toggleIndex}</div>
                        <button className="ui icon button" style={{ display: "inline-block", width: "60px" }} onClick={() => leftArrowToggle()}>
                            <i className="left arrow icon"></i>
                        </button>
                        <button className="ui icon button" style={{ display: "inline-block", width: "110px" }} onClick={() => refreshButton()}>
                            Refresh
                        </button>
                        <button className="ui icon button" style={{ display: "inline-block", width: "60px" }} onClick={() => rightArrowToggle()}>
                            <i className="right arrow icon"></i>
                        </button>
                    </div>

                    <MapOutput />

                    <div style={{ paddingTop: "3em", width: "15%" }} className="dropDown2" >
                        <button className="ui toggle button" onClick={() => setHide(!hide)}> Hide Unused </button>
                        <button className="ui basic button" onClick={() => { props.callback(previewPopUp()) }}> Preview Map </button>
                        <button className="ui basic button" onClick={checkStore}> Help </button>
                    </div>

                    <div style={{ width: "25%", display: "inline-block", float: "right", paddingLeft: "10px", paddingRight: "0px", marginRight: "0px" }}>
                        {(props.hasDateFormat === false || dateSelected() === false) ?
                            <div style={{ width: "100px", margin: "10px", padding: "10px" }} className="ui right pointing red basic label">
                                Select Date Format
                        </div> : <div style={{ visibility: "hidden", width: "100px", margin: "10px", padding: "10px" }} className="ui right pointing red basic label">
                                Select Date Format
                        </div>}

                        {(props.hasDateFormat === false || dateSelected() === false) ?
                            <div className="dropDown1" style={{ borderColor: "red" }} >
                                <DateDropdown className="requireOption" list={dateFormatOption} />
                                <CenturyDropDown className="requireOption" />
                            </div> : <div className="dropDown1">
                                <DateDropdown className="requireOption" list={dateFormatOption} />
                                <CenturyDropDown className="requireOption" />
                            </div>}
                    </div>
                </div>

                <div className="uiInfo labelInfo">
                    <div>
                        <object className="fieldWidget">
                            <div className="checkBoxInfo">
                                Use
                            </div>
                            <div dir="rtl" className="fieldTitle">:Header</div>
                            <div className="fieldVal"> Content</div>
                        </object>
                        <object className="dropDownWidget" align="right">
                            <div className="mappedValue">Mapped Content</div>
                            <div className="dropDownInfo"><b>[</b>Mapped Header<b>]</b></div>
                        </object>
                    </div>
                </div>

                <div className="ui-card" >{fields}</div>
            </div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a
                href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        toggleArr: state.toggleArr,
        toggleIndex: state.toggleIndex,
        usingToggle: state.toggleInUse,
        hasDateFormat: state.hasChosenDateFormat,
        storeJsFile: state.jsFile
    };
};

export default connect(mapStateToProps, { firstState, toggleInUse })(CardList);