import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import reducer from './store/reducer';
<<<<<<< HEAD
=======

console.log("hello world")
>>>>>>> 5657cf4af2ad7622bd87bb37340ab3375777aefb


ReactDOM.render(
    <Provider store={createStore(reducer)}>
        <App />
    </Provider>,
    document.querySelector('#root'));
export default App;
