import React, { Component } from 'react';
import './App.css';

function TodoList(props){
  return (
    <div className="todoList">
      <h2>todolist</h2>
      <TodoForm/>
      <TodoItem/>
    </div>
  );
}

function TodoForm(props){
  return (
    <form>
      <input type="text" placeholder="Insert your task here..." name="firstname"></input>
    </form>
  )
}

function TodoItem(props){
  return (
    <div>
      <h2>todoItem <span>X</span></h2>
      <h2>todoItem <span>X</span></h2>
      <h2>todoItem <span>X</span></h2>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>This is the todo app</h1>
      <TodoList/>
      </div>
    );
  }
}

export default App;
