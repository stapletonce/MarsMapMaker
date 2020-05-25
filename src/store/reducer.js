//the store will consist of an array of objects with each having the following information attached
//string: sesarTitle
//string: value
//string: localTitle
//boolean: isDate (default false)
//boolean: isMeasurement (default false)
// **POSSIBLE** (currently thinking if necessary) boolean: isChecked

// general process
//  an instantiation of the object with the localTitle as the key
//  a reselection or remapping of a sesar value to a local title to a different value
//  a reselection or remapping of a sesar value to the same value (might already be handled)
const reducer = (state = { entries: [], useOnce: [], chosenDateFormat: null, hasChosenDateFormat: false, hasChosenDropdownOption: false }, action) => {

  switch (action.type) {
    // MAPPED_VALUE should happen one time, it initializes the redux store array
    case "MAPPED_VALUE":
      return {
        ...state,
        entries: state.entries.concat(action.payload.objArr),
        useOnce: state.useOnce.concat(action.payload.useOnce)
      }

    // DROPDOWN_UPDATE updates a specific object in the store "entries[id[" when option is clicked
    case "DROPDOWN_UPDATE":
      let index = action.payload.id
      return {
        ...state,
        hasChosenDropdownOption: true,

        // replaces entries: with every object from original state, replaces specified entries[id] with new object
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
        ],

        useOnce: [
          ...state.useOnce.slice(0, index),
          action.payload.sesarSelected,
          ...state.useOnce.slice(index + 1)
        ]



      }

    case "CHOOSE_FORMAT":
      return {
        ...state,
        hasChosenDateFormat: true,
        chosenDateFormat: action.payload.dateFormat

      }

    default:
      return state

  }

}

export default reducer;