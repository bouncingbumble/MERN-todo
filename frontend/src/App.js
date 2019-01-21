import React, { Component } from 'react';
import './App.css';
import * as api from './api';
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

  async loadTodos(){
    let todos = await api.getTodos();
    this.setState({todos});
  }

  async addTodo(todo){
    let newTodo = await api.addTodo(todo);
    this.setState({todos: [...this.state.todos, newTodo]});
  }

  async deleteTodo(id){
    await api.removeTodo(id);
    this.setState({todos: this.state.todos.filter(todo => todo._id !== id)})
  }

  async updateTodo(todo){
    let updatedTodo = await api.toggleTodo(todo);
    const todos = this.state.todos.map(t => 
      (t._id === updatedTodo._id)
      ? {...t, completed: !t.completed}
      : t
    )
    this.setState({todos: todos});
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
