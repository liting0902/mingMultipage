import {SET_productList, ADD_shopCart, ADD_uniqueId} from '../actionTypes'

// Action Creators


// Reducer initState
const initState = {    
    uniqueId: [],    
};
// Reducer
export default function reducer(state = initState, action = {}) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case ADD_uniqueId: {
            if (state.uniqueId.includes(action.uniqueId)) {
                let sMsg = `uniqueId clash, clash id = ${action.uniqueId}`;
                console.log(sMsg);
                alert(sMsg);
                return state;
            }
            newState.uniqueId.push(action.uniqueId);
            return newState;
        }
        // do reducer stuff
        default:
            return state;
    }
}
