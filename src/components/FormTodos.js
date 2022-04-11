import React, { Component } from "react";
export default class FormTodos extends Component {
  handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.passDataFromChild(name, value);
  };

  handleOnClick = (e) => {
    this.props.handleOnClick();
  };
  render() {
    const { isUpdate, state } = this.props;
    return (
      <div>
        {" "}
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <form>
            <legend>Form Todo</legend>

            <div className="form-group">
              <label>Todo Name</label>
              <input
                onChange={this.handleOnChange}
                type="text"
                className="form-control"
                name="todo"
                placeholder="Todo ahihi"
                value={state.todo}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                id="input"
                className="form-control"
                required="required"
                onChange={this.handleOnChange}
                value={state.status}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <button
              onClick={this.handleOnClick}
              type="button"
              className={isUpdate ? `btn btn-success` : "btn btn-danger"}
            >
              {isUpdate ? "UPDATE TO" : "ADD TODO"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
