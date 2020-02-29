import React, { useEffect, useState } from 'react'
import triangles from '../Triangles.svg'
import { Trail } from 'react-spring/renderprops'


function TaskList(props) {
    const [tasks, setTasks] = useState(0);
    const [user, setUser] = useState({});

    useEffect(() => {
        setTasks(0);
        setUser({})
    }, [])
    
    useEffect(() => {
        setTasks(props.fb_tasks);
    }, [props.fb_tasks])

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    //hacer un selector de color para las tarjetas con las tareas


    //Si me deslogeo eliminar tareas!!!
    //Si me deslogeo eliminar tareas!!!
    //Si me deslogeo eliminar tareas!!!
    //Si me deslogeo eliminar tareas!!!


    function handleRemoveTask(task_id){
        props.handleRemoveTask(task_id);
    }

    //Esta condición está mal hecha y siempre 
    //te muestra como usuario logeado.
    if (typeof user.email !== "undefined") {
        console.log(user);
        if (tasks.length === 0) {
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
                    items={tasks}
                    keys={tasks.map((_, i) => i)}
                    from={{ opacity: 0, transform: 'translate3d(-660px,0px,0)' }}
                    to={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                    config={{ duration: 1000 }}
                >
                    {task => props =>
                        <div className="col-md-4"
                            key={task.id}
                            style={props}
                        >
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
                                        onClick={() => {handleRemoveTask(task.id)}}>
                                        Remove
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