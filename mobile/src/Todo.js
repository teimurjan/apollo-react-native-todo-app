import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { StyleSheet, View, Text } from 'react-native';
import { TODO_LIST_QUERY } from './TodoList';

const DELETE_TODO_MUTATION = gql`
  mutation($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const styles = StyleSheet.create({
  todo: {
    width: '100%',
    backgroundColor: 'lightblue',
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
  },
  todoText: {
    fontSize: 30,
    flex: 1,
  },
  todoDeleteIcon: {
    fontSize: 30,
    color: 'red',
  },
});

const Todo = ({ id, title, deleteTodo }) => {
  const onDeletePress = () => deleteTodo({ variables: { id } });

  return (
    <View style={styles.todo}>
      <Text style={styles.todoText}>{title}</Text>
      <Text style={styles.todoDeleteIcon} onPress={onDeletePress}>
        ✖
      </Text>
    </View>
  );
};

export default props => (
  <Mutation
    mutation={DELETE_TODO_MUTATION}
    update={(cache, { data: { deleteTodo } }) => {
      const { todos } = cache.readQuery({ query: TODO_LIST_QUERY });
      cache.writeQuery({
        query: TODO_LIST_QUERY,
        data: { todos: todos.filter(todo => todo.id !== props.id) },
      });
    }}
  >
    {deleteTodo => <Todo {...props} deleteTodo={deleteTodo} />}
  </Mutation>
);
