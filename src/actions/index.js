export const firstState = initalArray => {
    return {
        type: 'MAPPED_VALUE',
        payload: initalArray
    };
};

export const dropdownUpdate = dropObj => {
    return {
        type: 'DROPDOWN_UPDATE',
        payload: dropObj
    }
}