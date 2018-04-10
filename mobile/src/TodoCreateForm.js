import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { TODO_LIST_QUERY } from './TodoList';

const CREATE_TODO_MUTATION = gql`
  mutation($title: String!) {
    createTodo(todo: { title: $title }) {
      id
      title
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#ff9900',
    borderWidth: 3,
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    height: '100%',
  },
  button: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonText: {
    color: 'white',
  },
});

class TodoCreateForm extends React.Component {
  state = {
    title: '',
  };

  onTitleChange = title => this.setState({ title });

  onAddPress = () => {
    this.props.createTodo({ variables: { title: this.state.title } });
    this.setState({ title: '' });
  };

  render() {
    const shouldDisableButton = this.state.title === '';
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.onTitleChange}
          value={this.state.title}
          placeholder="Enter a title..."
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          disabled={shouldDisableButton}
          onPress={this.onAddPress}
        >
          <View style={styles.button} backgroundColor={shouldDisableButton ? '#ffcc80' : '#ff9900'}>
            <Text style={styles.buttonText}>ADD</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default () => (
  <Mutation
    mutation={CREATE_TODO_MUTATION}
    update={(cache, { data: { createTodo } }) => {
      const { todos } = cache.readQuery({ query: TODO_LIST_QUERY });
      cache.writeQuery({
        query: TODO_LIST_QUERY,
        data: { todos: todos.concat([createTodo]) },
      });
    }}
  >
    {createTodo => <TodoCreateForm createTodo={createTodo} />}
  </Mutation>
);
