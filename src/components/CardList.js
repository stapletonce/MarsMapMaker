import React, { useState, useEffect } from 'react';
import FieldCard from './FieldCard';
import { connect } from 'react-redux';
import './App.css';

import { firstState } from '../actions/';
import DateFormat from './DateFormat';
// import ReactModal from 'react-modal';

// there is a particular relationship between checked value and available option in dropdown
// consider formatting specs for outside of 1 to 1 version, comment fields
// add another array in store for values that adds values that can only be used once, iterate array before updating store with new dropdown clicks

const CardList = (props) => {

    // global variables for the Object Array the Redux Store is built on along with the id accumulator 
    const objArray = []
    const useOnce = []
    let newKey = -1

    // used to hide 'non-green / non-checked fields in the UI (hides field and checks)
    const [hide, setHide] = useState(false);
    const [showModal, setShowModal] = useState(false)

    // helper function to dicide the the contents of dropdowns for specific fieldcards
    // if fieldValue contains "0-9 or symbols" it's 'type' will be numbers, else, the type is text
    let typeField = (f) => {

        let type;
        let numbers = /^[0-9,/.]*$/;

        if (numbers.test(f) === true)
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

        //create an object and add it to store
        const storedValue = {
            sesarTitle: "",
            value: props.fieldVal[field],
            id: field,
            isDate: false,
            isMeasurement: false
        }

        // after object is created, append it to the object array & add one to the ID
        objArray.push(storedValue)
        useOnce.push("")
        newKey += 1

        // create the FieldCard that you see in the UI
        return (
            <FieldCard
                hiding={hide}
                fieldTitle={field}
                id={newKey}
                fieldType={typeField(props.fieldVal[field])}
                fieldValue={props.fieldVal[field]}
                hasContent={props.fieldVal[field] !== ""}
            />
        );
    });

    let initObj = {
        objArr: objArray,
        useOnce: useOnce
    }

    // uses the action "firstState" with the argument "objArray" to create the Redux Store ***ONE TIME***
    useEffect(() => {
        props.firstState(initObj)
    }, []);

    //funciton to pass to modal windown
    const closeModal = () => {
        setShowModal(false);
    };

    // shows contents of the store if you click the "help" button in the console (FOR NOW)
    const checkStore = () => {
        console.log(props.ent)
    }

    return (
        <div>
            <DateFormat onClose={closeModal} appear={showModal} />

            <div class="three ui buttons">
                <button class="ui toggle button" onClick={() => setHide(!hide)}> Toggle </button>
                <button class="ui basic button" onClick={checkStore}> Format Date </button>
                <button class="ui basic button" onClick={checkStore}> Help </button>
            </div>
            <div className="ui-card" >{fields}</div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries
    };
};

export default connect(mapStateToProps, { firstState })(CardList);