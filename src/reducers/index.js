import { combineReducers } from 'redux';

const fieldSelection = (selectedField = null, action) => {
    if (action.type === 'MAPPED_FIELD') {
        return action
    }
}

export default combineReducers({
    replaceMe: () => 'hi there'
})