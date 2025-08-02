import './Login.css'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import user_icon from '../../assets/person.png'

export const Login = () => {
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>Login</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <img src={user_icon} alt='' />
                <input type='text' placeholder='Usuário' />
            </div>
            <div className='input'>
                <img src={email_icon} alt='' />
                <input type='email' placeholder='Email' />
            </div>
            <div className='input'>
                <img src={password_icon} alt='' />
                <input type='password' placeholder='Senha' />
            </div>
        </div>
        <div className="submit-container">
            <div className="submit">Cadastro</div>
            <div className="submit">Login</div>
        </div>
    </div>
  )
}

export default Login
