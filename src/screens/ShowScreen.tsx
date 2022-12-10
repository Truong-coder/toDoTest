import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/ToDoContext';


const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  const toDo = state.find(
    (toDo) => toDo.id === navigation.getParam('id')
  );

  return (
    <View>
      <Text style={styles.text}>{toDo.title}</Text>
    </View>
  );
};

// ShowScreen.navigationOptions = ({ navigation }) => {
//   return {
//     headerRight: () => (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('Edit', { id: navigation.getParam('id') })
//         }
//       >
//         <EvilIcons style={styles.icon} name="pencil" size={35} />

//       </TouchableOpacity>
//     ),
//   };
// };


const styles = StyleSheet.create({
  text: {
    color: '#000000',
  },
  icon: {
    color: '#000000',
    marginRight: 20,
  }
});

export default ShowScreen;
