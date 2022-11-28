loadTodos();

const todoInput = document.getElementById('js-add-todo-input');

todoInput.addEventListener('keypress', (event) => {
	console.log(event.which);
	if(event.key === 'Enter' || event.which == 10) {
		addTodo(event.target.value);
		todoInput.value = '';
	}
})

let activeFilterType = 'all';

function filter() {
	activeFilterType == 'all' ? filterAllTodos() : activeFilterType == 'active' ? filterActiveTodos() : filterCompletedTodos();
}

function addTodo(task) {
	idCounter++;
	getTodos().push({
		id: idCounter,
		task: task,
		isCompleted: false
	})
}

function completeTodo(event) {
	console.log(event.target.value);
	getTodos().find(todo => todo.id == event.target.value).isCompleted = event.target.checked;
	console.log(getTodos());
	filter();
}

function removeTodo(id) {
	getTodos().remove(id);
}

function clearCompletedTodos() {
	getTodos().remove();
	filter();
}

function clearFilters() {
	document.querySelectorAll(".filters > button").forEach(el => {
		el.classList.remove('active');
	});
}

function filterAllTodos() {
	clearFilters();
	document.querySelectorAll(".js-filter-all").forEach(el => {
		el.classList.add('active');
	});
	loadTodos();
}

function filterActiveTodos() {
	clearFilters();
	document.querySelectorAll(".js-filter-active").forEach(el => {
		el.classList.add('active');
	});
	activeFilterType = 'active';
	loadTodos(false)
}

function filterCompletedTodos() {
	clearFilters();
	document.querySelectorAll(".js-filter-completed").forEach(el => {
		el.classList.add('active');
	});
	activeFilterType = 'completed';
	loadTodos(true);
}