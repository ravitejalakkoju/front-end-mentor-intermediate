function getDefaultTodoList() {
   return fetch('https://todos-app.herokuapp.com/api/todos')
    .then((response) => response.json());
}

function postTodo(todo) {
   // return fetch('https://todos-app.herokuapp.com/api/todos', {
   //    method: "POST",
   //    headers: {
   //          'Content-Type': 'application/json',
   //          'Connection': 'keep-alive',
   //          'Accept': 'application/json',
   //      },
   //    body: JSON.stringify(todo)
   // })
   // .then((response) => response.json());
}