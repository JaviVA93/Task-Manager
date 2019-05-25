import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import NewTaskForm from './components/NewTaskForm';
import AdobeAccessToken from './AdobeAccessToken';
import TaskList from './components/TaskList'
import { tasks } from './tasks.json';

class App extends Component {
  constructor() {
    super(); //All React functionalities
    this.state = {
      title: 'Tasks App',
      tasks
    }
    var actual_tasks_list = this.state.tasks;

    this.handleAddTask = this.handleAddTask.bind(this)
    this.handleRemoveTask = this.handleRemoveTask.bind(this)
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
    console.log(`All tasks: ${ {tasks} }`)
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
              handleRemoveTask={this.handleRemoveTask} />
          </div>
        </div>
        <NewTaskForm onAddTask={this.handleAddTask} />
      </div>
    );
  }
}

export default App;
