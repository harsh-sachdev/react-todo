import React from "react";
import $ from "jquery";
import TodoItem from "../todo-item/todo-item.component";

class TodoList extends React.Component {
  identifyHashtags = input => {
    return input.replace(
      /#(\w+)/g,
      inp => `<button id="hashtag" class="hashtag btn btn-info">${inp}</button>`
    );
  };

  getListItem = (todo, index, completeTodo) => {
    let { title } = todo;
    title = this.identifyHashtags(title);
    return (
      <li
        className={`todo-item alert ${
          todo.completed ? "line-through alert-success" : "alert-danger"
        }`}
        key={todo.id}
        onClick={() => (todo.completed ? "" : completeTodo(index))}
      >
        <TodoItem title={title} />
      </li>
    );
  };

  render() {
    let { todos, filter, completeTodo } = this.props;
    let fTodos = [];
    let checker = (arr, target) => target.every(v => arr.includes(v));
    for (let i = 0; i < todos.length; i++) {
      let arrHT = [...todos[i].title.matchAll(/#(\w+)/g)].map(ht => ht[0]);
      if (checker(arrHT, filter)) {
        fTodos.push(todos[i]);
      }
    }

    return (
      <div className="todo-list">
        <div className="row">
          <div className="col-8">
            <ul className='list-group"'>
              {fTodos.map((todo, index) =>
                this.getListItem(todo, index, completeTodo)
              )}
            </ul>
          </div>
          <div className="col-4 filters">
            <h5>FILTERS</h5>

            <li
              className="list-group-item"
              onClick={() => this.props.clearFilter(-1)}
            >
              Clear All
              <span className="close-filter"> &#10006;</span>
            </li>
            <ul
              id="list-group"
              onClick={e => this.props.clearFilter(e.target.id)}
            >
              {Array.from(filter).map((value, index) => (
                <li
                  className="list-group-item"
                  id={index}
                  key={index}
                  onClick={() => this.props.clearFilter(index)}
                >
                  {value}
                  <span> &#10006;</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    const that = this;
    $(".todo-item span button").click(function(e) {
      e.preventDefault();
      that.props.setFilter(e.target.innerHTML);
    });
  }
}

export default TodoList;
