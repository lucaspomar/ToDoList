import './Todos.css'
import user_icon from '../../assets/person.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Todos = () => {

    const navigate = useNavigate();

    const token = sessionStorage.getItem('token');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            axios.get('/todos/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Todos fetched:', response.data);
                setTodos(response.data.results);
            })
            .catch(error => {
                console.error('Todos error:', error.response ? error.response.data : error.message);
            });
        }
    }, []);

    const todosList = todos.map(todo => 
        <div key={todo.id} className='underline'></div>    
    );

    return (
    <div className='container-todos'>
        <div className='header'>
            <div className='text'>Lista de Tarefas</div>
            <div className='underline'></div>
            <div className='inputs-todos'>
                <div className='input-todos'>
                    <img src={user_icon} alt='' />
                    <input type='text' placeholder='Busca' />
                </div>
            </div>
            <div className='underline'></div>
            {todosList}
        </div> 
    </div>
  )
}

export default Todos;
