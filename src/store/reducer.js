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
const reducer =
  (state =
    {
      entries: [],
      useOnce: [],
      multiValues: [
        {
          id: "sample_comment",
          concatValues: []
        },
        {
          id: "description",
          concatValues: []
        },
        {
          id: "field_name",
          concatValues: []
        }],
      centuryChosen: false,
      sesarOne2One: [],
      numOfOneToOne: 0,
      chosenDateFormat: null,
      hasChosenDateFormat: false,
      hasChosenDropdownOption: false,
      hasTwoYs: false
    },
    action) => {

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
        let check;
        if ((action.payload.sesarSelected === "collection_end_date" || action.payload.sesarSelected === "collection_start_date"))
          check = true

        return {
          ...state,
          hasChosenDropdownOption: check,

          // replaces entries: with every object from original state, replaces specified entries[id] with new object
          entries: [
            ...state.entries.slice(0, index),
            {
              sesarTitle: action.payload.sesarSelected,
              oldValue: action.payload.oldValue,
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
          chosenDateFormat: action.payload.dateFormat,
          hasTwoYs: action.payload.hasTwoYs

        }

      case "ADD_ONE_2_ONE":
        return {
          ...state,
          sesarOne2One: state.sesarOne2One.concat(action.payload.title),
          numOfOneToOne: action.payload.size
        }


      case "CENTURY":
        return {
          ...state,
          centuryChosen: true,
          century: action.payload.chosenCentury
        }

      case "MULTIVALUE_ADD":
        let indd = action.payload.index

        return {
          ...state,
          multiValues: [
            {
              id: "sample_comment",
              concatValues: []
            },
            {
              id: "description",
              concatValues: []
            },
            {
              id: "field_name",
              concatValues: []
            }]

        }


      case "MULTIVALUE_ADD_FINISH":
        let indy = action.payload.index

        return {
          ...state,
          multiValues: [...state.multiValues.slice(0, indy), {
            id: action.payload.ident,
            concatValues: [...state.multiValues[indy].concatValues.concat(action.payload.keyString)]
          },
          ...state.multiValues.slice(indy + 1)
          ]

        }

      case "REMOVE_SELECTION":
        let i = action.payload.id

        return {
          ...state,
          entries: [
            ...state.entries.slice(0, i),
            {
              sesarTitle: "",
              oldValue: action.payload.oldValue,
              value: action.payload.value,
              header: action.payload.header,
              // taking a look at isDate and isMeasurment later along with other intricacies of the store/dropdown dynamic
              isDate: false,
              isMeasurement: false
            },
            ...state.entries.slice(i + 1)
          ]
        }

      case "IS_DATE":

        let dex = action.payload.index
        console.log("got here")
        return {
          ...state,
          entries: [
            state.entries.slice(0, dex),
            {
              sesarTitle: "",
              oldValue: action.payload.oldValue,
              value: action.payload.value,
              header: action.payload.header,
              // taking a look at isDate and isMeasurment later along with other intricacies of the store/dropdown dynamic
              isDate: true,
              isMeasurement: false
            },
            state.entries.slice(dex + 1)
          ]
        }

      default:
        return state

    }

  }

export default reducer;