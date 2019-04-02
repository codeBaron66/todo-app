const form      = document.querySelector('#task-form'),
      taskList  = document.querySelector('.collection'),
      doneList  = document.querySelector('.doneCollection'),
      moveBtn   = document.querySelector('.move-tasks'),
      clearBtn  = document.querySelector('.clear-tasks'),
      finished  = document.querySelector('.clear-done'),
      label     = document.querySelector('#label'),
      doneDiv   = document.querySelector('.finished-div');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let doneTasks = JSON.parse(localStorage.getItem('done')) || [];

form.addEventListener('submit', addTask);
taskList.addEventListener('click', toggleDone);
taskList.addEventListener('click', removeTask);
moveBtn.addEventListener('click', moveTask);
clearBtn.addEventListener('click', clearTasks);
finished.addEventListener('click', clearDone);

populateList(tasks, taskList);
populateDoneList(doneTasks, doneList);
buttons();
finishedList();

function addTask(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=task]')).value;
  const task = {
    text,
    done: false
  };
  tasks.push(task);
  populateList(tasks, taskList);
  buttons();
  localStorage.setItem('tasks', JSON.stringify(tasks));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    if(plate.done === true) {
      return `
        <li data-index=${i} class="list-group-item d-flex justify-content-between align-items-center" data-index=${i} id="item${i}">
          <div class="col-9">
            <label for="item${i}" class="label1 strike-through">${plate.text}</label>
          </div>
          <div class="col">
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          </div>
          <div class="col">
            <a><i class="fas fa-trash-alt"></i></a>
          </div>
        </li>
      `;
      } else {
        return `
          <li data-index=${i} class="list-group-item d-flex justify-content-between align-items-center" data-index=${i} id="item${i}">
            <div class="col-9">
              <label for="item${i}"  class="label1">${plate.text}</label>
            </div>
            <div class="col">
              <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            </div>
            <div class="col">
              <a><i class="fas fa-trash-alt"></i></a>
            </div>
          </li>
        `;
      }
  }).join('');
  buttons();
}

