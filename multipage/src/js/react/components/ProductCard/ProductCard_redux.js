// widgets.js

// Actions
const LOAD = 'my-app/widgets/LOAD';
const CREATE = 'my-app/widgets/CREATE';
const UPDATE = 'my-app/widgets/UPDATE';
const REMOVE = 'my-app/widgets/REMOVE';

const SET_devScreenShot = Symbol('SET_devScreenShot');

const initState = {
    devScreenShot:{
        imgScreen:null,
        treeData:null,
    }
}
// Reducer
export default function reducer(state = initState, action = {}) {
    let newState = Object.assign({},state);
    switch (action.type) {
        case SET_devScreenShot:
            {
                newState.devScreenShot.imgScreen = action.imgScreen;
                newState.devScreenShot.treeData = action.treeData;
                return newState;
            }
        // do reducer stuff
        default:
            return state;
    }
}

// Action Creators
export function set_devScreenShot(imgScreen, treeData){
    return {
        type:SET_devScreenShot,
        imgScreen:imgScreen,
        treeData:treeData,
    }
}

export function loadWidgets() {
    return {
        type: LOAD
    };
}

export function createWidget(widget) {
    return {
        type: CREATE,
        widget
    };
}

export function updateWidget(widget) {
    return {
        type: UPDATE,
        widget
    };
}

export function removeWidget(widget) {
    return {
        type: REMOVE,
        widget
    };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export function getWidget() {
    return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
}