import React, { Component } from "react";

export default class TableTodo extends Component {
  handleDeleteTodo = (_id) => {
    this.props.handleDeleteTodo(_id);
  };
  handleUpdateStatus = (_id) => {
    this.props.handleUpdateStatus(_id);
  };
  handleEditTodo = (todo, status, _id) => {
    this.props.handleEditTodo(todo, status, _id);
  };
  handleOnSearch = (e) => {
    const { value } = e.target;
    this.props.handleOnSearch(value, false);
  };
  handleOnSelectFlowStatus = (e) => {
    const { value } = e.target;
    this.props.handleOnSelectFlowStatus(value);
  };
  renderTodoList = () => {
    let { todoList } = this.props;
    if (todoList.length === 0) {
      return (
        <tr>
          <td>
            <h1>Item not found</h1>
          </td>
        </tr>
      );
    }
    const resultTodoList = todoList.map((todo, index) => {
      return (
        <tr key={index}>
          <td>{todo._id}</td>
          <td>{todo.todo}</td>
          <td>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => this.handleUpdateStatus(todo._id)}
              className={`label label-${todo.status ? "success" : "danger"}`}
            >
              {todo.status === true ? "true" : "false"}
            </span>
          </td>
          <td>
            <button
              onClick={() =>
                this.handleEditTodo(todo.todo, todo.status, todo._id)
              }
              type="button"
              className="btn btn-success"
            >
              EDIT
            </button>
            <button
              onClick={() => this.handleDeleteTodo(todo._id)}
              type="button"
              className="btn btn-danger"
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });
    return resultTodoList;
  };
  render() {
    return (
      <div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <input
                type="text"
                className="form-control"
                placeholder="Enter text to search  . . ."
                onKeyUp={this.handleOnSearch}
              />
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <select
                name=""
                id="input"
                className="form-control"
                required="required"
                onChange={this.handleOnSelectFlowStatus}
              >
                <option value="">Filer Status</option>
                <option value="true">True</option>
                <option value="false">False</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Todos ID</th>
                <th>Todos Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.renderTodoList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
