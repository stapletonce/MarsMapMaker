import React from 'react';
import FieldCard from './FieldCard';
import { connect } from 'react-redux';
import './App.css';


const CardList = (props) => {

    const fields = props.fields.map((field) => {

        return (
            <FieldCard fieldTitle={field} fieldValue={props.fieldVal[field]} hasContent={props.fieldVal[field] !== ""} />

        );
    });


    return (
        <div>
            <div className="ui-card">{fields}</div>
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log(state)
}


export default connect(mapStateToProps)(CardList);