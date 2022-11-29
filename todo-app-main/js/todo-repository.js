function getTodoList() {
   fetch('/api/todos')
      .then((response) => response.json())
      .then((data) => console.log(data));
}

getTodoList();