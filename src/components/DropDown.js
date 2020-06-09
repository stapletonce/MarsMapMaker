import React from "react";
import { connect } from "react-redux";

//CSS & Styling
import "semantic-ui-react";

//Action Creators
import { dropdownUpdate, multiValueCreate, multiValueCreateFinish, clearSizeArray, removeContent } from "../actions/"

class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            value: "select",
            selectedValue: "",
            sesarOneToOne: this.props.one2one
        };
    }


    logicHelper = (fS, fA, dS) => {

        if (fS.includes("YYYY")) {
            for (let i = 0; i < 3; i++) {
                if (fS[i] === "YYYY" && dS[i].length !== 4) {

                    alert("YYYY instead of YY error")
                    this.props.refresh()
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

                        alert("Length error")
                        this.props.refresh()
                        console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Length error)")
                        return null
                    }
                }
            }
        }

        if (fS.includes("/") && !dS.includes("/")) {

            console.log("Delimiter error")

            alert("Delimiter error")
            this.props.refresh()
            return null
        }

        else if (fS[0] === "MM" && dS[0] > 12) {

            console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")

            alert("You have selected a format that doesnt match the data provided from the file... please try another format (Date error)")
            this.props.refresh()
            return null
        }

        else if (fS[1] === "MM" && dS[1] > 12) {
            alert("Date error")
            this.props.refresh()
            console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")
            return null
        }
        else if (fS[2] === "MM" && dS[2] > 12) {
            alert("Date error")
            this.props.refresh()
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

        let returnString = fA[0] + "-" + fA[1] + "-" + fA[2] + " 00:00:00"

        return returnString
    }


    formatDate = (value, format, title) => {
        let finalArray = ["", "", ""]
        let update;

        // makes sure a format has been chosen!
        if (format === null) {
            alert("PLEASE SELECT A FORMAT!!!")
            this.props.refresh()
            console.log("PLEASE SELECT A FORMAT!!!")
            return
        }

        if (value.length !== 8 && value.length !== 10) {
            alert("You have not selected a date, try again...")
            this.props.refresh()
            console.log("You have not selected a date, try again...")
            return
        }

        // if format chosen contains delimiters
        if (format.includes("/") || format.includes("-")) {
            let dateSplit = value.split(/[-/]/)
            let formatSplit = format.split(/[-/ ]/)


            if (!this.props.hasChosenCentury) {

                alert("You have not selected a century!")
                this.props.refresh()
                console.log("You have not selected a century!")
                return
            }



            else if (dateSplit[2].length === 2 && formatSplit[2] === "YY") {

                dateSplit[2] = this.props.century.slice(0, 2) + dateSplit[2]

                update = this.logicHelper(formatSplit, finalArray, dateSplit)

            }

            else if (dateSplit[0].length === 2 && formatSplit[0] === "YY") {
                if (this.props.century === "2000") {
                    dateSplit[0] = "20" + dateSplit[0]
                }
                else
                    dateSplit[0] = "19" + dateSplit[0]

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
                oldValue: this.props.value,
                value: update,
                header: this.props.title
            }
            this.props.dropdownUpdate(obj)

            return update
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

                alert("Date error")
                this.props.refresh()
                console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")
                return
            }
            else if (newFormatSplit[i].includes("D") && newFormatSplit[i].includes("Y")) {

                alert("Date error")
                this.props.refresh()
                console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")
                return
            }
            else if (newFormatSplit[i].includes("M") && newFormatSplit[i].includes("Y")) {

                alert("Date error")
                this.props.refresh()
                console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Date error)")
                return
            }

        }

        update = this.logicHelper(newFormatSplit, finalArray, newDateSplit)

        if (update === null || update === undefined) {
            return
        }

        const obj = {
            id: this.props.id,
            sesarSelected: title,
            oldValue: this.props.value,
            value: update,
            header: this.props.title
        }
        this.props.dropdownUpdate(obj)




        return update





        // next step is to store this sesar format date into the redux store for the correct field upon choosing one of the date options
        // also, there should be some robust error handling that checks the value to make sure it even qualifies as a date
        // also to think further on that, check if the users value matches their format selection, if not send an error
    }

    // josh's section
    updateMulti = () => {

        for (let i = 0; i < this.props.ent.length; i++) {

            if (this.props.ent[i].sesarTitle === "sample_comment") {
                const obj = {
                    keyString: this.props.ent[i].header + ":" + this.props.ent[i].value,
                    ident: "sample_comment",
                    index: 0
                }
                console.log(obj)
                this.props.multiValueCreateFinish(obj)
            }
            else if (this.props.ent[i].sesarTitle === "description") {
                const obj = {
                    keyString: this.props.ent[i].header + ":" + this.props.ent[i].value,
                    ident: "description",
                    index: 1
                }
                console.log(obj)
                this.props.multiValueCreateFinish(obj)

            }
            else if (this.props.ent[i].sesarTitle === "field_name") {
                console.log("hello")
                const obj = {
                    keyString: this.props.ent[i].header + ":" + this.props.ent[i].value,
                    ident: "field_name",
                    index: 2
                }
                console.log(obj)
                this.props.multiValueCreateFinish(obj)
            }
        }
        console.log(this.props.multiValues)
    }




    // uses the clicked list-item in the dropdown to create an object to be passed into the dropdownUpdate action
    // updates specific object in the redux store
    updateValue = e => {
        const newValue = e.target.value
        let breakOrFormat;

        if (this.props.ent[this.props.id].sesarTitle === "size" && this.props.pairArr[this.props.id][0].pairHeader !== "") {
            const sizeObj = {
                cardID: this.props.id,
                index: 0
            }
            this.props.clearSizeArray(sizeObj)
            const obj = {
                oldValue: this.props.fieldValue,
                value: this.props.fieldValue,
                header: this.props.fieldTitle,
                id: this.props.id + 1,
                isGreen: this.state.isGreen
            }
            this.props.removeContent(obj)
        }

        if (this.props.ent[this.props.id].header === this.props.sizeArray[0].pairHeader && this.sizeArrayLoop() >= 1) {
            let obj = {
                id: 0
            }
            this.props.clearSizeArray(obj)
        }
        else if (this.props.ent[this.props.id].header === this.props.sizeArray[1].pairHeader && this.sizeArrayLoop() >= 1) {
            let obj = {
                id: 1
            }
            this.props.clearSizeArray(obj)
        }
        else if (this.props.ent[this.props.id].header === this.props.sizeArray[2].pairHeader && this.sizeArrayLoop() === 1) {
            let obj = {
                id: 2
            }
            this.props.clearSizeArray(obj)
        }



        if (this.props.dateFormat != null)
            breakOrFormat = this.props.dateFormat.split(" ")

        this.props.sizeCallback(newValue)

        if ((newValue === "collection_end_date" || newValue === "collection_start_date") && !this.props.hasChosen) {

            alert("You have not selected a date format...")
            this.props.refresh()
            console.log("Please choose a date format!!!")
            return
        }

        else if ((newValue === "collection_end_date" || newValue === "collection_start_date") && this.props.hasChosen) {

            if ((breakOrFormat.includes("/") || breakOrFormat.includes("-")) && (!this.props.value.includes("/") || !this.props.value.includes("-"))) {

                alert("Delimiter error")
                this.props.refresh()
                console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Delimiter error)")
                return
            }

            else if ((this.props.dateFormat.includes("/") || this.props.dateFormat.includes("-")) && (!this.props.value.includes("/") && !this.props.value.includes("-"))) {

                alert("Delimiter error")
                this.props.refresh()
                console.log("You have selected a format that doesn't match the data provided from the file... please try another format (Delimiter error)")
                return
            }

            let update = this.formatDate(this.props.value, this.props.dateFormat, newValue)

            if (update !== undefined) {
                this.props.callback(update)
                console.log(this.props.multiValues)
            }
            return
        }

        const obj = {
            id: this.props.id,
            sesarSelected: newValue,
            value: this.props.value,
            header: this.props.title
        }



        this.props.dropdownUpdate(obj)
        //this.updateMulti()

        if (this.props.value !== undefined) {
            this.props.callback(this.props.value, newValue)
        }
        //this.props.value.toLowerCase().replace(/[ -/*_#]/g, '')


    }

    sizeArrayLoop = () => {
        let count = 0;
        for (let i = 0; i < this.props.ent.length; i++) {
            if (this.props.ent[i].sesarTitle === "size")
                count += 1
        }
        return count

    }

    render() {
        const sesarOne2One = this.state.sesarOneToOne
        let num = -1
        // helper function to list "options" based on the 'type' of field (numbers or letters...) 
        let filter = (f) => {


            num += 1
            if (num === 0)
                return <option key={f.title} value="Sesar Selection" disabled selected hidden>Sesar Selection</option>;

            //if (f.format === this.props.fieldType)
            //return <option key={f.title} value={f.title}>{f.title}</option>;
            // code works, "current archive" is obviously a placeholder for now just to make sure the logic works
            if (f.type === this.props.fieldType || f.type === "both") {
                if (this.sizeArrayLoop() === 1 && this.props.sizeArray[2].pairHeader !== "") {
                    if (f.title === "size" && this.props.ent[this.props.id].sesarTitle !== "size")
                        return
                }
                else if (this.sizeArrayLoop() === 2 && (this.props.sizeArray[0].pairHeader !== "" && this.props.sizeArray[1] !== "")) {
                    if (f.title === "size" && this.props.ent[this.props.id].sesarTitle !== "size")
                        return
                }
                //if (f.title === "size" && this.props.sizeArray[0].pairHeader !== "" && this.props.sizeArray[1].pairHeader !== "" && this.sizeArrayLoop() !== this.props.id)
                //return
                //else if (f.title === "size" && this.props.sizeArray[2].pairHeader !== "" && this.sizeArrayLoop() !== this.props.id)
                //return
                if (!this.props.useOnce.includes(f.title))
                    return <option key={f.title} value={f.title}>{f.title}</option>;
                else if (this.props.useOnce.includes(f.title) && !sesarOne2One.includes(f.title))
                    return <option key={f.title} value={f.title}>{f.title}</option>;
                else if (this.props.useOnce.indexOf(f.title) === this.props.id)
                    return <option key={f.title} value={f.title}>{f.title}</option>;


            }
        };

        // creates the dropdown, uses filter() to specify which items are included in dropdown

        if (this.props.hasInit && this.props.id > 0 && this.props.pairArr[this.props.id - 1][0].pairHeader !== "") {
            return (

                <select className="ui dropdown" prompt="Please select option" onChange={this.updateValue}>
                    <option key={"size"} value={"size"}>size</option>
                </select>
            );
        } else {
            return (

                <select className="ui dropdown" prompt="Please select option" onChange={this.updateValue}>
                    {this.props.list.map((field) => filter(field))}
                </select>
            );
        }

    }
}

const mapStateToProps = (state) => {
    return {
        multi: state.multiValues,
        ent: state.entries,
        useOnce: state.useOnce,
        dateFormat: state.chosenDateFormat,
        hasChosen: state.hasChosenDateFormat,
        num: state.numOfOneToOne,
        hasChosenCentury: state.centuryChosen,
        century: state.century,
        multiValues: state.multiValues,
        sizeArray: state.sizeArray,
        hasInit: state.hasInit,
        pairArr: state.sizeOuterArray
    };
};



export default connect(mapStateToProps, { removeContent, dropdownUpdate, multiValueCreate, multiValueCreateFinish, clearSizeArray })(DropDown);