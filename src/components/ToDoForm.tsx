import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavigationActions } from 'react-navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import IndexScreen from '../screens/IndexScreen';

const ToDoForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);

  return (
    <View>
      <Text style={styles.label}>Enter New Todo:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Button title="Add" onPress={() => onSubmit(title)} />
    </View>
  );
};


ToDoForm.defaultProps = {
  initialValues: {
    title: '',
  }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 5,
    borderColor: 'green',
    marginBottom: 15,
    padding: 5,
    margin: 5,
    color: 'red',
  },
  label: {
    fontSize: 25,
    marginBottom: 5,
    marginLeft: 5,
    color: 'red',
  },
  icon: {
    marginLeft: 50,
  }
});

export default ToDoForm;
