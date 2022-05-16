import React, { Component } from "react";
import FormTodos from "./components/FormTodos";
import TableTodo from "./components/TableTodo";
import axios from "axios";
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
      mainTodo: [],
      textStatus: "All",
      isLoading: false,
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
    var { todo, status, todoList, id, isUpdate, todoStatus, idTodo } =
      this.state;
    if (!isUpdate) {
      axios
        .post("http://localhost:1234/todo/create", { todo, status })
        .then((res) => {
          const { statusCode, message } = res.data;
          if (statusCode === 200) {
            this.getAllTodos();
            this.clearState();
          }
        });
    } else {
      axios
        .put(`http://localhost:1234/todo/update/${idTodo}`, { todo, status })
        .then((res) => {
          const { statusCode, message } = res.data;
          if (statusCode === 200) {
            console.log(message);
            this.getAllTodos();
            this.clearState();
          }
        })
        .then(() => {
          setTimeout(() => {
            this.handleOnSearch(this.state.text, true);
          }, 100);
        });
    }
  };
  getAllTodos = () => {
    axios.get("http://localhost:1234/todo/get").then((res) => {
      const { todos } = res.data;
      this.setState({
        todoList: todos,
        mainTodo: todos,
      });
    });
  };
  componentDidMount() {
    this.getAllTodos();
  }
  handleDeleteTodo = async (_id) => {
    await axios
      .delete(`http://localhost:1234/todo/delete/${_id}`)
      .then((res) => {
        const { statusCode } = res.data;
        if (statusCode === 200) {
          this.getAllTodos();
          this.clearState();
          this.setState({
            isLoading: true,
          });
        }
      });
    setTimeout(() => {
      this.handleOnSearch(this.state.text, true);
      this.handleOnSelectFlowStatus(this.state.textStatus);
      this.setState({
        isLoading: false,
      });
    }, 200);
  };
  handleUpdateStatus = (_id) => {
    axios.put(`http://localhost:1234/todo/update/status/${_id}`).then((res) => {
      const { statusCode, message } = res.data;
      if (statusCode === 200) {
        console.log(message);
        this.getAllTodos();
        this.clearState();
      }
    });
  };
  handleEditTodo = (todo, status, _id) => {
    this.setState({
      isUpdate: true,
      todo,
      status,
      idTodo: _id,
    });
  };
  clearState = () => {
    this.setState({
      todo: "",
      status: true,
    });
  };

  handleOnSearch = (textSearch, b) => {
    let { todoList, mainTodo } = this.state;
    todoList = mainTodo.filter((todo) =>
      todo.todo.toLowerCase().includes(textSearch.toLowerCase())
    );
    this.setState({
      todoList,
      text: textSearch,
    });
  };
  handleOnSelectFlowStatus = (status) => {
    if (status === "All") {
      status = "All";
    } else if (status === "true" || status === true) {
      status = true;
    } else {
      status = false;
    }
    this.setState({
      todoStatus: status,
    });
    let newTodoList = [...this.state.mainTodo];
    if (status === "All") {
      this.setState({
        todoList: newTodoList,
        textStatus: status,
      });
    } else {
      newTodoList = newTodoList.filter((todo) => {
        console.log(todo);
        console.log(status);
        return todo.status === status;
      });
      this.setState({
        todoList: newTodoList,
        todoStatus: status,
        textStatus: status,
      });
    }
  };
  render() {
    if (this.state.isLoading === true) {
      return <h1>Is Loading, Plz wait minute</h1>;
    }
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
