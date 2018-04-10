import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Todo from './Todo';

const styles = StyleSheet.create({
  todoList: {
    width: '100%',
  },
});

const TodoList = ({ children }) => <View style={styles.todoList}>{children}</View>;

const makeTodoList = ({ loading, data, error }) => {
  if (loading) {
    return <Text>Fetching todos...</Text>;
  } else if (error) {
    return <Text>Something went wrong.</Text>;
  }
  return <TodoList>{data.todos.map(({ id, title }) => <Todo key={id} id={id} title={title} />)}</TodoList>;
};

export const TODO_LIST_QUERY = gql`
  {
    todos {
      id
      title
    }
  }
`;

export default () => <Query query={TODO_LIST_QUERY}>{makeTodoList}</Query>;
