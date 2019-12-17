const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const taskInput = document.querySelector("#task");
const filterInput = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");

loadEventListeners();

function loadEventListeners(){
    // Add a task event.
    form.addEventListener('submit', addTask);
    // Remove task.
    taskList.addEventListener('click', removeTask);
    // Clear all tasks.
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks.
    filterInput.addEventListener('keyup', filterTasks)
}

function addTask(event){
    event.preventDefault();

    var input = taskInput.value;
    if (input === '') {
        alert('Task field cannot be empty!');
        return;
    }

    // Create a li element to add to the ul.
    const li = document.createElement('li');
    // Add a class name to the li element.
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(input));

    // Create a new anchor element.
    const link = document.createElement('a');
    // Add a class name to the element.
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="far fa-times-circle fa-2x"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
    taskInput.value = null;
}

function removeTask(event){
    function checkElement(name){
        return event.target.parentElement.classList.contains(name);
    }
    if (checkElement('delete-item')) {
        console.log(event.target.parentElement.classList);
        if(confirm('Confirm deleting task?')){
            event.target.parentElement.parentElement.remove();
        }
    }
}

function clearTasks(){
    if(confirm('Remove all tasks?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
    }
}

function filterTasks(event){
    const userFilter = event.target.value.toLowerCase();

    // Go through li items.
    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
        // Check if item exists.
        if (item.toLocaleLowerCase().indexOf(userFilter) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    });
}