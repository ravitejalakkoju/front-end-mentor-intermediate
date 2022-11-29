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

       filter(); 

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
        filter(); 
    }
});

function getTodos() {
	return todoList;
}

function getFilteredTodos(isCompleted) {
	return getTodos().filter(isCompleted != null ? todo => todo.isCompleted == isCompleted : todo => true);
}

function loadTodos(isCompleted = null) {
	const todoList = document.getElementById('js-todo-list');
	todoList.innerHTML = '';
	getFilteredTodos(isCompleted).forEach(todo => {
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
	document.getElementById('js-todo-count').innerHTML = getFilteredTodos(false).length;
}