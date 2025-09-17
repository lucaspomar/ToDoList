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
            return error
        });
}

export { getAllTodosAsync }