function populateDoneList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
    <div id="doneTasks">
      <li>
        ${plate.text}
      </li>
    </div>
    `;
  }).join('');
  buttons();
}

function toggleDone(e) {
  if (!e.target.matches('input')) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  tasks[index].done = !tasks[index].done;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  populateList(tasks, taskList);
}

function removeTask(e) {
  if(e.target.classList.contains('fa-trash-alt')){
    if(confirm('Are you sure?')) {
      const index = e.target.parentElement.parentElement.parentElement.dataset.index;
      if (index > -1) {
        tasks.splice(index, 1);
     }
      localStorage.setItem('tasks', JSON.stringify(tasks));
      populateList(tasks, taskList);
    }
  }
  buttons();
  finishedList();
}

function moveTask() {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    if (task.done === true) {
      doneTasks.push(task);
      tasks.splice(i, 1);
      i--;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('done', JSON.stringify(doneTasks));
  populateList(tasks, taskList);
  populateDoneList(doneTasks, doneList);
  buttons();
  finishedList();
}

function clearTasks(e) {
  tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
  populateList(tasks, taskList);
}

function clearDone(){
  doneTasks = [];
  localStorage.setItem('done', JSON.stringify(doneTasks));
  populateDoneList(doneTasks, doneList);
  finishedList();
}

function buttons() {
  if(tasks.length < 1) {
    clearBtn.style.display = 'none';
    label.style.display = 'none';
    moveBtn.style.display = 'none';
  } else {
    clearBtn.style.display = 'inline-block';
    label.style.display = 'block';
    moveBtn.style.display = 'block';
  }
}

function finishedList(){
  if(doneTasks.length < 1) {
    doneDiv.style.display = 'none';
  } else {
    doneDiv.style.display = 'block';
  }
}

// VERSION 1 VERSION 1 VERSION 1 VERSION 1 VERSION 1 VERSION 1 VERSION 1 VERSION 1 
// loadEventListeners();

// function loadEventListeners() {
//   document.addEventListener('DOMContentLoaded', getTasks);
//   form.addEventListener('submit', addTask);
//   taskList.addEventListener('click', removeTask);
//   taskList.addEventListener('click', strikeThrough);
//   clearBtn.addEventListener('click', clearTasks);
// }


// let items = [];
// function strikeThrough(e){
//   if (e.target.classList.contains('list-group-item')) {
//     let clicked;
//     if(e.target.classList.contains('strike-through')) {
//       e.target.classList.remove('strike-through');
//       clicked = {
//         title: e.target.innerText,
//         index: e.target,
//         clicked: "no"
//       }
//       console.log(e);
//       let temp = JSON.parse(localStorage.getItem('tasks'));
//       console.log(temp)
//       // console.log(e.target.innerText);
//       storeTaskToLocalStorage(JSON.stringify(clicked));
//     } else {
//       e.target.classList.add('strike-through');
//       clicked = {
//         title: e.target.innerHTML,
//         clicked: "yes"
//       }
//     }
//     items.push(clicked);
//     // console.log(clicked);
//   }
// }

// function getTasks() {
//   let tasks;
//   if(localStorage.getItem('tasks') === null){
//     tasks = [];
//     clearBtn.style.display = 'none';
//     label.style.display = 'none';
//   } else {
//     tasks = JSON.parse(localStorage.getItem('tasks'));
//   }
  
//   tasks.forEach(function(task){
//     const li = document.createElement('li');
//     li.className = 'list-group-item d-flex justify-content-between align-items-center';
//     li.appendChild(document.createTextNode(task));
//     const link = document.createElement('a');
//     link.innerHTML = '<i class="fas fa-trash-alt"></i>';
//     li.appendChild(link);
//     taskList.appendChild(li);
//     clearBtn.style.display = 'inline-block';
//     label.style.display = 'block';
//   });
  
// }

// function addTask(e) {
//   if(taskInput.value === ''){
//     alert('Add a Task!');
//   }
//   const li = document.createElement('li');
//   li.className = 'list-group-item d-flex justify-content-between align-items-center';
//   li.appendChild(document.createTextNode(taskInput.value));
//   const link = document.createElement('a');
//   link.innerHTML = '<i class="fas fa-trash-alt"></i>';
//   li.appendChild(link);
//   taskList.appendChild(li);
//   let StObject = {
//     title: taskInput.value,
//     index: Math.floor((Math.random() * 5000) + 1),
//     clicked: 'no'
//   }
//   storeTaskToLocalStorage(StObject);
//   taskInput.value = '';
//   clearBtn.style.display = 'inline-block';
//   label.style.display = 'block';
//   e.preventDefault();
// }


// function storeTaskToLocalStorage(task) {
//   let tasks;
//   if(localStorage.getItem('tasks') === null){
//     tasks = [];
//   } else {
//     tasks = JSON.parse(localStorage.getItem('tasks'));
//   }
//   tasks.push(task);
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function removeTask(e) {
//   if(e.target.classList.contains('fa-trash-alt')){
//     if(confirm('Are you sure?')) {
//       e.target.parentElement.parentElement.remove();
//       removeTaskFromLocalStorage(e.target.parentElement.parentElement);
//     }
//   }
// }

// function removeTaskFromLocalStorage(taskItem) {
//   let tasks;
//   if(localStorage.getItem('tasks') === null){
//     tasks = [];
//   } else {
//     tasks = JSON.parse(localStorage.getItem('tasks'));
//   }

//   tasks.forEach(function(task, index){
//     if(taskItem.textContent === task){
//       tasks.splice(index, 1);
//     }
//   });

//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function clearTasks(e) {
//   while(taskList.firstChild) {
//     taskList.removeChild(taskList.firstChild);
//   }
//   clearTasksFromLocalStorage();
// }

// function clearTasksFromLocalStorage() {
//   localStorage.clear();
//   clearBtn.style.display = 'none';
//   label.style.display = 'none';
// }