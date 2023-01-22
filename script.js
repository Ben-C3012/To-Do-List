

// Get Elements 
const input = document.querySelector('#input')
const button = document.querySelector('#button')
const list = document.querySelector('.list')
const filterSelect = document.querySelector('#select-todo')

// Event Listeners 
button.addEventListener('submit', (e)=>{
    e.preventDefault();
    window.history.back();
})
button.addEventListener('click', addTask)
list.addEventListener('click', removeTask)
list.addEventListener('click', checkTask)
filterSelect.addEventListener('click', filterTodo)
document.addEventListener('DOMContentLoaded', getTasks)

// Add Task Function
function addTask(e) {
  
// Prevent empty Task
if(input.value === '' || input.value === ' ') {
    alert('Enter a Task')
    return
}

// Create div
let taskContainer = document.createElement('div')

// Add Class to div
taskContainer.classList.add('task-container')

// Append div to ul 
list.appendChild(taskContainer)

// Create Text Node 
let txt = document.createTextNode(input.value)



// Create li 
let li = document.createElement('li')

// Append txt to li 
li.append(txt)

// Append li to div 
taskContainer.appendChild(li)

// Add Task to Local Storage
saveLocalTasks(input.value)

// Create  Icons 
let checkIcon = document.createElement('i')
let trashIcon = document.createElement('i')

// Add class
trashIcon.className = 'fa-solid fa-trash'
checkIcon.className = 'fa-solid fa-check'


// Append icons to task container 
taskContainer.appendChild(checkIcon)
taskContainer.appendChild(trashIcon)

// Clear input 
input.value = ' '


}


// Remove Task Function 
function removeTask(e) {
    let icon = e.target

   if(icon.className === 'fa-solid fa-trash') {
       const todoBox = icon.parentElement
       todoBox.classList.add('fall')
       removeLocalTasks(todoBox)
       todoBox.addEventListener('transitionend',function(){
           todoBox.remove()
       })

    }
    
   }


// // Check task Function 
function checkTask(e) {
    
    if(e.target.className === 'fa-solid fa-check') {
        const todoContainer = e.target.parentElement
        todoContainer.classList.toggle('check-animation')
        
        
    }
}


function filterTodo(e) {
     let taskContainers = document.querySelectorAll('.task-container')


   taskContainers.forEach(container => {
       switch(e.target.value) {
         case 'all':
               container.style.display = 'flex'
               break;
         case 'completed':
                   if(container.classList.contains('check-animation')) {
                       container.style.display = 'flex'
                   } else {
                    container.style.display = 'none'
                   } break

        case 'uncompleted': 
        if(container.classList.contains('check-animation')) {
            container.style.display = 'none'
        } else {
         container.style.display = 'flex'
        } break
              
                
       }
   })



}

function saveLocalTasks(todo) {
    // Check if the local storage is empty
    let tasks
    if(localStorage.getItem('tasks') === null ) {
       tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(todo)
    localStorage.setItem('tasks', JSON.stringify(tasks) )
} 

function getTasks() {
    let tasks
    if(localStorage.getItem('tasks') === null ) {
       tasks = []
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }
     tasks.forEach(task =>{
         // Create div
let taskContainer = document.createElement('div')

// Add Class to div
taskContainer.classList.add('task-container')

// Append div to ul 
list.appendChild(taskContainer)

// Create Text Node 
let txt = document.createTextNode(task)

// Create li 
let li = document.createElement('li')

// Append txt to li 
li.append(txt)

// Append li to div 
taskContainer.appendChild(li)

// Create  Icons 
let checkIcon = document.createElement('i')
let trashIcon = document.createElement('i')

// Add class
trashIcon.className = 'fa-solid fa-trash'
checkIcon.className = 'fa-solid fa-check'

// Append icons to task container 
taskContainer.appendChild(checkIcon)
taskContainer.appendChild(trashIcon)

     })
}

function removeLocalTasks(task) {
   // Check if the local storage is empty
   let tasks
   if(localStorage.getItem('tasks') === null ) {
      tasks = []
   } else {
       tasks = JSON.parse(localStorage.getItem('tasks'))
   }
    console.log(task.children[0].innerText);
    const taskIndex = task.children[0].innerText
    tasks.splice(tasks.indexOf(taskIndex) , 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    
}

