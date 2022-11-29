function getTodoList() {
   return fetch('https://todos-app.herokuapp.com/api/todos')
    .then((response) => response.json());
}

function postTodo(todo) {
   console.log(todo)
   return fetch('https://todos-app.herokuapp.com/api/todos', {
      method: "POST",
      body: todo
   })
   .then((response) => response.json());
}