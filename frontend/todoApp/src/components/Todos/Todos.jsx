import './Todos.css'
import user_icon from '../../assets/person.png'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Todos = () => {

    const navigate = useNavigate();

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    })

  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>Lista de Tarefas</div>
            <div className='underline'></div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt='' />
                    <input type='text' placeholder='Busca' />
                </div>
            </div>
            <div className='underline'></div>
        </div> 
    </div>
  )
}

export default Todos;
