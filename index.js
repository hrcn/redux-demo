const redux = require('redux');
const reduxLogger = require('redux-logger')

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger()

// type of the action
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM'

// action creater
function buyCake() {
  return {
    // define the action
    type: BUY_CAKE,
    info: 'First redux action'
  }
}

function buyIceCream() {
  return {
    // define the action
    type: BUY_ICECREAM
  }
}

// reducer
// (previousState, action) => newState
const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20
}

const initialCakeState = {
  numOfCakes: 10
}

const initialIceCreamState = {
  numOfIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
  switch(action.type) {
    case BUY_CAKE: return {
      // make a copy of the state object and only update the numOfCakes
      ...state,
      numOfCakes: state.numOfCakes - 1
    }

    default: return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type) {
    case BUY_ICECREAM: return {
      // make a copy of the state object and only update the numOfCakes
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
    }
 
    default: return state
  }
}

// combine reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

// store --- holds application state
const store = createStore(rootReducer, applyMiddleware(logger));

// allow access to state via getState()
console.log('initial state: ', store.getState());

const unsubscribe = store.subscribe(() => console.log('updated state: ', store.getState()))

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()