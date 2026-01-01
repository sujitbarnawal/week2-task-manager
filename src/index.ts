type Task = {
    id: number;
    name: string;
    completed: boolean;
};

let tasks: Task[] = [];

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;


const loadTasks = (): Task[] => {
    const saved = localStorage.getItem("TASKS");
    return saved ? JSON.parse(saved) : [];
};


const saveTasks = (tasks: Task[]) => {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
};


const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button class="remove-btn">Remove</button>
            </div>
        `;

        li.addEventListener("click", (e) => {
            if ((e.target as HTMLElement).classList.contains("remove-btn")) return;
            toggleTask(task.id);
        });

        li.querySelector(".remove-btn")?.addEventListener("click", () => removeTask(task.id));

        taskList.appendChild(li);
    });
};


const addTask = async (title: string): Promise<void> => {
    try {
        if (!title.trim()) throw new Error("Please add task name");
        const newTask: Task = {
            id: Date.now(),
            name: title,
            completed: false,
        };
        tasks.push(newTask);
        saveTasks(tasks);
        renderTasks();
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert("Error occurred");
        }
    }
    taskInput.value = "";
};

const toggleTask = (id: number): void => {
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(tasks);
    renderTasks();
};


const removeTask = (id: number): void => {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks(tasks);
    renderTasks();
};


addTaskBtn.addEventListener("click", () => {
    addTask(taskInput.value);
});

tasks = loadTasks();
renderTasks();
