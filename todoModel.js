let tasks = [
    {
        id: 1,
        name: "Go to work ;P",
        complete: false,
        category: "Work",
    },
    {
        id: 2,
        name: "Get good grades",
        complete: false,
        category: "School",
    },
    {
        id: 3,
        name: "Talk to Doctor",
        complete: false,
        category: "Health"
    },
    {
        id: 4,
        name: "Buy more batteries",
        complete: false,
        category: "Other",
    },
];
// let todos = ['Buy milk', 'Walk the dog']; 

const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');


function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        // deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener('click', () => {
    const newTask = newTaskInput.value.trim();
    if (newTask !== '') {
        tasks.push({ id: tasks.length + 1, name: newTask, complete: false, category: "Other" });
        newTaskInput.value = '';
        renderTasks();
        console.log(renderTasks())
    }
});

// Initial rendering
renderTasks();