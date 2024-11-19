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
    {
        id: 5,
        name: "Play with dog",
        complete: true,
        category: "Other",
    },
];
// let todos = ['Buy milk', 'Walk the dog']; 

const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const completedTaskList = document.getElementById('completedTaskList');
const sortCategory = document.getElementById('sortCategory');

sortCategory.addEventListener('change', renderTasks);


function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks
    completedTaskList.innerHTML = ''; // Clear existing completed tasks

    const selectedCategory = sortCategory.value;
    let uncompletedTasks = tasks.filter(task => {
        return !task.complete && (selectedCategory === 'allCategory' || task.category === selectedCategory);
    });
    uncompletedTasks.sort((a, b) => a.name.localeCompare(b.name));

    // tasks.forEach(task => {
    uncompletedTasks.forEach(task => {
        const li = document.createElement('li');

        // Toggle checkbox for complete status
        const toggleCheckbox = document.createElement('input');
        toggleCheckbox.type = 'checkbox';
        toggleCheckbox.checked = task.complete;
        toggleCheckbox.addEventListener('change', () => {
            task.complete = toggleCheckbox.checked; // Update the complete status
            renderTasks(); // Re-render after status change
        });     

        // #### EDIT IN LINE WITH SPAN ####
        const taskName = document.createElement('span');
        taskName.textContent = task.name;
        // Line-through if complete
        if (task.complete) {
            taskName.style.textDecoration = 'line-through'; 
        }

        // Container for task text and checkbox
        const taskTextContainer = document.createElement('div');
        taskTextContainer.classList.add('task-text'); 
        taskTextContainer.appendChild(toggleCheckbox);
        taskTextContainer.appendChild(taskName);

        // Edit
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn')
        editBtn.addEventListener('click', () => {
            // Change name to an input feild for edits
            const inputField = document.createElement('input');
            inputField.value = task.name;
            li.insertBefore(inputField, taskName); // Change input field before the task name
            li.removeChild(taskName); // Remove the current task name

            // Save button
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.classList.add('save-btn')
            saveBtn.addEventListener('click', () => {
                const newName = inputField.value.trim();
                if (newName !== '') {
                    task.name = newName;
                    renderTasks(); // Re-render the tasks list with the updated name
                }
            });

            li.appendChild(saveBtn); // Save button to the task item
        });
        // #### EDIT WITH PROMPT ####
        // const li = document.createElement('li');
        // li.textContent = task.name;

        // // Edit
        // const editBtn = document.createElement('button');
        // editBtn.textContent = 'Edit';
        // editBtn.addEventListener('click', () => {
        //     const newName = prompt("Edit task name:", task.name);
        //     if (newName !== null && newName.trim() !== '') {
        //         task.name = newName.trim();
        //         renderTasks(); //Re-render updates
        //     }
        // })


        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        // deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            renderTasks(); //Re-render updates
        });

        li.appendChild(toggleCheckbox)
        li.appendChild(taskName);
        li.appendChild(editBtn); 
        li.appendChild(deleteBtn);

        // append to the appropriate list if complete or uncompleted
        // if (task.complete) {
        //     completedTaskList.appendChild(li); 
        // } else {
        //     taskList.appendChild(li); 
        // }
        taskList.appendChild(li);
        
    });
    // ############ BASICALLY A COPY PASTE FROM ABOVE TO MAKE THE 
    // ############ UNCOMPLETE WORK SEPERATELY FROM THE COMPLETE
    // ############ SECTION, YET STILL BE ABLE TO INTERACT WITH EACH OTHER. 
    // ############ TOOK WAY TO LONG BUT WORK IT. 
    const completedTasks = tasks.filter(task => task.complete);

    completedTasks.forEach(task => {
        const li = document.createElement('li');

        const toggleCheckbox = document.createElement('input');
        toggleCheckbox.type = 'checkbox';
        toggleCheckbox.checked = task.complete;
        toggleCheckbox.addEventListener('change', () => {
            task.complete = toggleCheckbox.checked; 
            renderTasks(); 
        });

        const taskName = document.createElement('span');
        taskName.textContent = task.name;
        taskName.style.textDecoration = 'line-through'; 

        const taskTextContainer = document.createElement('div');
        taskTextContainer.classList.add('task-text');
        taskTextContainer.appendChild(toggleCheckbox);
        taskTextContainer.appendChild(taskName);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            const inputField = document.createElement('input');
            inputField.value = task.name;
            li.insertBefore(inputField, taskName);
            li.removeChild(taskName);

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.classList.add('save-btn');
            saveBtn.addEventListener('click', () => {
                const newName = inputField.value.trim();
                if (newName !== '') {
                    task.name = newName;
                    renderTasks(); 
                }
            });

            li.appendChild(saveBtn);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            renderTasks(); 
        });

        li.appendChild(toggleCheckbox);
        li.appendChild(taskName);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        completedTaskList.appendChild(li);
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
// enter key works here
newTaskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const newTask = newTaskInput.value.trim();
        if (newTask !== '') {
            tasks.push({ id: tasks.length + 1, name: newTask, complete: false, category: "Other" });
            newTaskInput.value = ''; // Clear the input field
            renderTasks();
        }
    }
});

// Initial rendering
renderTasks();