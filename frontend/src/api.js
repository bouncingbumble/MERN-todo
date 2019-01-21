const APIURL = '/api/todos/';

export async function getTodos(){
    return fetch(APIURL)
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
}

export async function addTodo(todo){
  return fetch(APIURL, {
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
}

export async function removeTodo(id){
  return fetch(APIURL + id, {
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
}

export async function toggleTodo(todo){
  return fetch(APIURL + todo._id, {
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
}