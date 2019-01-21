import React, { Component } from 'react';
import './App.css';
const APIURL = '/api/todos';

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
  }

  componentWillMount(){
    this.loadTodos();
  }

  loadTodos(){
    fetch(APIURL)
    .then(response => {
      if(!response.ok) {
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Server not responding'};
          throw err;
        }
      }
      return response.json()
    })
    .then(todos => this.setState({todos}));
  }

  render() {
    let {todos} = this.state;
    let todoList = todos.map(todo => (
      <TodoItem key={todo._id} {...todo} />
    ))
    return (
      <div className="todoList">
        <h2>todolist</h2>
        <TodoForm/>
        <ul>
        {todoList}
        </ul>
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

const TodoItem = ({name, completed}) => (
  <li style={{textDecoration: completed ? "line-through" : "none"}}>{name}<span>X</span></li>
)

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
