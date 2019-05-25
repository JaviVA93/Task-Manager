import React, { Component } from 'react';

class NewTaskForm extends Component {
    constructor() {
        super();
        this.state = {
            task_title: 'not set',
            task_responsible: 'not set',
            task_description: 'not set',
            task_priority: 'low'
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputs(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAddTask(this.state);
        console.log(this.state);
    }

    render() {
        return (
            <div className="col-md-6 mx-auto mt-2 mb-2">
                <div className="card">
                    <div className="card-header">
                        <h3>Create a new Task</h3>
                    </div>
                    <form className="card-body" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                className="form-control text-center"
                                placeholder="Task Title"
                                type="text"
                                name="task_title"
                                onChange={this.handleInputs} />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control text-center"
                                placeholder="Task Responsible"
                                type="text"
                                name="task_responsible"
                                onChange={this.handleInputs} />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control text-center"
                                placeholder="Task Description"
                                type="text"
                                name="task_description"
                                onChange={this.handleInputs} />
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control custom-select text-center"
                                placeholder="Task Priority"
                                name="task_priority"
                                onChange={this.handleInputs} >
                                <option defaultValue>Select the priority</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <button className="btn btn-danger">Save</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default NewTaskForm