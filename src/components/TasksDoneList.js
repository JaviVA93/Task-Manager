import React, { useEffect, useState } from 'react'
import triangles from '../Triangles.svg'
import { Trail } from 'react-spring/renderprops'

function TasksDoneList(props) {
    const [tasksDone, setTasksDone] = useState([]);
    
    useEffect(() => {
        setTasksDone(props.tasks_done);
        console.log(props.tasks_done);
    }, [props.tasks_done])
    
    function showTasksDone() {
        if(tasksDone.length > 0)
            {return tasksDone.map((task) => {
                return (
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
                            </div>
                        }
                    </Trail>
                )
            })
        }
        else {
            return (
                <h2>Aun no has completado ninguna tarea!</h2>
            )
        }
        
    }
    
    return (
        <div>
            <h2> Tasks Done {tasksDone.length}</h2>
            {showTasksDone()}
        </div>
    );
}

export default TasksDoneList