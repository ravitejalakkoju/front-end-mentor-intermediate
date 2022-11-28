loadData();

const todoInput = document.getElementById('js-add-todo-input');

todoInput.addEventListener('keypress', (event) => {
	if(event.key === 'Enter') {
		addTodo(event.target.value);
		todoInput.value = '';
	}
})

function addTodo(task) {
	idCounter++;
	getTodos().push({
		id: idCounter,
		task: task,
		isCompleted: false
	})
}

function removeTodo(id) {
	getTodos().remove(id);
}

function clearCompletedTodos() {
	getTodos().remove();
}