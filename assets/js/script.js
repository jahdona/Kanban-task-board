
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
function createTaskCard() {
   
    tasks.innerHTML='';
    data.map((x,y)=>{
        const now = dayjs();
    const taskDueDate = dayjs(x.dateInput, 'DD/MM/YYYY');
        if(now.isSame(taskDueDate, 'day'))
        {
            
        return(tasks.innerHTML +=`

        <div id=${y} style='background-color:yellow;' class='draggable'>
                         <span class="fw-bold">Task Title :  ${x.tName}</span>
                     <hr>
                         <p>Task Status : ${x.textarea} </p> 
                         <span class="">Due Date    : ${x.dateInput}</span>
                         <br>
                         <center><button onClick="deleteTask(this)"  class="btn btn-danger" style=' width:100px; '>Delete</button></center>
                     <br>
                </div>
        `);}
        else if(now.isAfter(taskDueDate)){
            
            return(tasks.innerHTML +=`

        <div id=${y} style='background-color:red;color:white' class='draggable'>
                    <span class="fw-bold">Task Title :  ${x.tName}</span>
                    <hr>
                    <p>Task Status : ${x.textarea} </p> 
                    <span class="">Due Date    : ${x.dateInput}</span><br>
                    <center><button onClick="deleteTask(this)"  class="btn btn-danger" 
                    style=' width:100px; border:2px solid white'>Delete</button></center>
                     <br>
                </div>
        `);

        }
        else{
            
            return(tasks.innerHTML +=`

        <div id=${y} class='draggable'>
                    <span class="fw-bold">Task Title :  ${x.tName}</span>
                    <hr>
                    <p>Task Status : ${x.textarea} </p> 
                    <span class="">Due Date    : ${x.dateInput}</span><br>
                    <center><button onClick="deleteTask(this)"  class="btn btn-danger" 
                    style=' width:100px;'>Delete</button></center>
                     <br>
                </div>
        `);
        }

    })


}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(){

    const taskInput=textInput.value;
    const dateI=dateInput.value;
    const status=textarea.value.toLowerCase();
    if(taskInput===''||dateI===''){
    
   
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

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    

event.parentElement.parentElement.remove();
    data.splice(event.parentElement.parentElement.id,1);
    localStorage.setItem('formData',JSON.stringify(data));
}
function readProjectsFromStorage() {
    // ? Retrieve projects from localStorage and parse the JSON to an array.
    // ? We use `let` here because there is a chance that there are no projects in localStorage (which means the projects variable will be equal to `null`) and we will need it to be initialized to an empty array.
    let projects = JSON.parse(localStorage.getItem('projects'));
  
    // ? If no projects were retrieved from localStorage, assign projects to a new empty array to push to later.
    if (!projects) {
      projects = [];
    }
  
    // ? Return the projects array either empty or with data in it whichever it was determined to be by the logic right above.
    return projects;
  }
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const projects = readProjectsFromStorage();

  // ? Get the project id from the event
  const taskId = ui.draggable[0].dataset.projectId;

  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let project of projects) {
    // ? Find the project card by the `id` and update the project status.
    if (project.id === taskId) {
      project.status = newStatus;
    }
  }
  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem('projects', JSON.stringify(projects));
  printProjectData();
}




// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#dateInput').datepicker({
        changeMonth: true,
        changeYear: true,
      });
      
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
      });

});



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    handleAddTask();
    
})

let data= [];
 function acceptData(){
    data.push({
        tName:textInput.value,
        dateInput:dateInput.value,
        textarea:textarea.value
    });
    localStorage.setItem('formData',JSON.stringify(data));
    console.log(data)
    createTaskCard();
    

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
    createTaskCard();
 })();


 $(function () {
    $('#dateInput').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });

  