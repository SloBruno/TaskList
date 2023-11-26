const inputTask = document.querySelector('#input-task');
const addButton = document.querySelector('.add-button');
const taskBox = document.querySelector('#task-box');

let textInput;
let task; // Defina a variável task fora da função createTask

inputTask.addEventListener('input', function (e) {
    textInput = this.value;
});

addButton.addEventListener('click', function (e) {


    if (addButton.classList.contains('editar')) {
        editSave();
    } else {
        createTask(textInput);
        saveTasks();
    }
});

document.addEventListener('keypress', function (e) {


    if (e.key === 'Enter') {
        if (addButton.classList.contains('editar')) {
            editSave();
        } else {
            createTask(textInput);
            saveTasks();
        }
    }
});

function createTask(textInput) {
    if (!textInput || !textInput.trim()) {
        alert('Por favor, insira uma tarefa válida.');
        return;
    }

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    taskContainer.innerHTML = "<i class='bx bxs-circle'></i>";

    task = document.createElement('p');
    task.classList.add('task');
    task.innerText = textInput;

    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    editButton.classList.add('edit-button');
    deleteButton.innerHTML = 'Excluir';
    editButton.innerText = 'Editar';

    deleteButton.addEventListener('click', function (e) {
        deleteTask(taskContainer);
        inputTask.focus();
    });
    editButton.addEventListener('click', function (e) {
        edit(taskContainer);
        inputTask.focus();
    });

    taskContainer.appendChild(task);
    taskContainer.appendChild(deleteButton);
    taskContainer.appendChild(editButton);
    taskBox.appendChild(taskContainer);

    textInput = '';

    clean();
    inputTask.value = '';
}

function deleteTask(container) {
    container.remove();
    saveTasks();
}

function edit(container) {
    inputTask.value = task.innerText;
    changeClass(addButton, 'add-button', 'editar');
}

function editSave() {
    task.innerText = inputTask.value;
    changeClass(addButton, 'editar', 'add-button');
    clean();
    saveTasks();

    // Atualize a variável textInput após a edição
    textInput = inputTask.value;
}

function clean() {
    inputTask.value = '';
    inputTask.focus();
}

function changeClass(el, old, newer) {
    el.classList.remove(old);
    el.classList.add(newer);
}

function saveTasks() {
    const taskElements = taskBox.querySelectorAll('.task');
    const taskList = [];

    for (let task of taskElements) {
        let taskHTML = task.innerHTML;
        taskList.push(taskHTML);
    }

    const taskJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', taskJSON);
}

function addSavedTasks() {
    const savedTask = localStorage.getItem('tasks');
    const taskList = JSON.parse(savedTask);

    if (taskList) {
        for (let task of taskList) {
            createTask(task);
        }
    }
}

addSavedTasks();
