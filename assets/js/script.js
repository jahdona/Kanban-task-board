
let form=document.getElementById('formModal');
let buton=document.getElementById('but');
let textInput=document.getElementById('texInput');
let dateInput=document.getElementById('dateInput');
let textarea=document.getElementById('textArea');
const mes=document.getElementById('msg');
let tasks=document.getElementById('todo-cards');
let close=document.getElementById('close');
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    tasks.innerHTML +=`

    <div>
                <span class="fw-bold">${data.tName}</span>
                <span class="small text-secondary">${data.dateInput}</span>
                <p>${data.textarea} </p> 
                <span class="option">
                     <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#formModal" class="fa-solid fa-pen-to-square"></i>
                     <i onClick="handleDeleteTask(this)" class="fa-solid fa-trash"></i>
                 </span>
            </div>
    `;


}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

    

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

event.parentElement.parentElement.remove();
    data.splice(event.parentElement.parentElement.id,1);
    localStorage.setItem('formData',JSON.stringify(data));
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
   formValidation();
    
})

let formValidation=()=>{
    const taskInput=textInput.value;
    const dateI=dateInput.value;
    if(taskInput===''||dateI==='')
{
    
   
   mes.innerHTML='Task title or task date should not be empty';
}
else{
    
    mes.innerHTML='';
    acceptData();
    buton.setAttribute('data-bs-dismiss', 'modal');
    buton.click();
    resetForm();
    
//IIFE
    (()=>{
        buton.setAttribute('data-bs-dismiss', '');
    })()
   
}

}
let data= [];
 function acceptData(){
    data.push({
        tName:textInput.value,
        dateInput:dateInput.value,
        textarea:textarea.value
    });
    localStorage.setItem('formData',JSON.stringify(data));
    console.log(data)
    createTask();
    

 }
 tasks.innerHTML='';
 let createTask=()=>{
    data.map((x,y)=>{
        return(tasks.innerHTML +=`

        <div id=${y}>
                    <span class="fw-bold">${x.tName}</span>
                    <span class="small text-secondary">${x.dateInput}</span>
                    <p>${x.textarea} </p> 
                    <span class="option">
                         <i onClick="editTask(this)" data-bs-toggle="modal" 
                         data-bs-target="#formModal" class="fa-solid fa-pen-to-square"></i>
                         <i onClick="deleteTask(this)" class="fa-solid fa-trash"></i>
                     </span>
                </div>
        `);

    })
    

 }
 let deleteTask=(e)=>{
    
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem('formData',JSON.stringify(data));

 }
 let editTask=(e)=>{
   let selectedTask=e.parentElement.parentElement;
   textInput.value=selectedTask.children[0].innerHTML;
    dateInput.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;
   selectedTask.remove();
 }
 function resetForm(){
    textInput.value='';
    dateInput.value='';
    textarea.value='';

 }
 let clearMessage=()=>{

    mes.textContent='';
 }
 close.addEventListener('click',clearMessage);
 (()=>{
    data=JSON.parse(localStorage.getItem('formData'));
    createTask();
 })();