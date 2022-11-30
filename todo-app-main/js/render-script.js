var todoList = JSON.parse(localStorage.getItem('todos'));
var idCounter = localStorage.getItem('todoIdCounter') || 4;

Object.defineProperty(Array.prototype, "add", {
    configurable: true,
    enumerable: false,
    writable: true, 
    value: function (...args)
    {	
		this.push({id: idCounter++, task: args[0].task, isCompleted: false});
		localStorage.setItem('todos', JSON.stringify(this));
		filterList();
    }
});

Object.defineProperty(Array.prototype, "remove", {
    writable: true,
    value: function(...args) {
    	const indexes = args.length > 0 ? [this.findIndex(todo => todo.id == args)] : this.map((todo, index) => todo.isCompleted ? index : -1).filter(idx => idx >= 0);
        indexes.reverse().forEach(idx => {
        	this.splice(idx, 1);
        });
		localStorage.setItem('todos', JSON.stringify(this));
        filterList(); 
    }
});

const filter = {
	all: 0,
	active: 1,
	completed: 2
}

let selectedFilter = filter.all;

function getTodos() {
	return todoList;
}

function swapTodos(startIndex, dropIndex) {
	var droppedItem = todoList[dropIndex];
	todoList[dropIndex] = todoList[startIndex];
	todoList[startIndex] = droppedItem;
	localStorage.setItem('todos', JSON.stringify(todoList));
}

function getFilteredTodos() {
	return getTodos().filter(selectedFilter == filter.all ? todo => true : todo => todo.isCompleted == (selectedFilter == filter.completed));
}

function loadTodos() {
	const todoList = document.getElementById('js-todo-list');
	todoList.innerHTML = '';
	const filteredList = getFilteredTodos();
	if(filteredList.length == 0) {
		const emptyTodoItem = 
		`<div class="todo-item todo-item--empty">
	        <p>No Task</p>
	    </div>`;
		todoList.insertAdjacentHTML('beforeend', emptyTodoItem);
	}
	filteredList.forEach((todo,index) => {
		const todoItem = document.createElement('li');
	    todoItem.setAttribute('data-index', index);
	    todoItem.innerHTML = 
	    `<div class="todo-item draggable" draggable="true" data-index="${index}">
	        <input type="checkbox" id="js-checkbox-${todo.id}" ${todo.isCompleted ? 'checked' : ''} value="${todo.id}" onclick="completeTodo(event)">
	        <input type="text" value="${todo.task}">
	        <button onclick="removeTodo('${todo.id}')"><img src="./images/icon-cross.svg"></button>
	    </div>`;

	    listItems.push(todoItem);

	    todoList.appendChild(todoItem);
	});
  	addEventListeners();
	updateTodoCount();
}

function updateTodoCount() {
	document.getElementById('js-todo-count').innerHTML = getTodos().filter(todo => !todo.isCompleted).length;
}