//@ts-check
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import ReduxLogger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../../js/react/reducers";
import App from "../../js/react/containers/App.jsx";
import Firebase from '../../js/firebase/Firebase.js'
import _ from 'lodash'
//reducers

//console.log(window.aaa)

// global.base_dir = __dirname;
// global.abs_path = function(path) {
//     return base_dir + path;
// }
// global.include = function(file) {
//     return require(abs_path('/' + file));
// }

// console.log('-----type---------')
// let img1 = require('../images/products/11.jpg')
// var img_url = require("file-loader!../images/products/白斬雞.jpg");
// console.log(typeof img1)

//import App_redux from './App_redux.js'
// import todos from './todos_redux.js'
// import TreeView_redux from './components/TreeView/TreeView_redux.js'
//import visibilityFilter from './visibilityFilter'

// var rootReducer = combineReducers({
// 	App_redux,
// 	// todos,
// 	// TreeView_redux,
//     //visibilityFilter,
// })

var window2 = /**@type {import('../../js/dataDefine/index.js').ExtendedWindow}*/ (window);
window2.Firebase = new Firebase(window2.firebase, null)

var rootReducer = reducer; //already combine Reducers

const middlelogger = (store) => (next) => (action) => {
    console.log("middlelogger dispatching", action);
    let result = next(action);
    console.log("middlelogger next state", store.getState());
    return result;
};

const middlewares = [];
console.log(process.env.NODE_ENV);
// 用process.env.NODE_ENV來判斷
if (process.env.NODE_ENV === "development") {
    // options設定執行時間
    //const logger = createLogger({ duration:true });
    middlewares.push(middlelogger);
    middlewares.push(ReduxLogger);
    middlewares.push(thunk);
}

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

let divRoot = document.querySelector("#root");



// set test component

let app = (
    <Provider store={store}>
        <App></App>
    </Provider>
);

ReactDOM.render(app, divRoot);
