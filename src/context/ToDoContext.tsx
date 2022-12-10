import createDataContext from './createDataContext';

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
  };
};
const deleteToDo = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_todo', payload: id });
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
  };
};

export const { Context, Provider } = createDataContext(
  toDoReducer,
  { addToDo, deleteToDo, editToDo },
  [{ title: 'TEST TODO', id: 1 }]
);
