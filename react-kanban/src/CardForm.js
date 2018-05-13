import React, { Component } from "react";
import { format } from "path";

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      priority: null,
      status: null,
      createdBy: null,
      assignedTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    console.log("submit: ", e);
    e.preventDefault();
    console.log("state: ", this.state);
    this.props.addCard(this.state);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          <label className="label1">
            Card Title:
            <input onChange={this.handleChange} name="title" type="text" />
          </label>
        </ul>
        <ul>
          <label className="label1">
            Priority:
            <label htmlFor="lowRadio">Low</label>
            <input
              onChange={this.handleChange}
              id="lowRadio"
              type="radio"
              name="priority"
              value="low"
            />
            <label htmlFor="mediumRadio">Medium</label>
            <input
              onChange={this.handleChange}
              id="mediumRadio"
              type="radio"
              name="priority"
              value="medium"
            />
            <label htmlFor="highRadio">High</label>
            <input
              onChange={this.handleChange}
              id="highRadio"
              type="radio"
              name="priority"
              value="high"
            />
            <label htmlFor="blockedRadio">Blocked</label>
            <input
              onChange={this.handleChange}
              id="blockedRadio"
              type="radio"
              name="priority"
              value="blocked"
            />
          </label>
        </ul>
        <ul>
          <label className="label1">
            Status:
            <label htmlFor="queueRadio">Queue</label>
            <input
              onChange={this.handleChange}
              id="queueRadio"
              type="radio"
              name="status"
              value="queue"
            />
            <label htmlFor="progRadio">In Progress</label>
            <input
              onChange={this.handleChange}
              id="progRadio"
              type="radio"
              name="status"
              value="prog"
            />
            <label htmlFor="doneRadio">Done</label>
            <input
              onChange={this.handleChange}
              id="doneRadio"
              type="radio"
              name="status"
              value="done"
            />
          </label>
        </ul>
        <ul>
          <label className="label1">
            Created By:
            <input onChange={this.handleChange} name="createdBy" type="text" />
          </label>
        </ul>
        <ul>
          <label className="label1">
            Assigned To:
            <input onChange={this.handleChange} name="assignedTo" type="text" />
          </label>
        </ul>
        <ul>
          <input type="submit" value="Submit" />
        </ul>
      </form>
    );
  }
}

export default CardForm;
