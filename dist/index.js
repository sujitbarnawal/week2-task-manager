"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let tasks = [];
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const loadTasks = () => {
    const saved = localStorage.getItem("TASKS");
    return saved ? JSON.parse(saved) : [];
};
const saveTasks = (tasks) => {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
};
const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        var _a;
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button class="remove-btn">Remove</button>
            </div>
        `;
        li.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove-btn"))
                return;
            toggleTask(task.id);
        });
        (_a = li.querySelector(".remove-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => removeTask(task.id));
        taskList.appendChild(li);
    });
};
const addTask = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!title.trim())
            throw new Error("Please add task name");
        const newTask = {
            id: Date.now(),
            name: title,
            completed: false,
        };
        tasks.push(newTask);
        saveTasks(tasks);
        renderTasks();
    }
    catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
        else {
            alert("Error occurred");
        }
    }
    taskInput.value = "";
});
const toggleTask = (id) => {
    tasks = tasks.map((task) => task.id === id ? Object.assign(Object.assign({}, task), { completed: !task.completed }) : task);
    saveTasks(tasks);
    renderTasks();
};
const removeTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks(tasks);
    renderTasks();
};
addTaskBtn.addEventListener("click", () => {
    addTask(taskInput.value);
});
tasks = loadTasks();
renderTasks();
