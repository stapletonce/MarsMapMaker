import { combineReducers } from 'redux';
//import update from 'immutability-helper';
// might need to use this^ running into issues installing

//the store will consist of an array of objects with each having the following information attached
//string: sesarTitle
//string: value
//string: localTitle
//boolean: isDate (default false)
//boolean: isMeasurement (default false)
// **POSSIBLE** (currently thinking if necessary) boolean: isChecked

//general process
//  an instantiation of the object with the localTitle as the key
//  a reselection or remapping of a sesar value to a local title to a different value
//  a reselection or remapping of a sesar value to the same value (might already be handled)
const reducer = (state = {entries : []}, action) => {
    
    //give inital filtering of values!!!!!!!!!!!!!!
    //avoid infinite rendering in cardlist!!!!!!!!!!

    switch (action.type) {
        case "MAPPED_VALUE":

            //const index = this.state.entries.findIndex(((entry) => action.payload.fieldTitle === entry.fieldTitle))
            //console.log(index)
            //if (index !== -1)
              //  return {
                //    ...state,
                  //  entries: [
                    //    ...state.entries.slice(0, index), action.payload, ...state.entries.slice(index + 1)
                    //]
                //};

            //else
                //console.log(index)
                return {...state, entries: state.entries.concat(action.payload)}
                
        default: // need this for default case
            return state
    }
}

export default reducer;