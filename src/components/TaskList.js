import React, { useEffect, useState } from 'react'
import triangles from '../Triangles.svg'
import { Trail } from 'react-spring/renderprops'


function TaskList(props) {
    const [tasks, setTasks] = useState(0);
    const [user, setUser] = useState({});
    const [tasksToDo, setTasksToDo] = useState([])

    useEffect(() => {
        setTasks(0);
        setUser({})
    }, [])

    useEffect(() => {
        setTasks(props.fb_tasks);
        setTasksToDo(filterTasksToDo(props.fb_tasks));
    }, [props.fb_tasks])

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    function filterTasksToDo(_tasks){
        let tasks_todo = [];
        _tasks.forEach((task) => {
            let taskDone = task.taskDone || ""
            if(task.taskDone === "false"){
                tasks_todo.push(task);
            }
        })
        return tasks_todo;
    }

    function handleRemoveTask(task_id) {
        props.handleRemoveTask(task_id);
    }

    function getCardColor(taskPriority) {
        let task_priority = taskPriority || "";
        let card_color = "";
        if (task_priority === "High") {
            card_color = "linear-gradient(to right, #B70B0B, #F80B0B, #B70B0B)";
        }
        else if (task_priority === "Medium") {
            card_color = "linear-gradient(to right, #DC6D13, #ED8835, #DC6D13)";
        }
        else {
            card_color = "linear-gradient(to right, #0A47CB, #2C6AF1, #0A47CB)";
        }

        return card_color;
    }

    if (typeof user.email !== "undefined") {
        if (tasksToDo.length === 0) {
            return (
                <div className="mx-auto">
                    <img src={triangles} alt="Loading tasks..." />
                    <h2>
                        Loading
                    </h2>
                </div>
            );
        } else {
            return (
                <Trail
                    items={tasksToDo}
                    keys={tasksToDo.map((_, i) => i)}
                    from={{ opacity: 0, transform: 'translate3d(-660px,0px,0)' }}
                    to={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                    config={{ duration: 1000 }}
                >
                    {task => attributes =>
                        <div className="col-md-4"
                            key={task.id}
                            style={attributes}
                        >
                            <div className="card mt-4">
                                <div className="card-header">
                                    <h3>{task.title}</h3>
                                    <span className="badge badge-pill badge-danger ml-2"
                                        style={{ 'backgroundImage': getCardColor(task.priority) }}>
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
                                        className="btn btn-danger mx-1"
                                        onClick={() => { handleRemoveTask(task.id) }}>
                                        Remove
                                    </button>
                                    <button
                                        className="btn btn-success mx-1"
                                        onClick={() => { props.handleDoneTask(task) }}>
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </Trail>
            )
        }
    }
    else {
        return (
            <div className="mx-auto">
                <h2>
                    You must be logged to see your tasks.
                </h2>
            </div>
        );
    }
}

export default TaskList