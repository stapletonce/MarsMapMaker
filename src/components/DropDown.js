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
        };
    }

    //e is the event being passed in from select
    handleChange() {
    }

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


    // dont need this method anymore
    /*onClick = (index) => {
      console.log(index);
    };*/
    render() {
        let filter = (f) => {
            if (f.type === this.props.fieldType || f.type === "both")
                //value = f.title needed to track the option being selected
                return <option value={f.title}>{f.title}</option>;
        };
        return (
            //added onChange
            <select class="ui search dropdown" onChange={this.updateValue}>
                {this.props.list.map((field) => filter(field))}
            </select>

            // <div class="ui compact menu">
            //     <div class="ui simple dropdown item">
            //         Dropdown
            //         <i class="dropdown icon"></i>
            //         <div class="menu">
            //             {this.props.list.map((field) => (
            //                 <div class="item">{field.title}</div>
            //             ))}
            //         </div>
            //     </div>
            // </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries
    };
};


export default connect(mapStateToProps, { dropdownUpdate })(DropDown);