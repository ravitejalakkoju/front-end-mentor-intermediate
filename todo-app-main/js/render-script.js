var todoList = 
	[
		{
			id: 1,
			task: 'Jog around park 3x',
			isCompleted: true
		},
		{
			id: 2,
			task: '10 mins meditation',
			isCompleted: false
		},
		{
			id: 3,
			task: 'Read for 1hr',
			isCompleted: false
		}
	];
var idCounter = 3;

Object.defineProperty(todoList, "push", {
    configurable: true,
    enumerable: false,
    writable: true, 
    value: function (...args)
    {
        let result = Array.prototype.push.apply(this, args); 

       filterList(); 

        return result; 
    }
});

Object.defineProperty(Array.prototype, "remove", {
    writable: true,
    value: function(...args) {
    	const indexes = args.length > 0 ? [this.findIndex(todo => todo.id == args)] : this.map((todo, index) => todo.isCompleted ? index : -1).filter(idx => idx >= 0);
        indexes.reverse().forEach(idx => {
        	this.splice(idx, 1);
        });
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
	filteredList.forEach(todo => {
		const todoItem = 
		`<div class="todo-item">
	        <input type="checkbox" id="js-checkbox-${todo.id}" ${todo.isCompleted ? 'checked' : ''} value="${todo.id}" onclick="completeTodo(event)">
	        <input type="text" value="${todo.task}">
	        <button onclick="removeTodo(${todo.id})"><img src="./images/icon-cross.svg"></button>
	    </div>`;
		todoList.insertAdjacentHTML('beforeend', todoItem);
	});
	updateTodoCount();
}

function updateTodoCount() {
	document.getElementById('js-todo-count').innerHTML = getTodos().filter(todo => !todo.isCompleted).length;
}