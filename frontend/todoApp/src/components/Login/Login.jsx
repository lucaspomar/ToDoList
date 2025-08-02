import { useState } from 'react'

import './Login.css'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import user_icon from '../../assets/person.png'

export const Login = () => {

    const [action, setAction] = useState('Login')
    
    function handleLoginClick() {
        if (action != 'Login') {
            setAction('Login')
        } else {

        }
    }

    function handleCadastroClick() {
        if (action != 'Cadastro') {
            setAction('Cadastro')
        } else {
            
        }
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt='' />
                    <input type='text' placeholder='Usuário' />
                </div>

                { action === 'Login' ? null : 
                    <div className='input'>
                        <img src={email_icon} alt='' />
                        <input type='email' placeholder='Email' />
                    </div>
                }
                
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input type='password' placeholder='Senha' />
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
