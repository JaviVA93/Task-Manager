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
      fb_tasks: {}
    };
    
    this.handleAddTask = this.handleAddTask.bind(this)
    this.handleRemoveTask = this.handleRemoveTask.bind(this)
  }

  componentDidMount() {
    this.database.on('value', snap => {
      this.setState({
        fb_tasks: snap.val()
      });
    });
    
  }

  handleAddTask(task) {
    var new_id = Math.floor(Math.random() * (900000 - 100000) + 100000);
    var new_task = {
      title: task.task_title,
      responsible: task.task_responsible,
      description: task.task_description,
      priority: task.task_priority,
      id: new_id.toString()
    }
    this.setState({
      tasks: [...this.state.tasks, new_task]
    })
  }

  handleRemoveTask(new_tasks_list) {
    this.setState({
      tasks: new_tasks_list
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar num_tasks={this.state.tasks.length} />
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
