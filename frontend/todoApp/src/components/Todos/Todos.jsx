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
                if (error.response.status === 401) {
                    sessionStorage.removeItem('token');
                    navigate('/');
                }
                console.error('Todos error:', error.response ? error.response.data : error.message);
            });
        }
    }, []);

    const todosList = todos.map(todo => 
        <div key={todo.id} className='todo-item'>
            <h2>{todo.title}</h2>
            <h1>{todo.description}</h1>
            <h1>{todo.due_date}</h1>
            <h1>{todo.complete}</h1>
            <div className='underline-todo'></div>  
        </div>  
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
        </div> 
        {todosList}
    </div>
  )
}

export default Todos;
