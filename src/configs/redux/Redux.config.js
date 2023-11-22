const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  data: {
    dateTime: "",
    latitude: 0,
    longitude: 0,
    imagePath: "",
    isMock: false
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_DATA':
      return {
        ...state,
        data: action.newValue,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
