import React, { Component } from 'react'
import triangles from '../Triangles.svg'

class TaskList extends Component {

    componentWillReceiveProps(next_props) {
        this.setState({
            fb_tasks: next_props.fb_tasks
        })
    }

    handleRemove(task_id) {
        this.props.handleRemoveTask(task_id);
    }

    render() {
        if (this.props.user.email) {
            if (this.props.fb_tasks.length === 0) {
                return (
                    <div className="mx-auto">
                        <img src={triangles} alt="Loading tasks..." />
                    </div>
                );
            } else {
                const tasks_firebase_list = this.props.fb_tasks.map((task, i) => {
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
                                        onClick={() => this.handleRemove(task.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
                return tasks_firebase_list
            }
        }
        else {
            console.log(this.props.user);
            return (
                <div className="mx-auto">
                    <h2>
                        Debes iniciar sesión para ver tus tareas.
                    </h2>
                </div>
            );
        }


    }

}

export default TaskList