const redux = require('redux');
const createStore = redux.createStore;

// type of the action
const BUY_CAKE = 'BUY_CAKE';

// action creater
function buyCake() {
  return {
    // define the action
    type: BUY_CAKE,
    info: 'First redux action'
  }
}

// reducer
// (previousState, action) => newState
const initialState = {
  numOfCakes: 10
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case BUY_CAKE: return {
      // make a copy of the state object and only update the numOfCakes
      ...state,
      numOfCakes: state.numOfCakes - 1
    }
 
    default: return state
  }
}

// store --- holds application state
const store = createStore(reducer);

// allow access to state via getState()
console.log('initial state: ', store.getState());

const unsubscribe = store.subscribe(() => console.log('updated state: ', store.getState()))

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe()

