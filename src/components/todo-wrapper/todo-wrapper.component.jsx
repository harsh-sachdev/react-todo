import React from "react";

import TodoList from "../todo-list/todo-list.component";
import TodoAdd from "../todo-add/todo-add.component";

class TodoWrapper extends React.Component {
  state = {
    todos: [],
    finished: [],
    filter: []
  };

  intialState = () => ({
    todos: [
      {
        title: "I am Intial Todo",
        id: 1,
        completed: false
      }
    ],
    finished: [],
    filter: []
  });

  setFilter = ht => {
    if (this.state.filter.indexOf(ht) === -1) {
      this.setState({ filter: [...this.state.filter, ht] });
    }
  };

  clearFilter = index => {
    let { filter } = this.state;
    index !== -1 ? filter.splice(index, 1) : (filter = []);
    this.setState({ filter: filter });
  };

  addTodo = todo => {
    this.state.todos.unshift(todo);
    this.setState({ todos: this.state.todos });
  };

  resetTodo = () => {
    this.setState(this.intialState);
    localStorage.state = this.intialState();
  };

  completeTodo = indexToComplete => {
    let { todos, finished } = this.state;
    let element = todos.splice(indexToComplete, 1)[0];
    element.completed = true;
    finished.unshift(element);

    this.setState({ todos: todos, finished: finished });
  };

  render() {
    return (
      <div className="todo-wrapper container">
        <h2 className="title">THINGS TO DO</h2>
        <button
          className="reset btn btn-danger"
          onClick={() => this.resetTodo()}
        >
          Reset
        </button>
        <TodoAdd
          nextTodoId={this.state.todos.length + this.state.finished.length + 1}
          addTodo={this.addTodo}
        />
        <TodoList
          todos={[...this.state.todos, ...this.state.finished]}
          completeTodo={this.completeTodo}
          setFilter={this.setFilter}
          filter={this.state.filter}
          clearFilter={this.clearFilter}
        />
      </div>
    );
  }

  componentDidMount() {
    let state = localStorage.state
      ? JSON.parse(localStorage.state)
      : this.intialState();
    this.setState(state);
  }

  componentDidUpdate() {
    localStorage.state = JSON.stringify(this.state);
  }
}

export default TodoWrapper;
