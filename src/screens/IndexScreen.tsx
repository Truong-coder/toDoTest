/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Context } from '../context/ToDoContext';
import Feather from 'react-native-vector-icons/Feather';
// import EvilIcons from "react-native-vector-icons/EvilIcons"
import Modal from 'react-native-modal';
import ToDoForm from '../components/ToDoForm';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from 'react-native-logs';

interface IToDo {
  text: string;
  // completed: boolean;
}

function IndexScreen({ navigation }) {
  const { state, deleteToDo } = useContext(Context);
  //Modal visibility
  const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);
  console.log(isModalVisible);
  const handleModal = (): void => setIsModalVisible(() => !isModalVisible);
  const { addToDo } = useContext(Context);
  const STORAGE_KEY = '@save_name';//use this key to read and save the data
  // const log = logger.createLogger();



  return (
    <View>
      <View>
        {/* Add Button */}
        <TouchableOpacity onPress={handleModal}>
          <Feather style={styles.addicon} name="plus" size={30} />
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View>
            <ToDoForm
              onSubmit={(title) => {
                addToDo(title);
              }}
              
            />
            <Button title="Cancel" onPress={handleModal} />
          </View>
        </Modal>
      </View>

      <FlatList
        data={state}
        keyExtractor={(toDo) => toDo.title}
        renderItem={({ item }) => {
          return (
            // <TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.title}>
                {/* {item.title} - {item.id} */}
                {item.title}
              </Text>

              <View style={styles.inputWrapper}>
                {/* Delete Button 
                <View isVisible={setIsModalVisible}>
                  <TouchableOpacity
                    style={{ justifyContent: 'flex-end' }}
                    onPress={handleModal}
                  > 
                    <Feather style={styles.icon1} name="trash" />
                  </TouchableOpacity>
                  <Modal isVisible={!isModalVisible} >
                    <View style={{}}>
                      <Text>Do you want to remove this todo?</Text>
                      <Button title="Yes" onPress={() => deleteToDo(item.id)} />
                      <Button title="No" onPress={handleModal} />
                    </View>
                  </Modal>
                </View> */}
                <TouchableOpacity
                  style={{ justifyContent: 'flex-end' }}
                  onPress={() => deleteToDo(item.id)}
                >
                  <Feather style={styles.icon1} name="trash" />
                </TouchableOpacity>
                {/* Edit Button */}
                <TouchableOpacity
                  style={{ justifyContent: 'flex-end' }}
                  onPress={() => navigation.navigate('Edit', { id: item.id })}
                >
                  <Feather style={styles.icon2} name="edit" size={35} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
    // borderRightWidth: 30,
    color: '#000000',
  },
  icon1: {
    fontSize: 24,
    marginRight: 50,
    marginLeft: 10,
    alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    color: '#000000',
  },
  icon2: {
    fontSize: 24,
    marginRight: 50,
    alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    color: '#000000',
  },
  addicon: {
    fontSize: 50,
    marginLeft: 175,
    justifyContent: 'center',
    color: '#000000',
  },
  text: {
    color: '#000000',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginLeft: 10,
    marginBottom: 20,
    color: '#00000',
  },
  container: {
    flex: 1,
    padding: 35,
    alignItems: 'center',
    backgroundColor: '#BD10E0',
  },
  containerModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  RemoveButton: {
    marginLeft: 150,
  },
});

export default IndexScreen;
