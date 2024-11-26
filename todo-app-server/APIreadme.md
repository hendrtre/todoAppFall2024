# TODO API Documentation

## Endpoints

### 1. GET /api/todos
http://localhost:3000/api/todos
- just hit send in postman to view data memory 

### 2. POST /api/todo
http://localhost:3000/api/todo
- use raw json to make a post like this:
```
{
    "name": "Finish homework",
    "category": "School"
}
```

### 3. PUT /api/todos/:id
http://localhost:3000/api/todos/2
- use raw json to update a post like this:
```
{
    "name": "Updated Task",
    "complete": true,
    "category": "Health"
}
```

### 4. DELETE /api/todos/:id
http://localhost:3000/api/todos/3
- just hit send in postman and look for the 204 complete code

### 5. GET categories /api/categories
http://localhost:3000/api/categories
- just hit send in postman to view data memory 

### 6. POST categories /api/category
http://localhost:3000/api/category
- use some raw json to add a new category
```
{
    "category": "Fitness"
}
```

### 7. PUT categories /api/categories/:category
http://localhost:3000/api/categories/Health
- use some raw json to update a category
```
{
    "newCategory": "Wellness"
}
```

### 8. DELETE categories /api/categories/:category
http://localhost:3000/api/categories/Other

### 9. GET all todos from a category /api/todos/category/:category
http://localhost:3000/todos/category/Other

### **Summary:**

- The server is simple and uses in-memory data for tasks and categories.
- You can test and interact with it using Postman, sending JSON data to the defined endpoints.
- This setup doesn't require a database and meets the basic requirements for your Todo app.
