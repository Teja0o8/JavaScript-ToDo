const Input = document.querySelector('.input');
const button = document.querySelector('.submitbutton')
const list = document.querySelector('.todo-list')

//Event Listener
button.addEventListener('click', addTodo);
list.addEventListener('click', deleteCheck);
document.addEventListener('DOMContentLoaded', gettodos);


function addTodo(event){
	event.preventDefault();
	
	const tododiv = document.createElement("div");
	tododiv.classList.add("todo");

	const newTodo = document.createElement('li');
	newTodo.innerText = Input.value;
	newTodo.classList.add('todo-item');
	tododiv.appendChild(newTodo);

	//Function to save todos in local storage
	savetodos(Input.value);

	//Check Completed Button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = `<i class="fas fa-check">✔️</i>`;
	completedButton.classList.add("complete-btn");
	tododiv.appendChild(completedButton);

	//Delete Button
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = `<i class="fas fa-delete">❌</i>`;
	deleteButton.classList.add("delete-btn");
	tododiv.appendChild(deleteButton);
	
	list.appendChild(tododiv);

	Input.value = "";
}

function deleteCheck(e){
	const item = e.target;

	if(item.classList[0] === "delete-btn"){
		const todo = item.parentElement;

		todo.classList.add("fall");
		todo.addEventListener('transitionend', function(){
			todo.remove();
		})
		removeTodos(todo);
	}
	if(item.classList[0] === "complete-btn"){
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}

//Saving Todos

function savetodos(todo){
	let todos;
	if(localStorage.getItem('todos') === null) {
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
} 

//Saving Todos to local storage
function gettodos(){
	let todos;

	if(localStorage.getItem('todos') === null) {
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function(todo){

	const tododiv = document.createElement("div");
	tododiv.classList.add("todo");

	const newTodo = document.createElement('li');
	newTodo.innerText = todo;
	newTodo.classList.add('todo-item');
	tododiv.appendChild(newTodo);

	//check Completed Button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = `<i class="fas fa-check">✔️</i>`;
	completedButton.classList.add("complete-btn");
	tododiv.appendChild(completedButton);

	//Delete Button
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = `<i class="fas fa-delete">❌</i>`;
	deleteButton.classList.add("delete-btn");
	tododiv.appendChild(deleteButton);
	
	list.appendChild(tododiv);

	});
}

//Removing Todos from local storage 
function removeTodos(todo){

	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex),1);
	localStorage.setItem("todos",JSON.stringify(todos));
}