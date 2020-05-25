import React from "react";
import "semantic-ui-react";
import { connect } from "react-redux";
import { dropdownUpdate } from "../actions/"



class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            century: null,
            list: this.props.list,
            currentChosen: null,
            headerTitle: this.props.title,
            value: "select",
            selectedValue: "",
            sesarOneToOne: this.props.one2one
        };
    }

    logicHelper = (fS, fA, dS) => {

        if (fS.includes("YYYY")) {
            for (let i = 0; i < 3; i++) {
                if (fS[i] === "YYYY" && dS[i].length !== 4) {
                    console.log("You have selected a format that doesn't match the data provided from the file... please try another format (YYYY format for YY)")
                    return null
                }
            }
        }

        for (let j = 0; j < 3; j++) {
            if (dS[j].includes("/") || dS[j].includes("-")) {
                dS[j] = dS[j].toLowerCase().replace(/[/-]/g, '');

                for (let i = 0; i < 3; i++) {
                    if (fS[i].length !== dS[i].length) {
                        console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Length error)")
                        return null
                    }
                }
            }
        }

        if (fS.includes("/") && !dS.includes("/")) {
            console.log("Delimiter error")
            return null
        }

        else if (fS[0] === "MM" && dS[0] > 12) {
            console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")
            return null
        }

        else if (fS[1] === "MM" && dS[1] > 12) {
            console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")
            return null
        }
        else if (fS[2] === "MM" && dS[2] > 12) {
            console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")
            return null
        }

        if (fS[0] === "DD") {
            fA[2] = dS[0]
            fA[1] = dS[1]
            fA[0] = dS[2]
        }
        else if (fS[0] === "MM") {
            fA[1] = dS[0]
            fA[2] = dS[1]
            fA[0] = dS[2]
        }
        else if (fS[2] === "MM") {
            fA[1] = dS[2]
            fA[0] = dS[0]
            fA[2] = dS[1]
        }
        else if (fS[2] === "DD") {
            fA[2] = dS[2]
            fA[0] = dS[0]
            fA[1] = dS[1]
        }

        let returnString = fA[0] + "-" + fA[1] + "-" + fA[2]

        return returnString
    }


    formatDate = (value, format, title) => {
        let finalArray = ["", "", ""]
        let update;

        // makes sure a format has been chosen!
        if (format === null) {
            console.log("PLEASE SELECT A FORMAT!!!")
            return
        }

        // if format chosen contains delimiters
        if (format.includes("/") || format.includes("-")) {
            let dateSplit = value.split(/[-/]/)
            let formatSplit = format.split(/[-/ ]/)

            if (dateSplit[2].length === 2 && formatSplit[2] === "YY") {

                if (parseInt(dateSplit[2]) > 30) {
                    dateSplit[2] = "19" + dateSplit[2]
                }
                else
                    dateSplit[2] = "20" + dateSplit[2]

                update = this.logicHelper(formatSplit, finalArray, dateSplit)

            }

            if (dateSplit[0].length === 2 && formatSplit[0] === "YY") {

                if (parseInt(dateSplit[0]) > 30) {
                    dateSplit[0] = "19" + dateSplit[0]
                }
                else
                    dateSplit[0] = "20" + dateSplit[0]

                update = this.logicHelper(formatSplit, finalArray, dateSplit)

            }
            // if DD-MM-YYYY is selected instead of just DD-MM-YY
            else {
                update = this.logicHelper(formatSplit, finalArray, dateSplit)

            }

            if (update === null) {
                return
            }


            const obj = {
                id: this.props.id,
                sesarSelected: title,
                value: update,
                header: this.props.title
            }
            this.props.dropdownUpdate(obj)

            return
        }

        // if format chosen comes in the form of yyyymmdd etc...
        let dateSplit = value.split('')
        let formatSplit = format.split('')
        let newDateSplit = ["", "", ""]
        let newFormatSplit = ["", "", ""]

        if ((formatSplit[0] === "M" && formatSplit[1] === "M") || (formatSplit[0] === "M" && formatSplit[1] === "M")) {
            newDateSplit[0] = dateSplit[0] + dateSplit[1]
            newFormatSplit[0] = formatSplit[0] + formatSplit[1]
            newDateSplit[1] = dateSplit[2] + dateSplit[3]
            newFormatSplit[1] = formatSplit[2] + formatSplit[3]
            newDateSplit[2] = dateSplit[4] + dateSplit[5] + formatSplit[6] + formatSplit[7]
            newFormatSplit[2] = formatSplit[4] + formatSplit[5] + formatSplit[6] + formatSplit[7]
        }
        else {
            newDateSplit[0] = dateSplit[0] + dateSplit[1] + dateSplit[2] + dateSplit[3]
            newFormatSplit[0] = formatSplit[0] + formatSplit[1] + formatSplit[2] + formatSplit[3]
            newDateSplit[1] = dateSplit[4] + dateSplit[5]
            newFormatSplit[1] = formatSplit[4] + formatSplit[5]
            newDateSplit[2] = dateSplit[6] + dateSplit[7]
            newFormatSplit[2] = formatSplit[6] + formatSplit[7]
        }

        for (let i = 0; i < 3; i++) {
            if (newFormatSplit[i].includes("D") && newFormatSplit[i].includes("M")) {
                console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")
                return
            }
            else if (newFormatSplit[i].includes("D") && newFormatSplit[i].includes("Y")) {
                console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")
                return
            }
            else if (newFormatSplit[i].includes("M") && newFormatSplit[i].includes("Y")) {
                console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")
                return
            }

        }

        update = this.logicHelper(newFormatSplit, finalArray, newDateSplit)

        if (update === null) {
            return
        }

        const obj = {
            id: this.props.id,
            sesarSelected: title,
            value: update,
            header: this.props.title
        }
        this.props.dropdownUpdate(obj)

        return

        // next step is to store this sesar format date into the redux store for the correct field upon choosing one of the date options
        // also, there should be some robust error handling that checks the value to make sure it even qualifies as a date
        // also to think further on that, check if the users value matches their format selection, if not send an error
    }

    // uses the clicked list-item in the dropdown to create an object to be passed into the dropdownUpdate action
    // updates specific object in the redux store
    updateValue = e => {
        const newValue = e.target.value
        let breakOrFormat;


        if (this.props.dateFormat != null)
            breakOrFormat = this.props.dateFormat.split(" ")

        if ((newValue === "collection_end_date" || newValue === "collection_start_date") && !this.props.hasChosen) {
            console.log("Please choose a date format!!!")
            return
        }

        else if ((newValue === "collection_end_date" || newValue === "collection_start_date") && this.props.hasChosen) {

            if ((breakOrFormat.includes("/") || breakOrFormat.includes("-")) && (!this.props.value.includes("/") || !this.props.value.includes("-"))) {
                console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Delimiter error)")
                return
            }

            else if ((this.props.dateFormat.includes("/") || this.props.dateFormat.includes("-")) && (!this.props.value.includes("/") && !this.props.value.includes("-"))) {
                console.log(this.props.dateFormat)
                console.log(this.props.value)
                console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Delimiter error)")
                return
            }

            this.formatDate(this.props.value, this.props.dateFormat, newValue)
            return
        }

        const obj = {
            id: this.props.id,
            sesarSelected: newValue,
            value: this.props.value,
            header: this.props.title
        }

        this.props.dropdownUpdate(obj)
        //this.props.value.toLowerCase().replace(/[ -/*_#]/g, '')

    }

    render() {
        const sesarOne2One = this.state.sesarOneToOne
        // helper function to list "options" based on the 'type' of field (numbers or letters...) 
        let filter = (f) => {

            // code works, "current archive" is obviously a placeholder for now just to make sure the logic works
            if (f.type === this.props.fieldType || f.type === "both") {
                if (!this.props.useOnce.includes(f.title))
                    return <option key={f.title} value={f.title}>{f.title}</option>;
                else if (this.props.useOnce.includes(f.title) && !sesarOne2One.includes(f.title))
                    return <option key={f.title} value={f.title}>{f.title}</option>;
                else if (this.props.useOnce.indexOf(f.title) === this.props.id)
                    return <option key={f.title} value={f.title}>{f.title}</option>;


            }
        };

        // creates the dropdown, uses filter() to specify which items are included in dropdown
        return (
            <select className="ui search dropdown" prompt="Please select option" onChange={this.updateValue}>
                {this.props.list.map((field) => filter(field))}
            </select>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        useOnce: state.useOnce,
        dateFormat: state.chosenDateFormat,
        hasChosen: state.hasChosenDateFormat,
        num: state.numOfOneToOne
    };
};


export default connect(mapStateToProps, { dropdownUpdate })(DropDown);