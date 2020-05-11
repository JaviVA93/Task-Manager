import React, { useEffect, useState } from 'react'
import triangles from '../Triangles.svg'
import { Trail } from 'react-spring/renderprops'

function TasksDoneList(props) {
    const [tasksDone, setTasksDone] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTasksDone(props.tasks_done);
        console.log(props.tasks_done);
    }, [props.tasks_done])

    function handleRemoveAllTasksDone() {
        props.handleRemoveAllTasksDone();
    }

    function showTasksDone() {
        if (tasksDone.length > 0 && show) {
            return tasksDone.map((task) => {
                return (
                    <div>
                        <Trail
                            items={tasksDone}
                            keys={tasksDone.map((_, i) => i)}
                            from={{ opacity: 0, transform: 'translate3d(-660px,0px,0)' }}
                            to={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
                            config={{ duration: 1000 }} >
                            {task => attributes =>
                                <div className="card">
                                    <div className="card-header">
                                        {task.title}
                                    </div>
                                    <div className="card-body">
                                        {task.description}
                                    </div>

                                </div>
                            }
                        </Trail>
                        <button
                            className="mt-3 mb-3 btn btn-secondary"
                            onClick={() => { handleRemoveAllTasksDone() }}>
                            Remove completed tasks.
                        </button>
                    </div>


                );
            })
        }
        else if (show && tasksDone.length === 0) {
            return (<h2>Aun no has completado ninguna tarea!</h2>);
        }
        else {
            return "";
        }

    }

    return (
        <div>
            <button
                className="btn btn-dark mb-2"
                onClick={() => { setShow(!show) }}>
                Tasks Done {tasksDone.length}
            </button>
            {showTasksDone()}
        </div>
    );
}

export default TasksDoneList