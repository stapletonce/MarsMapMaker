import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import reducer from './store/reducer';

console.log("hello world")


ReactDOM.render(
    <Provider store={createStore(reducer)}>
        <App />
    </Provider>,
    document.querySelector('#root'));
export default App;
