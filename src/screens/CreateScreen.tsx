import React, { useState, useContext } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Context } from '../context/ToDoContext';
import ToDoForm from '../components/ToDoForm';
import { Modal } from 'react-native';

const CreateScreen = ({ navigation }) => {
  const { addToDo } = useContext(Context);

  return (
    <View>
      <ToDoForm
        onSubmit={(title) => {
          addToDo(title, () => navigation.navigate('Index'));
        }}
      />

      <Button title="Cancel" onPress={() => navigation.navigate('Index')} />
    </View>

  );
};
// CreateScreen.navigationOptions = ({navigation}) =>{
//   return(

//   );
// };
const styles = StyleSheet.create({});

export default CreateScreen;
