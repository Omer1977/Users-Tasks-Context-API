import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {TaskContext} from '../context/TaskContext';
import Error from '../components/Error';
import Loader from '../components/Loader';

const TaskScreen = () => {
  const {
    tasks,
    loading,
    error,
    removeTask,
    newTaskTitle,
    setNewTaskTitle,
    addTask,
  } = useContext(TaskContext);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      Alert.alert('Uyarı', 'Görev başlığı boş olamaz');
      return;
    }
    addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <>
          <FlatList
            data={tasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={styles.title}>
                  {item.title.length > 20
                    ? item.title.charAt(0).toUpperCase() +
                      item.title.slice(1, 30) +
                      '...'
                    : item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                </Text>
                <Button
                  title="Remove"
                  color={'#CC2B52'}
                  onPress={() => removeTask(item.id)}
                />
              </View>
            )}
          />

          <View style={styles.inputContainer}>
            <TextInput
              value={newTaskTitle}
              placeholder="New Task Title"
              onChangeText={setNewTaskTitle}
              style={styles.input}
            />
            <Button title="Add Task" onPress={handleAddTask} />
          </View>
        </>
      )}
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#889EAF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderRadius: 8,
    shadowColor: '#000',
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderWidth: 1,
    width: '75%',
    padding: 5,
    borderRadius: 5,
    borderColor: '#889EAF',
  },
});
