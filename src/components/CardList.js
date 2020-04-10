import React from 'react';
import FieldCard from './FieldCard';
import { connect } from 'react-redux';
import './App.css';


const CardList = (props) => {



    let typeField = (f) => {
        let numbers = /^[0-9,/.]*$/;
        let final;

        if (numbers.test(f) === true)
            final = "numbers";
        else
            final = "text"
        return final
    }

    const fields = props.fields.map((field) => {

        return (
            <FieldCard fieldTitle={field} fieldType={typeField(props.fieldVal[field])} fieldValue={props.fieldVal[field]} hasContent={props.fieldVal[field] !== ""} />

        );
    });

    return (
        <div>
            <div className="ui-card">{fields}</div>
        </div>
    );
}

const mapStateToProps = (state) => {
}


export default connect(mapStateToProps)(CardList);