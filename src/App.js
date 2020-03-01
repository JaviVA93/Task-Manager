import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import TasksDoneList from './components/TasksDoneList';
import { tasks } from './tasks.json';
import firebase from 'firebase';
import { DB_CONFIG } from './FirbaseConfig'

const App = () => {
  const title = "Tasks App";
  const [user, setUser] = useState({});
  const [fbTasks, setFbTasks] = useState([]);
  const [app, setApp] = useState(null);
  const [database, setDatabase] = useState(null);
  if (app === null) { setApp(firebase.initializeApp(DB_CONFIG)); }

  useEffect(() => {
    if (database !== null && app !== null) {
      database.on('value', snap => {
        var aux_fb_tasks = [];
        if (snap.val()) {
          Object.keys(snap.val()).forEach((key) => {
            aux_fb_tasks.push({
              title: snap.val()[key].title,
              responsible: snap.val()[key].responsible,
              description: snap.val()[key].description,
              priority: snap.val()[key].priority,
              taskDone: snap.val()[key].taskDone,
              id: key
            })
          });
        }
        setFbTasks(aux_fb_tasks);
      });
    }
  }, []);

  const setUserCallback = (childData) => {
    if (childData && childData !== null) {
      setUser(childData);
      let user_for_db = childData.email.replace(/\./g, "-");
      let act_db = app.database().ref().child('tasks/' + user_for_db);
      setDatabase(act_db);
      if (typeof database !== "undefined") {
        act_db.on('value', snap => {
          var aux_fb_tasks = [];
          if (snap.val()) {
            Object.keys(snap.val()).forEach((key) => {
              aux_fb_tasks.push({
                title: snap.val()[key].title,
                responsible: snap.val()[key].responsible,
                description: snap.val()[key].description,
                priority: snap.val()[key].priority,
                taskDone: snap.val()[key].taskDone,
                id: key
              })
            });
          }
          setFbTasks(aux_fb_tasks)
        });
      }
    }
    //Si <childData> es "null" quiere decir que se ha hecho logout
    //actualizar la info del usuario a un usuario vacío.
    else {
      setUser({});
    }
  }

  const handleAddTask = (task) => {
    let new_id = Math.floor(Math.random() * (900000 - 100000) + 100000);
    let new_task = {
      title: task.task_title,
      responsible: task.task_responsible,
      description: task.task_description,
      priority: task.task_priority,
      taskDone: task.task_done
    };

    let updates = {};
    let user_for_fb = user.email.replace(/\./g, "-");
    updates['/tasks/' + user_for_fb + '/' + new_id.toString()] = new_task;
    firebase.database().ref().update(updates)
      .then((result) => {
        console.log(`New task added!`);
      })
      .catch((error) => {
        console.log(`An error occurred adding a new task: ${error}`);
      })

  }

  const handleRemoveTask = (task_id) => {
    let user_for_fb = user.email.replace(/\./g, "-");
    firebase.database().ref('tasks/' + user_for_fb + '/' + task_id).remove()
      .then((response) => {
        console.log(`Task removed.`);
      })
      .catch((error) => {
        console.log(`An error occurred removing a task: ${error}`)
      })
  }

  const handleRemoveAllTasksDone = () => {
    fbTasks.forEach((task) => {
      if (task.taskDone === "true") {
        let user_for_fb = user.email.replace(/\./g, "-");
        firebase.database().ref('tasks/' + user_for_fb + '/' + task.id).remove()
          .then((response) => {
            console.log(`Task removed.`);
          })
          .catch((error) => {
            console.log(`An error occurred removing a task: ${error}`)
          })
      }
    })
  }

  const handleDoneTask = (task) => {
    let user_for_fb = user.email.replace(/\./g, "-");
    firebase.database().ref('tasks/' + user_for_fb + '/' + task.id).update({ 'taskDone': 'true' })
      .then((response) => {
        console.log(`Task Done!`);
      })
      .catch((error) => {
        console.log(`An error occurred removing a task: ${error}`)
      })
  }

  const filterTasksDone = () => {
    let tasks_done = [];
    fbTasks.forEach((task) => {
      let taskDone = task.taskDone || ""
      if (task.taskDone === "true") {
        tasks_done.push(task);
      }
    })
    return tasks_done;
  }

  return (
    <div className="App">
      <Navbar
        num_tasks={fbTasks.length}
        setUserCallback={setUserCallback}
        user={user} />
      <div className="App-center">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-white">
          {title}
        </h1>
        <div className="container">
          <div className="row mt-4 mb-4 justify-content-center">
            <TaskList
              handleRemoveTask={handleRemoveTask}
              handleDoneTask={handleDoneTask}
              fb_tasks={fbTasks}
              user={user} />
          </div>
        </div>
        {typeof user.email !== "undefined" &&
          <div>
            <NewTaskForm
              onAddTask={handleAddTask}
              user={user}
            />
            <div className="container">
              <div className="mt-5 col-md-8 mx-auto justify-content-center">
                <TasksDoneList
                  tasks_done={filterTasksDone()} />
                <button 
                  className="mt-3 btn btn-outline-info"
                  onClick={() => {handleRemoveAllTasksDone()}}>
                  Remove completed tasks.                  
                </button>
              </div>
            </div>
          </div>}
      </div>
    </div>
  );
}

