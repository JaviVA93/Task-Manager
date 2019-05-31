import React, { Component } from 'react'

class TaskList extends Component {
    constructor() {
        super();
        this.state = {
            fb_tasks: ""
        }
    }

    componentWillReceiveProps(next_props) {
        this.setState({
            fb_tasks: next_props.fb_tasks
        })

        console.log(next_props.fb_tasks);
        console.log(this.state.fb_tasks);
    }

    handleRemove(task_id) {
        var aux_tasks_list = this.props.tasks.filter((e) => {
            return e.id !== task_id
        })
        this.props.handleRemoveTask(aux_tasks_list);
    }

    render() {
        const tasks_list = this.props.tasks.map((task, i) => {
            return (
                <div className="col-md-4"
                key={task.id}>
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
                                onClick={ () => this.handleRemove(task.id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            );
        })

        const task_list_fb = Object.keys(this.state.fb_tasks).forEach(key => {
            return (
                <div className="col-md-4"
                key={key}>
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3>{this.state.fb_tasks[key].title}</h3>
                            <span className="badge badge-pill badge-danger ml-2">
                                {this.state.fb_tasks[key].priority}
                            </span>
                        </div>
                        <div className="card-body">
                            <p>{this.state.fb_tasks[key].description}</p>
                            <footer className="font-weight-bold">
                                {this.state.fb_tasks[key].responsible}
                            </footer>
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-danger">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            );
        });

        return tasks_list
    }

}

export default TaskList