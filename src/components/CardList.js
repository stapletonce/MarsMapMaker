import React, {useState} from 'react';
import FieldCard from './FieldCard';
import { connect } from 'react-redux';
import './App.css';
import './Toolbar';
import {firstState} from '../actions/';
import DateFormat from './DateFormat';
import ReactModal from 'react-modal';

const CardList = (props) => {

    const [hide, setHide] = useState(false);
    const [showModal, setShowModal] = useState(false)

    let typeField = (f) => {
        let numbers = /^[0-9,/.]*$/;
        let final;

        if (numbers.test(f) === true)
            final = "numbers";
        else
            final = "text"
        return final
    }

    const objArray = []

    // maps through fields and creates unique field card entry for each
    //hiding: value to hide entry or not
    //fieldTitle: column attribute of an entry
    //fieldType: defines if content is number or text
    //fieldValue: the content of an column attribute
    //hasContent: for initial filtering of checked cards

    const fields = props.fields.map((field) => {
        //create an object and add it to store
        const storedValue = {
            sesarTitle: "",
            value: props.fieldVal[field],
            id: field,
            isDate: false,
            isMeasurement: false
        }
        //console.log( "this is a meme" + storedValue.value)
            objArray.push(storedValue)
            //props.intialMap(storedValue)


        return (
            <FieldCard hiding={hide} fieldTitle={field} fieldType={typeField(props.fieldVal[field])} fieldValue={props.fieldVal[field]} hasContent={props.fieldVal[field] !== ""} />
        );
    });
    
    //funciton to pass to modal windown
    const closeModal = () => {
        setShowModal(false);
    };

    const checkStore = () => {
        console.log("hey there ")
        console.log(objArray)
        console.log(props.ent)

        }

    return (

        <div>
            <DateFormat onClose={closeModal} appear={showModal}/>

            <div class="three ui buttons">
                <button class= "ui toggle button" onClick={() => setHide(!hide)}> Toggle </button>
                <button class= "ui basic button" onClick={ checkStore}> Format Date </button>
                <button class= "ui basic button" onClick={() => props.firstState(objArray)}> Help </button>
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

//const mapDispatchToProps = dispatch => {
 //   return {
  //      intialMap: () => dispatch({type: 'MAPPED_VALUE'})
  //  };
//};

export default connect(mapStateToProps, { firstState })(CardList);