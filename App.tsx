import React, { useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import { Provider } from './src/context/ToDoContext';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'ToDo App',
    },
  }
);
const App = createAppContainer(navigator);
export default () => {

  return(
    <Provider>
  <App />
    </Provider >
  );
};

// export default function App() {
//   App = createAppContainer(navigator);
//   const [ready, setReady] = useState(false);

//   // todo initial list
//   const initialTodos: any[] | (() => any[]) = [];
//   const [todos, setTodos] = useState(initialTodos);


//   const loadTodos = () => {
//     AsyncStorage.getItem('storedTodos')
//       .then((data) => {
//         if (data !== null) {
//           setTodos(JSON.parse(data));
//         }
//       })
//       .catch((error: any) => console.log(error));
//   };

//   if (!ready) {
//     return (
//       <App
//         startAsync={loadTodos}
//         onFinish={() => setReady(true)}
//         onError={console.warn}
//       />
//     );
//   }
//   return (
//     <Provider>
//       <App />
//     </Provider>
//   );
// };
