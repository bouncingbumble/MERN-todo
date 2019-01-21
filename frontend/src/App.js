import React, { Component } from 'react';
import './App.css';

class TodoList extends Component {
  constructor(){
    super();
    this.state = {
      todos: []
    }
  }


  render() {
    let {todos} = this.props;
    let todoList = todos.map((todo, i) => (
      <TodoItem key="i" name={todo.name} completed={todo.completed} />
    ))
    return (
      <div className="todoList">
        <h2>todolist</h2>
        <TodoForm/>
        {todoList}
      </div>
    );
  }
}

class TodoForm extends Component{
  render(){
    return (
      <form>
        <input type="text" placeholder="Insert your task here..." name="firstname"></input>
      </form>
    )
  }
}

class TodoItem extends Component{
  render(){
    let {name, completed} = this.props;
    return (
      <div className="todoItem">
        <h2 className={completed ? "checked" : "unchecked"}>{name}<span>X</span></h2>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>This is the todo app</h1>
      <TodoList todos={TODOS}/>
      </div>
    );
  }
}

const TODOS = [
  { 
    name: 'Walk the dog',
    completed: false
  },
  { 
    name: 'Walk the dog',
    completed: true
  },
  { 
    name: 'Walk the dog',
    completed: false
  }
]

export default App;
