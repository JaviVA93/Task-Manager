import React, { Component } from 'react'

class TaskList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: {}
        }
    }

    render() {
        const tasks_list = this.props.tasks.map((task, i) => {
            return (
                <div className="col-md-4">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3>{task.title}</h3>
                            <span className="badge badge-pill badge-danger ml-2">
                                {task.priority}
                            </span>
                        </div>
                        <div className="card-body">
                            <p>{task.description}</p>
                            <footer className="font-weight-bold">
                                {task.responsible}
                            </footer>
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-danger"
                                onClick={ () => this.props.removeFunction(task.id)}>
                                {task.id}
                            </button>
                        </div>
                    </div>
                </div>
            );
        })

        return tasks_list
    }

}

export default TaskList