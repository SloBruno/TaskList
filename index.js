const inputTask = document.querySelector('#input-task');
const addButton = document.querySelector('.add-button');
const taskBox = document.querySelector('#task-box');


let textInput;
let task; 

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

    textInput = '';
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

    textInput = '';
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
    hour = document.createElement('p');
    hour.classList.add('date');
    task.classList.add('task');
    task.innerText = textInput;
    const currentDate = createDate();
    const currentTime = criardata();
    hour.innerText = currentDate + "  " + currentTime;



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
    taskContainer.appendChild(hour);
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

function createDate(){
    const date = new Date();
    dia  = date.getDate().toString(),
    diaF = (dia.length == 1) ? '0'+dia : dia,
    mes  = (date.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = (mes.length == 1) ? '0'+mes : mes,
    anoF = date.getFullYear();

    return diaF+"/"+mesF+"/"+anoF;
    }

function criardata(){
    const data = new Date();
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC'
    });
}

addSavedTasks();

console.log(createDate(), criardata());
