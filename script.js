// Select Elements

let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let message = document.getElementById("message");
let stats = document.getElementById("stats");
let cursor = document.getElementById("cursor");

// Store tasks

let tasks = [];

// Custom Cursor

document.addEventListener("mousemove", function(event){

    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

});

// Add Task

addBtn.addEventListener("click", addTask);

function addTask(){

    let taskText = input.value.trim();

    if(taskText===""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text:taskText,

        completed:false

    });

    input.value="";

    input.focus();

    showMessage();

    renderTasks();

}

// Render Tasks

function renderTasks(){

    taskList.innerHTML="";

    tasks.forEach(function(task,index){

        let li=document.createElement("li");

        let span=document.createElement("span");

        span.textContent=task.text;

        if(task.completed){

            span.classList.add("done");

        }

        // Complete Task

        span.addEventListener("click",function(){

            task.completed=!task.completed;

            renderTasks();

        });

        // Delete Button

        let deleteBtn=document.createElement("button");

        deleteBtn.textContent="Delete";

        deleteBtn.classList.add("deleteBtn");

        deleteBtn.addEventListener("click",function(){

            tasks.splice(index,1);

            renderTasks();

        });

        // Double Click Animation

        li.addEventListener("dblclick",function(){

            li.classList.add("pop");

            setTimeout(function(){

                tasks.splice(index,1);

                renderTasks();

            },300);

        });

        li.appendChild(span);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    // map()
    let taskNames = tasks.map(function(task){
        return task.text;
    });

    document.getElementById("taskCount").textContent =
    "Tasks: " + taskNames.join(", ");

    // reduce()
    let totalCharacters = tasks.reduce(function(total, task){
        return total + task.text.length;
    }, 0);

    document.getElementById("charCount").textContent =
    "Total Characters: " + totalCharacters;


    updateStats();

}

// Update Stats

function updateStats(){

    let completed = tasks.filter(function(task){

        return task.completed;

    }).length;

    stats.textContent = `${completed} of ${tasks.length} tasks completed`;

}

// Temporary Message

function showMessage(){

    message.textContent="Task Added!";

    setTimeout(function(){

        message.textContent="";

    },2000);

}

