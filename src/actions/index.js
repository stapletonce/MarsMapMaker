// initializes the redux store with the objArray from 'fields' in Cardlist.js
export const firstState = initalArray => {
    return {
        type: 'MAPPED_VALUE',
        payload: initalArray
    };
};

// updates entries[id] in the redux store based on the option clicked
export const dropdownUpdate = dropObj => {
    return {
        type: 'DROPDOWN_UPDATE',
        payload: dropObj
    }
};

// adds the date format selected to the redux store

export const formatDate = chosenObj => {
    return {
        type: 'CHOOSE_FORMAT',
        payload: chosenObj
    }
};
