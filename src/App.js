import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList'
import { tasks } from './tasks.json';
import firebase from 'firebase';
import { DB_CONFIG } from './FirbaseConfig'


class App extends Component {
  constructor() {
    super(); //All React functionalities

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('tasks');
    this.state = {
      title: 'Tasks App',
      tasks,
      fb_tasks: []
    };

    this.handleAddTask = this.handleAddTask.bind(this)
    this.handleRemoveTask = this.handleRemoveTask.bind(this)
  }

  componentDidMount() {
    this.database.on('value', snap => {
      var aux_fb_tasks = [];
      Object.keys(snap.val()).forEach((key) => {
        aux_fb_tasks.push({
          title: snap.val()[key].title,
          responsible: snap.val()[key].responsible,
          description: snap.val()[key].description,
          priority: snap.val()[key].priority,
          id: key
        })
      });
      this.setState({
        fb_tasks: aux_fb_tasks
      });
    });

  }

  handleAddTask(task) {
    var new_id = Math.floor(Math.random() * (900000 - 100000) + 100000);
    var new_task = {
      title: task.task_title,
      responsible: task.task_responsible,
      description: task.task_description,
      priority: task.task_priority
    };

    var updates = {};
    updates['/tasks/' + new_id.toString()] = new_task;
    firebase.database().ref().update(updates)
      .then((result) => {
        console.log(`New task added!`);
      })
      .catch((error) => {
        console.log(`An error occurred adding a new task: ${error}`);
      })

  }

  handleRemoveTask(task_id) {
    firebase.database().ref('tasks/' + task_id).remove()
      .then( (response) => {
        console.log(`Task removed: ${response}`);
      })
      .catch( (error) => {
        console.log(`An error occurred removing a task: ${error}`)
      })
  }

  render() {
    return (
      <div className="App">
        <Navbar num_tasks={this.state.fb_tasks.length} />
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-white">
          {this.state.title}

        </h1>
        <div className="container">
          <div className="row mt-4 mb-4">
            <TaskList
              tasks={this.state.tasks}
              handleRemoveTask={this.handleRemoveTask}
              fb_tasks={this.state.fb_tasks} />
          </div>
        </div>
        <NewTaskForm onAddTask={this.handleAddTask} />
      </div>
    );
  }
}

export default App;
