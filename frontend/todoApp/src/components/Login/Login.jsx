import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import instance from "../../api/api_instance.js";

import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import user_icon from '../../assets/person.png'

export const Login = () => {

    const [action, setAction] = useState('Login')
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const token = sessionStorage.getItem('accessToken');

    function resetFields() {
        setUser('')
        setEmail('')
        setPassword('')
    }

    function loginUser() {
        instance.post('/auth/', {
                username: user,
                password: password
            })
            .then(response => {
                console.log('Login realizado:', response.data);
                sessionStorage.setItem('accessToken', response.data.access);
                sessionStorage.setItem('refreshToken', response.data.refresh);
                navigate('/todos');
            })
            .catch(error => {
                console.error('Login error:', error.response ? error.response.data : error.message);
            });
    }

    function handleLoginClick() {
        if (action !== 'Login') {
            setAction('Login')
            resetFields()
        } else {
            loginUser();
        }
    }

    function handleCadastroClick() {
        if (action !== 'Cadastro') {
            setAction('Cadastro')
            resetFields()
        } else {
            instance.post('/register/', {
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
                <div className='flex items-center bg-gray-200 rounded-md m-auto w-120 h-20'>
                    <img className='mx-8' src={user_icon} alt='' />
                    <input className='text-blue-500 bg-transparent text-xl outline-none border-none w-full h-full'
                           type='text'
                           placeholder='Usuário'
                           value={user}
                           onChange={(v) => setUser(v.target.value)}
                    />
                </div>

                { action === 'Login' ? null :
                    <div className='flex items-center bg-gray-200 rounded-md m-auto w-120 h-20'>
                        <img className='mx-8' src={email_icon} alt='' />
                        <input className='text-blue-500 bg-transparent text-xl outline-none border-none w-full h-full'
                               type='email'
                               placeholder='Email'
                               value={email}
                               onChange={(v) => setEmail(v.target.value)}
                        />
                    </div>
                }

                <div className='flex items-center bg-gray-200 rounded-md m-auto w-120 h-20'>
                    <img className='mx-8' src={password_icon} alt='' />
                    <input className='text-blue-500 bg-transparent text-xl outline-none border-none w-full h-full'
                           type='password'
                           placeholder='Senha'
                           value={password}
                           onChange={(v) => setPassword(v.target.value)}
                    />
                </div>
            </div>
            <div className="flex gap-8 my-15 mx-auto">
                <div className={`flex justify-center items-center w-55 h-15 rounded-full text-lg font-bold cursor-pointer 
                    ${action === 'Login' ? 'bg-gray-200 text-zinc-500' : 'text-white bg-blue-500'}`}
                     onClick={handleCadastroClick}>
                    Cadastro
                </div>
                <div className={`flex justify-center items-center w-55 h-15 rounded-full text-lg font-bold cursor-pointer 
                    ${action === 'Cadastro' ? 'bg-gray-200 text-zinc-500' : 'text-white bg-blue-500'}`}
                     onClick={handleLoginClick}>
                    Login
                </div>
            </div>
        </div>
    )
}

export default Login
