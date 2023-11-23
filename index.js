const inputTask = document.querySelector('#input-task');
const addButton = document.querySelector('#add-button');
const container = document.querySelector('#container');
const taskBox = document.querySelector('#task-box')
let textInput;

inputTask.addEventListener('input', function(e){
    textInput = this.value;
})

addButton.addEventListener('click', function(e){
    
    createTask(textInput);
})

document.addEventListener('keypress', function(e){
    if (e.key == 'Enter'){
        createTask(textInput);
    }
})

function createTask(textInput){
    const task = document.createElement('li');
    task.classList.add('task');
    task.innerText = textInput;
    taskBox.appendChild(task);  

}

