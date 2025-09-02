import instance from "./api_instance.js";

async function loginAsync(user, password) {
    return await instance.post('/auth/', {
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
            return false;
        });
}

async function cadastroAsync(user, email, password) {
    return await instance.post('/register/', {
        username: user,
        email: email,
        password: password
    })
        .then(response => {
            console.log('Cadastro realizado:', response.data);
            return true
        })
        .catch(error => {
            console.error('Cadastro error:', error.response ? error.response.data : error.message);
            return false
        });
}

export { loginAsync, cadastroAsync }