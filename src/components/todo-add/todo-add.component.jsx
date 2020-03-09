import React from "react";

class TodoAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTodo: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo({
      title: this.state.inputTodo,
      id: this.props.nextTodoId,
      completed: false
    });
    this.setState({ inputTodo: "" });
  };

  render() {
    return (
      <div className="todo-add">
        <form onSubmit={e => this.handleSubmit(e)} className="form-inline">
          <div className="form-group m-2">
            <input
              className="form-control"
              type="text"
              name="inputTodo"
              value={this.state.inputTodo}
              onChange={e => this.handleChange(e)}
              placeholder="Enter Task"
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default TodoAdd;
