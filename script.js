// Henter HTML-elementer
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const quantityInput = document.getElementById("quantity-input");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Opreter ny opgave
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value;
  const quantity = quantityInput.value || "N/A";
  const taskId = Date.now(); // Laver unikt id for hver opgave.

  const task = {
    id: taskId,
    text: taskText,
    quantity: quantity,
    done: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  // Ryd felterne
  taskInput.value = "";
  quantityInput.value = "";
});

// Gem opgaver i localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Vis opgaver i UI
function renderTasks() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    // Opret en span til opgave teksten
    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = task.text;

    // Hvis antal er større end 2, vis antal i span'en
    if (task.quantity > 2) {
      taskTextSpan.textContent += ` (${task.quantity})`;
    }

    li.appendChild(taskTextSpan); // Tilføj span til li-elementet
    li.setAttribute("data-id", task.id);

    const doneButton = document.createElement("button");
    doneButton.textContent = task.done ? "Fortryd" : "Færdig";
    doneButton.addEventListener("click", toggleTaskStatus);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Slet";
    deleteButton.addEventListener("click", deleteTask);

    li.appendChild(doneButton);
    li.appendChild(deleteButton);

    if (task.done) {
      doneList.appendChild(li);
      li.classList.add("done");
    } else {
      todoList.appendChild(li);
    }
  });
}

// Skift status af opgave (færdig/ikke færdig)
function toggleTaskStatus(e) {
  const taskId = e.target.parentElement.getAttribute("data-id");
  tasks = tasks.map((task) => {
    if (task.id == taskId) {
      task.done = !task.done;
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

// Slet en opgave
function deleteTask(e) {
  const taskId = e.target.parentElement.getAttribute("data-id");
  tasks = tasks.filter((task) => task.id != taskId);

  saveTasks();
  renderTasks();
}

// Hent opgaver fra localStorage ved sideindlæsning
window.onload = function () {
  renderTasks();
};
