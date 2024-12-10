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


const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const completedTaskList = document.getElementById('completedTaskList');
const sortCategory = document.getElementById('sortCategory');

sortCategory.addEventListener('change', renderTasks);

// const response = await fetch('http://localhost:3000/api/todos', { ... });


// function renderTasks() {
async function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks
    completedTaskList.innerHTML = ''; // Clear existing completed tasks

    const selectedCategory = sortCategory.value;

        // Fetch tasks from the server based on the selected category
    const url = selectedCategory === 'allCategory' 
    ? 'http://localhost:3000/api/todos'
    : `http://localhost:3000/api/category/${selectedCategory}`;

    // try {
    //     const response = await fetch(url);
    //     const tasksFromServer = await response.json();

    //     const uncompletedTasks = tasksFromServer.filter(task => !task.complete);
    //     const completedTasks = tasksFromServer.filter(task => task.complete);

    //     uncompletedTasks.forEach(task => {
    //         // Render the uncompleted tasks
    //         const li = document.createElement('li');
    //         li.textContent = task.name; 
    //         taskList.appendChild(li);
    //     });

    //     completedTasks.forEach(task => {
    //         // Render the completed tasks
    //         const li = document.createElement('li');
    //         li.textContent = task.name; 
    //         completedTaskList.appendChild(li);
    //     });
    // } catch (error) {
    //     console.error("Error fetching tasks:", error);
    // }


    try {

        const uncompletedTasks = tasks.filter(task => {
            return !task.complete && (selectedCategory === 'allCategory' || task.category === selectedCategory);
        });
    
        // tasks.forEach(task => {
        uncompletedTasks.forEach(task => {
            const li = document.createElement('li');
    
            // Toggle checkbox for complete status
            const toggleCheckbox = document.createElement('input');
            toggleCheckbox.type = 'checkbox';
            toggleCheckbox.checked = task.complete;
            toggleCheckbox.addEventListener('change', () => {
                task.complete = toggleCheckbox.checked; // Update the complete status
                renderTasks(); 
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
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}
// } catch (error) {
//     console.error("Error fetching tasks:", error);
// }

addTaskBtn.addEventListener('click', async () => {
    const newTask = newTaskInput.value.trim();
    const selectedCategory = document.getElementById('selectCategory').value;
    const errorMessageDiv = document.getElementById('error-message');
    
    if (newTask !== '' && selectedCategory !== '') {
        try {
            const response = await fetch('http://localhost:3000/api/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newTask,
                    category: selectedCategory
                })
            });

            if (response.ok) {
                const addedTask = await response.json();
                tasks.push(addedTask); // Add the new task to your local array
                renderTasks(); // Re-render tasks with the updated list
                newTaskInput.value = ''; // Clear the input field
                document.getElementById('selectCategory').value = ''; // Reset category dropdown
                errorMessageDiv.style.display = 'none';
            } else {
                const error = await response.json();
                errorMessageDiv.textContent = error.message;
                errorMessageDiv.style.display = 'block';
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    } else {
        errorMessageDiv.textContent = "Please enter a task and select a category!";
        errorMessageDiv.style.display = 'block';
    }
});

// addTaskBtn.addEventListener('click', () => {
//     const newTask = newTaskInput.value.trim();
//     const selectedCategory = document.getElementById('selectCategory').value;
//     const errorMessageDiv = document.getElementById('error-message');
//     if (newTask !== '' && selectedCategory !== '') {
//         tasks.push({ id: tasks.length + 1, name: newTask, complete: false, category: selectedCategory });
//         newTaskInput.value = ''; 
//         document.getElementById('selectCategory').value = ''; 
//         renderTasks(); 

//         errorMessageDiv.style.display = 'none';
//     } else {
//         errorMessageDiv.textContent = "Please enter a task and select a category!";
//         errorMessageDiv.style.display = 'block'; 
//     }
// });

async function updateTask(id, updatedData) {
    try {
        const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            const updatedTask = await response.json();
            tasks = tasks.map(task => task.id === id ? updatedTask : task); // Update task locally
            renderTasks(); // Re-render tasks with updated data
        } else {
            const error = await response.json();
            console.error("Error updating task:", error);
        }
    } catch (error) {
        console.error("Error updating task:", error);
    }
}
async function deleteTask(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            tasks = tasks.filter(task => task.id !== id); // Remove task from local array
            renderTasks(); // Re-render tasks after deletion
        } else {
            console.error("Failed to delete task");
        }
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}



// enter key works here
newTaskInput.addEventListener('keydown', (event) => {
    const newTask = newTaskInput.value.trim();
    const selectedCategory = document.getElementById('selectCategory').value;
    const errorMessageDiv = document.getElementById('error-message');
    if (event.key === 'Enter' && newTask !== '' && selectedCategory !== '') {
        tasks.push({ id: tasks.length + 1, name: newTask, complete: false, category: selectedCategory });
        newTaskInput.value = ''; 
        document.getElementById('selectCategory').value = ''; 
        renderTasks(); 

        errorMessageDiv.style.display = 'none';
    } else if (event.key === 'Enter') {
        errorMessageDiv.textContent = "Please enter a task and select a category!";
        errorMessageDiv.style.display = 'block'; 
    }
});

// ############# ADD, EDIT, AND DELETE CATEGORIES #############

let categories = ["Work", "School", "Health", "Other"]; 
const categoryForm = document.getElementById('categoryForm');
const categoryList = document.getElementById('categoryList');
const newCategoryInput = document.getElementById('newCategoryInput');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const editCategoriesBtn = document.getElementById('editCategories');
const saveCategoryBtn = document.getElementById('saveCategoryBtn');

// Show/hide the category form
editCategoriesBtn.addEventListener('click', () => {
    categoryForm.style.display = categoryForm.style.display === 'none' ? 'block' : 'none';
    renderCategories();
});

saveCategoryBtn.addEventListener('click', () => {
    categoryForm.style.display = 'none'; 
});

// Render categories 
function renderCategories() {
    categoryList.innerHTML = ''; 
    categories.forEach(category => {
        const li = document.createElement('li');
        // li.textContent = category;

        const categoryName = document.createElement('span');
        categoryName.textContent = category;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('editCategoryBtn');
        editBtn.addEventListener('click', () => {
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = category;

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.classList.add('saveEditBtn');
            saveBtn.addEventListener('click', () => {
                const newCategoryName = inputField.value.trim();
                if (newCategoryName && !categories.includes(newCategoryName)) {
                    categories = categories.map(cat => (cat === category ? newCategoryName : cat));
                    renderCategories(); // Update the list
                }
            });

            li.replaceChild(inputField, categoryName); // Replace text with input
            li.replaceChild(saveBtn, editBtn); // Replace Edit button with Save
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteCategoryBtn');
        deleteBtn.addEventListener('click', () => {
            categories = categories.filter(cat => cat !== category);
            renderCategories(); 
        });

        li.appendChild(categoryName);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        categoryList.appendChild(li);
    });

    updateCategoryDropdowns();
}

// Add a new category
addCategoryBtn.addEventListener('click', () => {
    const newCategory = newCategoryInput.value.trim();
    if (newCategory && !categories.includes(newCategory)) {
        categories.push(newCategory);
        newCategoryInput.value = ''; 
        renderCategories();
    }
});

document.getElementById('categoryList').addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteCategoryBtn')) {
        const category = e.target.parentNode.textContent.trim();
        categories = categories.filter(cat => cat !== category);
        renderCategories();
    }
});

// Update dropdowns dynamically
function updateCategoryDropdowns() {
    const selectCategory = document.getElementById('selectCategory');
    const sortCategory = document.getElementById('sortCategory');
    [selectCategory, sortCategory].forEach(dropdown => {
        dropdown.innerHTML = `<option value="allCategory">-All Categories-</option>`; // Ensure "allCategory" is the first option
        categories.forEach(category => {
            dropdown.innerHTML += `<option value="${category}">${category}</option>`;
        });
    });
}

// Initial rendering
renderCategories();


// Initial rendering
renderTasks();