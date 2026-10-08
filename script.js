const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

addTaskButton.addEventListener("click", () => {
    const task = taskInput.value.trim();

    if (task === "") {
        return;
    }

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
});

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

renderTasks();
