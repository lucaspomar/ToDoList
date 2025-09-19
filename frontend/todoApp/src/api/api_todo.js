import instance from "./api_instance.js";

async function getAllTodosAsync(search = '') {
    const request = {params: {search: search}};

    return await instance.get('/todos/', request)
        .then(response => {
            console.log('Todos fetched:', response.data);
            return response.data.results;
        })
        .catch(error => {
            console.error('Todos error:', error.response ? error.response.data : error.message);
            throw error
        });
}

async function todoToggleFinishAsync(todo) {
    return await instance.patch(`/todos/${todo.id}/`, {complete: !todo.complete})
        .then(response => {
            console.log('Todo updated:', response.data);
            return true;
        })
        .catch(error => {
            console.error('Finish error:', error.response ? error.response.data : error.message);
            throw error
        });
}

async function todoDeleteAsync(todoId) {
    return await instance.delete(`/todos/${todoId}/`)
        .then(response => {
            console.log('Todo deleted:', response.data);
            return true;
        })
        .catch(error => {
            console.error('Delete error:', error.response ? error.response.data : error.message);
            throw error;
        });
}

export { getAllTodosAsync, todoToggleFinishAsync, todoDeleteAsync };