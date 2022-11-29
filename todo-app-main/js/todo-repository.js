function getTodoList() {
   return fetch('https://todos-app.herokuapp.com/api/todos')
    .then((response) => response.json());
}

function postTodo(todo) {
   console.log(todo)
   return fetch('https://todos-app.herokuapp.com/api/todos', {
      method: "POST",
      headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Connection': 'keep-alive',
            'Accept': '*/*',
        },
      body: todo
   })
   .then((response) => response.json());
}