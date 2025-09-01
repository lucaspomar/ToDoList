import instance from "./api_instance.js";

async function loginAsync(user, password) {
    await instance.post('/auth/', {
        username: user,
        password: password
    })
        .then(response => {
            console.log('Login realizado:', response.data);
            sessionStorage.setItem('accessToken', response.data.access);
            sessionStorage.setItem('refreshToken', response.data.refresh);
            return true
        })
        .catch(error => {
            console.error('Login error:', error.response ? error.response.data : error.message);
        });
    return false
}

export { loginAsync }