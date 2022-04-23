import React, { Component } from "react";
import FormTodos from "./components/FormTodos";
import TableTodo from "./components/TableTodo";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      todo: "",
      status: true,
      todoList: [],
      isUpdate: false,
      idTodo: undefined,
      todoStatus: "All",
      text: "",
    };
  }

  passDataFromChild = (name, value) => {
    if (name === "status") {
      value = value === "true" ? Boolean(true) : Boolean(false);
    }
    this.setState({
      [name]: value,
    });
  };
  handleOnClick = (e) => {
    var { todo, status, todoList, id, isUpdate, todoStatus } = this.state;
    const newTodoList = localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
    if (!isUpdate) {
      if (todoList.length !== 0) {
        id = 2;
        id = todoList[todoList.length - 1].id;
        ++id;
      } else {
        ++id;
      }
      todoList.push({ id, todo, status });
      this.setState({
        todoList: todoList,
        id,
      });
      localStorage.setItem("todoList", JSON.stringify(todoList));
      this.clearState();
    } else {
      const { idTodo, todoList, todo, status } = this.state;
      const findIndex = newTodoList.findIndex((todo) => todo.id === idTodo);
      newTodoList.splice(findIndex, 1, { id: idTodo, todo, status });
      this.setState({
        todoList: newTodoList,
        isUpdate: false,
        status: true,
      });
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      this.handleOnSearch(this.state.text);
      this.clearState();
    }
  };
  componentDidMount() {
    const newTodoList = localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
    this.setState({
      todoList: newTodoList,
    });
  }
  handleDeleteTodo = (id) => {
    const newTodoList = JSON.parse(localStorage.getItem("todoList"));
    const findIndex = newTodoList.findIndex(function (todo) {
      return todo.id === id;
    });
    newTodoList.splice(findIndex, 1);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    this.setState({
      todoList: newTodoList,
      idTodo: id,
    });
    this.handleOnSearch(this.state.text);
  };
  handleUpdateStatus = (id) => {
    const newTodoList = JSON.parse(localStorage.getItem("todoList"));
    const findIndex = newTodoList.findIndex(function (todo) {
      return todo.id === id;
    });
    newTodoList[findIndex].status = !newTodoList[findIndex].status;
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    this.setState({
      todoList: newTodoList,
    });
    this.handleOnSearch(this.state.text);
  };
  handleEditTodo = (todo, status, id) => {
    this.setState({
      isUpdate: true,
      todo,
      status,
      idTodo: id,
    });
  };
  clearState = () => {
    this.setState({
      todo: "",
      status: true,
    });
  };

  handleOnSearch = (textSearch) => {
    let { todoList } = this.state;
    let newTodoList = localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
    todoList = newTodoList.filter((todo) =>
      todo.todo.toLowerCase().includes(textSearch.toLowerCase())
    );
    if (todoList.length !== 0) {
      this.setState({
        todoList,
        text: textSearch,
      });
    } else {
      this.setState({
        todoList,
        text: textSearch,
      });
    }
  };
  handleOnSelectFlowStatus = (status) => {
    if (status === "All") {
      status = "All";
    } else if (status === "true") {
      status = true;
    } else {
      status = false;
    }
    this.setState({
      todoStatus: status,
    });
    let newTodoList = localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
    if (status === "All") {
      this.setState({
        todoList: newTodoList,
      });
    } else {
      newTodoList = newTodoList.filter((todo) => {
        return todo.status === status;
      });
      this.setState({
        todoList: newTodoList,
        todoStatus: status,
      });
    }
  };
  render() {
    return (
      <>
        <div className="row" style={{ margin: "100px" }}>
          <FormTodos
            passDataFromChild={this.passDataFromChild}
            handleOnClick={this.handleOnClick}
            isUpdate={this.state.isUpdate}
            state={this.state}
            handleUpdateTodo={this.handleUpdateTodo}
          />
          <TableTodo
            todoList={this.state.todoList}
            handleDeleteTodo={this.handleDeleteTodo}
            handleUpdateStatus={this.handleUpdateStatus}
            handleEditTodo={this.handleEditTodo}
            handleOnSearch={this.handleOnSearch}
            handleOnSelectFlowStatus={this.handleOnSelectFlowStatus}
          />
        </div>
      </>
    );
  }
}
