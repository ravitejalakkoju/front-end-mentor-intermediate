loadTodos();

const todoInput = document.getElementById('js-add-todo-input');

todoInput.addEventListener('keydown', (event) => {
	alert(event.keyCode);
	// key code of enter = 13
	if(event.keyCode === 13) {
		addTodo();
	}
})

let activeFilterType = 'all';

function filter() {
	activeFilterType == 'all' ? filterAllTodos() : activeFilterType == 'active' ? filterActiveTodos() : filterCompletedTodos();
}

function addTodo() {
	if(todoInput.value == '' || todoInput.value == null) return;
	idCounter++;
	getTodos().push({
		id: idCounter,
		task: todoInput.value,
		isCompleted: false
	});
	todoInput.value = '';
}

function completeTodo(event) {
	getTodos().find(todo => todo.id == event.target.value).isCompleted = event.target.checked;
	filter();
}

function removeTodo(id) {
	getTodos().remove(id);
}

function clearCompletedTodos() {
	getTodos().remove();
	filter();
}

function updateFilterType(event) {
	activeFilterType = event.target.value;
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
	loadTodos(false)
}

function filterCompletedTodos() {
	clearFilters();
	document.querySelectorAll(".js-filter-completed").forEach(el => {
		el.classList.add('active');
	});
	loadTodos(true);
}