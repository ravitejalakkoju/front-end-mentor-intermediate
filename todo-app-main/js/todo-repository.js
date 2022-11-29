function getTodoList() {
   fetch('https://todos-app.herokuapp.com/api/todos')
      .then((response) => response.json())
      .then((data) => console.log(data));
}

getTodoList();