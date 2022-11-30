setTimeout(renderTodos, 1500);

function renderTodos() {
	if(!todoList) {
		getDefaultTodoList().then((data) => {
	   		todoList = data;
	   		filterList();
		});
	}
	else {
		filterList();
	}
}

const todoInput = document.getElementById('js-add-todo-input');

todoInput.addEventListener('keydown', (event) => {
	// key code of enter = 13
	if(event.keyCode === 13) {
		addTodo();
	}
});

function filterList() {
	selectedFilter == filter.all ? filterAllTodos() : selectedFilter == filter.active ? filterActiveTodos() : filterCompletedTodos();
}

function addTodo() {
	if(todoInput.value == '' || todoInput.value == null) return;
	getTodos().add({task: todoInput.value});
	todoInput.value = '';
}

function completeTodo(event) {
	getTodos().find(todo => todo.id == event.target.value).isCompleted = event.target.checked;
	filterList();
}

function removeTodo(id) {
	getTodos().remove(id);
}

function clearCompletedTodos() {
	getTodos().remove();
	filterList();
}

function updateFilterType(event) {
	selectedFilter = event.target.value;
	filterList();
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
	loadTodos();
}

function filterCompletedTodos() {
	clearFilters();
	document.querySelectorAll(".js-filter-completed").forEach(el => {
		el.classList.add('active');
	});
	loadTodos();
}