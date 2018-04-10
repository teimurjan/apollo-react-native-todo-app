import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import TodoList from './TodoList';
import TodoCreateForm from './TodoCreateForm';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default () => (
  <SafeAreaView style={styles.container}>
    <TodoCreateForm />
    <TodoList />
  </SafeAreaView>
);
