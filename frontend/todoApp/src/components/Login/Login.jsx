import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import './Login.css'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import user_icon from '../../assets/person.png'

export const Login = () => {

    const [action, setAction] = useState('Login')
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const token = sessionStorage.getItem('token');

    function resetFields() {
        setUser('')
        setEmail('')
        setPassword('')
    }

    function loginUser() {
        axios.post('/auth/', {
                username: user,
                password: password
            })
            .then(response => {
                console.log('Login realizado:', response.data);
                sessionStorage.setItem('token', response.data.access);
                navigate('/todos');
            })
            .catch(error => {
                console.error('Login error:', error.response ? error.response.data : error.message);
            });
    }
    
    function handleLoginClick() {
        if (action != 'Login') {
            setAction('Login')
            resetFields()
        } else {
            loginUser();    
        }
    }

    function handleCadastroClick() {
        if (action != 'Cadastro') {
            setAction('Cadastro')
            resetFields()
        } else {
            axios.post('/register/', {
                username: user,
                email: email,
                password: password
            })
            .then(response => {
                console.log('Cadastro realizado:', response.data);
                loginUser();
            })
            .catch(error => {
                console.error('Cadastro error:', error.response ? error.response.data : error.message);
            });
        }
    }
    
    useEffect(() => {
        if (token) {
            navigate('/todos');
        }
    })

    return (
        <div className='bg-white flex flex-col rounded-xl m-auto mt-25 pb-5 w-150'>
            <div className='flex flex-col items-center gap-4 mt-8 w-full'>
                <div className='text-blue-500 font-bold text-5xl'>{action}</div>
                <div className='bg-blue-500 rounded-md h-1.5 w-9/10'></div>
            </div>
            <div className='inputs flex flex-col gap-6 mt-14'>
                <div className='input'>
                    <img className='mx-8' src={user_icon} alt='' />
                    <input type='text' placeholder='Usuário' value={user} onChange={(v) => setUser(v.target.value)} />
                </div>

                { action === 'Login' ? null : 
                    <div className='input'>
                        <img className='mx-8' src={email_icon} alt='' />
                        <input type='email' placeholder='Email' value={email} onChange={(v) => setEmail(v.target.value)} />
                    </div>
                }
                
                <div className='input'>
                    <img className='mx-8' src={password_icon} alt='' />
                    <input type='password' placeholder='Senha' value={password} onChange={(v) => setPassword(v.target.value)} />
                </div>
            </div>
            <div className="submit-container">
                <div className={action === 'Login' ? "submit gray" : "submit"} onClick={handleCadastroClick}>Cadastro</div>
                <div className={action === 'Cadastro' ? "submit gray" : "submit"} onClick={handleLoginClick}>Login</div>
            </div>
        </div>
    )
}

export default Login
