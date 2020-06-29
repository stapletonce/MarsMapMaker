import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Components
import MapOutput from './MapOutput';
import DateDropdown from './DateDropdown';
import CenturyDropDown from './CenturyDropDown';
import FieldCard from './FieldCard';


import arrow from '../icons/loop.png';

// CSS & Style
import './App.css';

// Action Creators
import { firstState, isOpen } from '../actions/';
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
    const singleMeasureObj = {
        pairHeader: "",
        pairValue: "",
        currentID: -1
    }

    const sizeArray = [
        // In the case of an ordered pair for SIZE, only the first two objects are used [0, 1, x]
        // In the case of a single measurement for size, on the last object is used [x, x, 2]
        {
            pairHeader: "",
            pairValue: "",
            currentID: -1
        },
        {
            pairHeader: "",
            pairValue: "",
            currentID: -1
        }
    ]
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
    //const [setShowModal] = useState(false)
    //showModal ^

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

    const fields = props.fields.map((field) => {
        newKey += 1
        //create an object and add it to store
        const storedValue = {
            id: newKey,
            sesarTitle: "",
            oldValue: props.fieldVal[newKey],
            value: props.fieldVal[newKey],
            // this used to be id 
            header: field,
            isDate: false,
            isMeasurement: false,
            isGreen: props.fieldVal[newKey] !== ""
        }

        // after object is created, append it to the object array & add one to the ID
        objArray.push(storedValue)
        useOnce.push("")
        outerArr.push(sizeArray)
        singleMeasure.push(singleMeasureObj)




        // create the FieldCard that you see in the UI
        return (
            <FieldCard
                key={newKey}
                hiding={hide}
                fieldTitle={field}
                id={newKey}
                fieldType={typeField(props.fieldVal[newKey])}
                fieldValue={props.fieldVal[newKey]}
                hasContent={props.fieldVal[newKey] !== ""}
            />
        );
    });

    // uses the action "firstState" with the argument "objArray" to create the Redux Store ***ONE TIME***
    useEffect(() => {
        const initObj = {
            objArr: objArray,
            useOnce: useOnce,
            sizeOuter: outerArr,
            singleMeasureArr: singleMeasure
        }
        props.firstState(initObj)
    }, []);

    //funciton to pass to modal windown
    //const closeModal = () => {
    //setShowModal(false);
    //};

    // shows contents of the store if you click the "help" button in the console (FOR NOW)
    const checkStore = () => {
        console.log(props.singleMeasure)
        console.log(props.ent)
        console.log(props.outerArr)
        console.log("IS OPEN: " + props.hasBeenOpened)
        console.log("TOGGLE VALUES: " + Object.keys(props.toggleVals[0])[0])
    }

    // This helper function fills the multiValueArray where each index represents the "field_name", "description", or "sample_comment" selections
    const multiValueArrHelper = (options, index, multiArr) => {

        for (let j = 0; j < 3; j++) {
            if (options.indexOf(props.ent[index].sesarTitle) !== -1) {
                if (props.ent[index].value !== "") {
                    if (props.ent[index].sesarTitle === "geological_age") {
                        multiArr[options.indexOf(props.ent[index].sesarTitle)].push(" " + props.ent[index].header + ": " + props.ent[index].value)
                        break
                    }
                    else {
                        multiArr[options.indexOf(props.ent[index].sesarTitle)].push(props.ent[index].header + ": " + props.ent[index].value)
                        break
                    }

                }
                else {
                    multiArr[options.indexOf(props.ent[index].sesarTitle)].push(props.ent[index].header + ": NO_DATA")
                    break
                }

            }
        }
    }

    // Helper function add the "field_name", "description", "sample_comment" title to the beginning of the join(";") array index 
    const appendTitleToFront = (multiValueArr, options) => {
        for (let i = 0; i < 4; i++) {
            if (multiValueArr[i] !== "" && multiValueArr[i] !== undefined)
                if (i !== 3)
                    multiValueArr[i] = options[i] + " ==> " + multiValueArr[i]
                else
                    multiValueArr[i] = options[i] + " ==>" + multiValueArr[i]
        }
    }


    ////////// Shows (Map Preview / Size Selection Preview / Multi-Value Selections )
    const previewPopUp = () => {

        ////////////////
        // POP-UP LOCAL VARIABLES
        let options = ["field_name", "description", "sample_comment", "geological_age"]
        let multiValueArr = [[], [], [], []]
        let mapPreviewArr = []
        let sizeSelection = ["", "", "", ""]
        let fieldIndex = -1;
        let descripIndex = -1;
        let sampleIndex = -1;
        let geoIndex = -1;


        /////////////////////////////////////////////////////////
        /////////// Display Preview of Multi-Value Selections
        for (let i = 0; i < props.ent.length; i++) {
            if (props.ent[i].sesarTitle !== "" && props.ent[i].sesarTitle !== "size") {
                mapPreviewArr.push(String(props.ent[i].sesarTitle + ": " + props.ent[i].header))
            }
            multiValueArrHelper(options, i, multiValueArr)
        }
        for (let i = 0; i < 3; i++) {
            multiValueArr[i] = multiValueArr[i].join(";")
        }


        appendTitleToFront(multiValueArr, options)



        /////////////////////////////////
        ////////// Display Map Preview


        //////////////////////////////////////
        // Display Size Selection Preview
        for (let i = 0; i < props.ent.length; i++) {
            if (props.outerArr[i][0].pairHeader !== "") {
                if (sizeSelection[1] !== "")
                    sizeSelection[1] = sizeSelection[1] + "\n" + (props.outerArr[i][0].pairHeader + ": " + props.outerArr[i][1].pairHeader)
                else
                    sizeSelection[1] = sizeSelection[1] + (props.outerArr[i][0].pairHeader + ": " + props.outerArr[i][1].pairHeader)
            }
        }
        for (let i = 0; i < props.ent.length; i++) {
            if (props.singleMeasure[i].pairHeader !== "") {
                if (sizeSelection[3] !== "")
                    sizeSelection[3] = sizeSelection[3] + "\n" + (props.singleMeasure[i].pairHeader)
                else
                    sizeSelection[3] = sizeSelection[3] + (props.singleMeasure[i].pairHeader)
            }
        }

        let finalSizeSelection = sizeSelection.join("\n")
        let finalMap = mapPreviewArr
        let finalMultiValue = (multiValueArr.join("\n"))

        for (let i = 0; i < finalMap.length; i++) {
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
        }
        let arr = []
        for (let i = 0; i < finalMap.length; i++) {
            if (!(arr.includes(finalMap[i]))) {
                if (!(finalMap[i].includes(options[0]) && i !== fieldIndex))
                    arr.push(finalMap[i])
                else if (!(finalMap[i].includes(options[1]) && i !== descripIndex))
                    arr.push(finalMap[i])
                else if (!(finalMap[i].includes(options[2]) && i !== sampleIndex))
                    arr.push(finalMap[i])
            }

        }
        if (finalSizeSelection !== "") {
            arr.push("size: " + finalSizeSelection.replace("\n", ""))
        }


        let finalArray = [finalSizeSelection, arr, finalMultiValue]

        return finalArray

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
                    <div className="dropDown1" >
                        <p>Formatting required***</p>
                        <DateDropdown className="requireOption" list={dateFormatOption} />
                        <CenturyDropDown className="requireOption" />
                    </div>
                    <div className="arrowDiv">
                        <img className="arrowIcon" src={arrow} alt="arrowIcon" onClick={() => { console.log(props.toggleArr) }}></img>
                        <p>Toggle Content</p>
                    </div>
                    {/*replace this div with new component*/}
                    {/* <div style={{ float: "right", paddingTop: "1%", paddingLeft: "1.2em", paddingRight: "2em" }} align="center" className="marsIcon">
                        <img className="mars" src={mars} alt="marsIcon" onClick={checkStore}></img>
                        <h4 style={{ padding: "0%", margin: "0%" }}>Click to Map</h4>
                    </div> */}
                    <MapOutput />

                    <div style={{ paddingTop: "3em" }} className="dropDown2" >
                        <button className="ui toggle button" onClick={() => setHide(!hide)}> Hide Unused </button>
                        <button className="ui basic button" onClick={() => { props.callback(previewPopUp()) }}> Preview Map </button>
                        <button className="ui basic button" onClick={checkStore}> Help </button>
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
                        <object className="arrowInfo">
                            Maps To
                        </object>

                        <object className="dropDownWidget" align="right">
                            <div className="mappedValue">Mapped Content</div>
                            <div className="dropDownInfo"><b>[</b>Mapped Header<b>]</b></div>
                            {(true) ?
                                <object className="mappedValue" style={{ paddingRight: "70px" }}>
                                    Type </object> : <div className="padRight"> Type </div>}
                        </object>

                    </div>
                </div>

                <div className="ui-card" >{fields}</div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        sizeArray: state.sizeArray,
        sizeOuter: state.sizeOuterArray,
        singleMeasure: state.singleMeasureArr,
        outerArr: state.sizeOuterArray,
        multi: state.multiValues,
        setDa: state.substringDateFormat,
        cent: state.century,
        hasInit: state.hasInit,
        hasBeenOpened: state.isOpen,
        toggleArr: state.toggleArr
    };
};

export default connect(mapStateToProps, { firstState, isOpen })(CardList);