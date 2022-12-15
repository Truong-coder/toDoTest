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
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import EvilIcons from "react-native-vector-icons/EvilIcons"
import Modal from 'react-native-modal';
import ToDoForm from '../components/ToDoForm';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { logger } from 'react-native-logs';

interface IToDo {
  text: string;
  // completed: boolean;
}

function IndexScreen({ navigation }) {
  const { state, deleteToDo } = useContext(Context);
  //Modal visibility
  const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);
  console.log('State of Add Modal: ', isModalVisible);
  const handleModal = (): void => setIsModalVisible(() => !isModalVisible);

  // Delete Modal visiblity
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<Boolean>(false);
  console.log('State of Delete modal: ', isDeleteModalVisible);
  const handleDeleteModal = (): void =>
    setIsDeleteModalVisible(() => !isDeleteModalVisible);

  const { addToDo } = useContext(Context);
  // const STORAGE_KEY = '@save_name';//use this key to read and save the data
  const [ready, setReady] = useState(false); //key to async Storage
  // const log = logger.createLogger();

  const [getValue, setGetValue] = useState('');
  return (
    <View style={styles.container}>
      <FlatList
        data={state} //useContext
        keyExtractor={(toDo) => toDo.title}
        renderItem={({ item }) => {
          return (
            // <TouchableOpacity>
            <View style={styles.listItem}>
              <Text style={styles.title}>
                {/* {item.title} - {item.id} */}
                {item.title}
                {/* {getValue} */}
              </Text>

              {/* Delete Button  */}
              {/* if(isFirstModal == true){} */}
              <View>
                <TouchableOpacity
                  style={{ justifyContent: 'flex-end' }}
                  onPress={handleDeleteModal}
                >
                  <Feather style={styles.icon1} name="trash" />
                </TouchableOpacity>
                <Modal isVisible={isDeleteModalVisible}>
                  <View style={styles.ModalContainer}>
                    <Text style={styles.deleteText}>
                      Do you want to remove this todo?
                    </Text>
                    <Button
                      title="YES"
                      onPress={() => {
                        deleteToDo(item.id);
                        handleDeleteModal();
                      }}
                    />
                    <Button title="No" onPress={handleDeleteModal} />
                  </View>
                </Modal>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Edit', { id: item.id })}
              >
                <Feather style={styles.icon2} name="edit" size={35} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View>
        {/* Add Button */}
        <TouchableOpacity onPress={handleModal}>
          <AntDesign style={styles.addicon} name="addfile" />
          {/* <Feather style={styles.addicon} name="plus" size={30} /> */}
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={styles.ModalContainer}>
            <ToDoForm
              onSubmit={(title) => {
                addToDo(title);
                addToDo(title);
              }}
            />
            <Button title="Cancel" onPress={handleModal} />
          </View>
        </Modal>
        {/*
      <TouchableOpacity onPress={getValueFunction} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}> GET VALUE </Text>
      </TouchableOpacity>
     */}
      </View>
      <Button
        title="GET VALUE"
        onPress={(item) => {
          <ToDoForm
            getValueFunction={(title) => {
              <Text style={styles.textStyle}> {item.title} </Text>;
            }}
          />;
        }}
      />
      {/* <Text style={styles.textStyle}> {item.title} </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
    color: '#000000',
    width: 200,
  },
  icon1: {
    fontSize: 24,
    marginRight: 40,
    marginLeft: 40,
    color: '#000000',
  },
  icon2: {
    fontSize: 24,
    marginRight: 50,
    color: '#000000',
  },
  addicon: {
    fontSize: 50,
    marginLeft: 275,
    marginTop: 30,
    color: '#000000',
  },
  text: {
    color: '#000000',
  },
  inputWrapper: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 10,
    marginBottom: 20,
    color: '#00000',
  },
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  RemoveButton: {
    marginLeft: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    marginTop: 30,
    marginBottom: 15,
  },
  deleteText: {
    fontSize: 30,
    color: 'red',
  },
  ModalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    marginTop: 32,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textStyle: {
    padding: 10,
    textAlign: 'center',
    color: 'black',
  },
});

export default IndexScreen;
