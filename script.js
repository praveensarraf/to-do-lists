const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addButton = document.getElementById('btn');

function addTask() {
    if (inputBox.value.trim() === '') {
        alert('Please enter a task!');
    } else {
        const li = document.createElement('li');
        li.textContent = inputBox.value.trim();

        const spanForEdit = document.createElement('span');
        spanForEdit.classList.add('edit');
        spanForEdit.innerHTML = '&#9998;';
        li.appendChild(spanForEdit);

        const tooltipForEdit = document.createElement('div');
        tooltipForEdit.classList.add('tooltip', 'edit-tooltip');
        tooltipForEdit.innerHTML = 'Edit';
        li.appendChild(tooltipForEdit);

        const spanForDelete = document.createElement('span');
        spanForDelete.innerHTML = '&times;';
        spanForDelete.classList.add('remove');
        li.appendChild(spanForDelete);

        const tooltipForDelete = document.createElement('div');
        tooltipForDelete.classList.add('tooltip', 'remove-tooltip');
        tooltipForDelete.innerHTML = 'Delete';
        li.appendChild(tooltipForDelete);

        listContainer.appendChild(li);
    }

    inputBox.value = '';
    saveData();
}

addButton.addEventListener('click', addTask);

listContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.classList.contains("edit")) {
        let newTask = prompt('Edit your task:', e.target.parentElement.firstChild.textContent);
        if (newTask !== null && newTask.trim() !== '') {
            e.target.parentElement.firstChild.textContent = newTask;
            saveData();
        }
    } else if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("toDoTaskData", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("toDoTaskData") || '';
}

showTask();

inputBox.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});
