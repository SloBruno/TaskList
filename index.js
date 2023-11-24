const inputTask = document.querySelector('#input-task');
const addButton = document.querySelector('.add-button');
const taskBox = document.querySelector('#task-box');

let textInput;
let task; // Defina a variável task fora da função createTask

inputTask.addEventListener('input', function(e) {
    textInput = this.value;
});

addButton.addEventListener('click', function(e) {
    if (addButton.classList.contains('editar')) {
        editSave();
    } else {
        createTask(textInput);
    }
});

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        createTask(textInput);
    }
});

function createTask(textInput) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    task = document.createElement('p');
    task.classList.add('task');
    task.innerText = textInput;

    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    editButton.classList.add('edit-button');
    deleteButton.innerText = 'Excluir';
    editButton.innerText = 'Editar';

    deleteButton.addEventListener('click', function(e) {
        deleteTask(taskContainer);
    });
    editButton.addEventListener('click', function(e) {
        edit(taskContainer);
    });

    taskContainer.appendChild(task);
    taskContainer.appendChild(deleteButton);
    taskContainer.appendChild(editButton);
    taskBox.appendChild(taskContainer);

    clean();
}

function deleteTask(container) {
    container.remove();
}

function edit(container) {
    inputTask.value = task.innerText;
    addButton.innerText = 'Editar';
    changeClass(addButton, 'add-button', 'editar');
}

function editSave() {
    task.innerText = inputTask.value;
    addButton.innerText = 'Adicionar';
    changeClass(addButton, 'editar', 'add-button');
}

function clean() {
    inputTask.value = '';
    inputTask.focus();
}

function changeClass(el, old, newer) {
    el.classList.remove(old);
    el.classList.add(newer);
    el.innerText = newer;
}
