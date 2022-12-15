import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { call } from 'react-native-reanimated';
const toDoReducer = (state, action) => {
  switch (action.type) {
    case 'edit_todo':
      return state.map((toDo) => {
        return toDo.id === action.payload.id ? action.payload : toDo;
      });
    case 'delete_todo':
      return state.filter((toDo) => toDo.id !== action.payload);
    case 'add_todo':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
        },
      ];
    default:
      return state;
  }
};

const addToDo = (dispatch) => {
  return (title, callback) => {
    dispatch({ type: 'add_todo', payload: { title } });
    if (callback) {
      callback();
    }
    // Saving to async storage
    AsyncStorage.setItem('storedTodos', JSON.stringify(title, callback))
      .then(() => {
        addToDo(title, callback);
        // setModalVisible(false);
      })
      .catch((error) => console.log(error));
  };
};

const deleteToDo = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_todo', payload: id });

    AsyncStorage.getItem('storedTodos').then(
      value =>
        //AsyncStorage returns a promise so adding a callback to get the value
        console.log(value),
        //Setting the value in Text
    );

    console.log("Testttttt");
    
  };
};
const editToDo = (dispatch) => {
  return (id, title, callback) => {
    dispatch({
      type: 'edit_todo',
      payload: { id, title },
    });
    if (callback) {
      callback();
    }
    // Saving to async storage
    AsyncStorage.setItem('storedTodos', 'Hello Truong');

    
    //.then(() => {
    //  editToDo(id, title, callback);
    // setModalVisible(false);
    //})
    //.catch((error) => console.log(error));
  };
};

// export const { Context, Provider } = createDataContext(
//   toDoReducer,
//   { addToDo, deleteToDo, editToDo },
//   [{ title: 'TEST TODO 1', id: 1 }]
// );

export const { Context, Provider } = createDataContext(toDoReducer, {
  addToDo,
  deleteToDo,
  editToDo,
});
