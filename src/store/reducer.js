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
const reducer = (state = { entries: [] }, action) => {

  //give inital filtering of values!!!!!!!!!!!!!!
  //avoid infinite rendering in cardlist!!!!!!!!!!

  switch (action.type) {
    case "MAPPED_VALUE":

      console.log("it re-rendered!")
      return { ...state, entries: state.entries.concat(action.payload) }

// this is weird wowee
    case "DROPDOWN_UPDATE":
      let index = action.payload.id
      return {
        ...state,
        entries: [
          ...state.entries.slice(0, index),
          {
            sesarTitle: action.payload.sesarSelected,
            value: action.payload.value,
            header: action.payload.header,
            // taking a look at isDate and isMeasurment later along with other intricacies of the store/dropdown dynamic
            isDate: false,
            isMeasurement: false
          },
          ...state.entries.slice(index + 1)
        ]
      }

    default: // need this for default case
      return state

  }
}

export default reducer;