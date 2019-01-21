import React, { Component } from 'react';
import './App.css';
const APIURL = '/api/todos/';

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }

    this.addTodo = this.addTodo.bind(this);
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

  addTodo(todo){
    fetch(APIURL, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: todo})
    })
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
    .then(todo => this.setState({todos: [...this.state.todos, todo]}));
  }

  deleteTodo(id){
    fetch(APIURL + id, {
      method: 'delete',
    })
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
    })
    .then(() => {
      this.setState({todos: this.state.todos.filter(todo => todo._id !== id)})
    })
  }

  updateTodo(todo){
    fetch(APIURL + todo._id, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({completed: !todo.completed})
    })
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
      return response.json();
    })
    .then(updatedTodo => {
      const todos = this.state.todos.map(t => 
        (t._id === updatedTodo._id)
        ? {...t, completed: !t.completed}
        : t
      )
      this.setState({todos: todos});
    });
  }

  render() {
    let {todos} = this.state;
    let todoList = todos.map(todo => (
      <TodoItem key={todo._id} {...todo} onDelete={this.deleteTodo.bind(this, todo._id)} onToggle={this.updateTodo.bind(this, todo)}/>
    ))
    return (
      <div className="todoList">
        <h2>todolist</h2>
        <TodoForm addTodo={this.addTodo}/>
        <ul>
        {todoList}
        </ul>
      </div>
    );
  }
}

class TodoForm extends Component{
  constructor(props){
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.addTodo(this.state.value)
    this.setState({value: ''})
  }

  render(){
    return (
      <div>
        <input type="text" placeholder="Insert your task here..." name="todoInput" value={this.state.value} onChange={this.handleChange}/>
        <button type="submit" onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

const TodoItem = ({name, completed, onDelete, onToggle}) => (
  <li><span style={{textDecoration: completed ? "line-through" : "none"}} onClick={onToggle}>{name}</span><span onClick={onDelete}> X </span></li>
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
