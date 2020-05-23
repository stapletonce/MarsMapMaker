import React from "react";
import "semantic-ui-react";
import { connect } from "react-redux";
import { dropdownUpdate } from "../actions/"


class DropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            currentChosen: null,
            headerTitle: this.props.title,
            value: "select",
            selectedValue: "",
            sesarOneToOne: ["original_archive", "current archive", "platform_name"]
        };
    }

    // uses the clicked list-item in the dropdown to create an object to be passed into the dropdownUpdate action
    // updates specific object in the redux store
    updateValue = e => {
        const newValue = e.target.value
        const obj = {
            id: this.props.id,
            sesarSelected: newValue,
            value: this.props.value,
            header: this.props.title
        }
        this.props.dropdownUpdate(obj)
    }


    render() {

        // helper function to list "options" based on the 'type' of field (numbers or letters...) 
        let filter = (f) => {

            // code works, "current archive" is obviously a placeholder for now just to make sure the logic works
            if (f.type === this.props.fieldType || f.type === "both") {
                if ((this.props.useOnce.indexOf("current archive") === this.props.id))
                    return <option value={f.title}>{f.title}</option>;
                else if (this.props.useOnce.includes("current archive") && f.title !== "current archive")
                    return <option value={f.title}>{f.title}</option>;
                else if (!this.props.useOnce.includes("current archive"))
                    return <option value={f.title}>{f.title}</option>;


            }
        };

        // creates the dropdown, uses filter() to specify which items are included in dropdown
        return (
            <select class="ui search dropdown" onChange={this.updateValue}>
                {this.props.list.map((field) => filter(field))}
            </select>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        useOnce: state.useOnce
    };
};


export default connect(mapStateToProps, { dropdownUpdate })(DropDown);