class App2 extends Component {
  constructor() {
    super(); //All React functionalities

    this.state = {
      title: 'Tasks App',
      tasks,
      fb_tasks: [],
      user: {
      }
    };

    this.app = firebase.initializeApp(DB_CONFIG);

    this.handleAddTask = this.handleAddTask.bind(this)
    this.handleRemoveTask = this.handleRemoveTask.bind(this)
    this.handleDoneTask = this.handleDoneTask.bind(this)
    this.setUserCallback = this.setUserCallback.bind(this)
  }

  componentDidMount() {
    if (typeof this.database !== "undefined") {
      this.database.on('value', snap => {
        var aux_fb_tasks = [];
        if (snap.val()) {
          Object.keys(snap.val()).forEach((key) => {
            aux_fb_tasks.push({
              title: snap.val()[key].title,
              responsible: snap.val()[key].responsible,
              description: snap.val()[key].description,
              priority: snap.val()[key].priority,
              taskDone: snap.val()[key].taskDone,
              id: key
            })
          });
        }
        this.setState({
          fb_tasks: aux_fb_tasks
        });
      });
    }
  }

  handleAddTask(task) {
    let new_id = Math.floor(Math.random() * (900000 - 100000) + 100000);
    let new_task = {
      title: task.task_title,
      responsible: task.task_responsible,
      description: task.task_description,
      priority: task.task_priority,
      taskDone: task.task_done
    };

    let updates = {};
    let user_for_fb = this.state.user.email.replace(/\./g, "-");
    updates['/tasks/' + user_for_fb + '/' + new_id.toString()] = new_task;
    firebase.database().ref().update(updates)
      .then((result) => {
        console.log(`New task added!`);
      })
      .catch((error) => {
        console.log(`An error occurred adding a new task: ${error}`);
      })

  }

  handleRemoveTask(task_id) {
    let user_for_fb = this.state.user.email.replace(/\./g, "-");
    firebase.database().ref('tasks/' + user_for_fb + '/' + task_id).remove()
      .then((response) => {
        console.log(`Task removed.`);
      })
      .catch((error) => {
        console.log(`An error occurred removing a task: ${error}`)
      })
  }

  handleDoneTask(task) {
    console.log(task);
    let user_for_fb = this.state.user.email.replace(/\./g, "-");
    firebase.database().ref('tasks/' + user_for_fb + '/' + task.id).update({ 'taskDone': 'true' })
      .then((response) => {
        console.log(`Task Done!`);
      })
      .catch((error) => {
        console.log(`An error occurred removing a task: ${error}`)
      })
  }

  setUserCallback(childData) {
    console.log(`Dentro del setUserCallback\n Valor del childData = ${childData}`)
    //Si <childData> no es "null" entonces hay información de usuario,
    //el usuario se ha logeado, y hay que actualizar la info de user
    //Y también cargar las tareas de dicho usuario.
    if (childData !== null) {
      this.setState({ user: childData });
      let user_for_db = this.state.user.email.replace(/\./g, "-");
      this.database = this.app.database().ref().child('tasks/' + user_for_db);
      if (typeof this.database !== "undefined") {
        this.database.on('value', snap => {
          var aux_fb_tasks = [];
          if (snap.val()) {
            Object.keys(snap.val()).forEach((key) => {
              aux_fb_tasks.push({
                title: snap.val()[key].title,
                responsible: snap.val()[key].responsible,
                description: snap.val()[key].description,
                priority: snap.val()[key].priority,
                taskDone: snap.val()[key].taskDone,
                id: key
              })
            });
          }
          this.setState({
            fb_tasks: aux_fb_tasks
          });
        });
      }
    }
    //Si <childData> es "null" quiere decir que se ha hecho logout
    //actualizar la info del usuario a un usuario vacío.
    else {
      this.setState({ user: {} });
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar
          num_tasks={this.state.fb_tasks.length}
          setUserCallback={this.setUserCallback}
          user={this.state.user} />
        <div className="App-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="text-white">
            {this.state.title}
          </h1>
          <div className="container">
            <div className="row mt-4 mb-4 justify-content-center">
              <TaskList
                tasks={this.state.tasks}
                handleRemoveTask={this.handleRemoveTask}
                handleDoneTask={this.handleDoneTask}
                fb_tasks={this.state.fb_tasks}
                user={this.state.user} />
            </div>
          </div>
          {typeof this.state.user.email !== "undefined" &&
            <NewTaskForm
              onAddTask={this.handleAddTask}
              user={this.state.user}
            />}

          <TasksDoneList
            fb_tasks={this.state.fb_tasks} />
        </div>
      </div>
    );
  }
}

export default App;
