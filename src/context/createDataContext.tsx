import React, { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (reducer, actions) => {
  //const initialState = [{ title: 'TEST TODO 1', id: 1 },{ title: 'TEST TODO 2', id: 2 }];
  const initialStateString = AsyncStorage.getItem("storedTodos");

  let initialState;

  if(initialStateString == null) {
    initialState = [{ title: 'TODO NONE', id: 1 }];
  }
  else{
    console.log(initialStateString);
    initialState = [{ title: 'TEST TODO 2', id: 1 }];
  }

  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions === { addBlogPost: (dispatch) => { return () => {} } }
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
