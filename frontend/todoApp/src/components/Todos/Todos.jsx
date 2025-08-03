import './Todos.css'
import user_icon from '../../assets/person.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Todos = () => {

    const navigate = useNavigate();

    const token = sessionStorage.getItem('token');
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState([]);

    function handleInvalidToken(error) {
        if (error.response.status === 401 ) {
            sessionStorage.removeItem('token');
            navigate('/');
        }
    }

    function fetchTodos(search = '') {

        const request = {
            headers: {
                'Authorization': `Bearer ${token}`
            }    
        };

        if (search) {
            request.params = { search: search };
        }

        axios.get('/todos/', request)
        .then(response => {
            console.log('Todos fetched:', response.data);
            setTodos(response.data.results);
        })
        .catch(error => {
            handleInvalidToken(error);
            console.error('Todos error:', error.response ? error.response.data : error.message);
        });    
    }

    function HandleFinishClick(todo) {
        axios.patch(`/todos/${todo.id}/`, {
                complete: !todo.complete
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        .then(response => {
            console.log('Todo updated:', response.data);
            fetchTodos();
        })
        .catch(error => {
            handleInvalidToken(error);
            console.error('Finish error:', error.response ? error.response.data : error.message);
        });  
    }

    function HandleDeleteClick(todo) {
        axios.delete(`/todos/${todo.id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Todo deleted:', response.data);
            fetchTodos();
        })
        .catch(error => {
            handleInvalidToken(error);
            console.error('Delete error:', error.response ? error.response.data : error.message);
        });    
    }

    function HandleSearchChange(search) {
        setSearch(search);
        fetchTodos(search);
    }

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchTodos();
        }
    }, []);

    const todosList = todos.map(todo => 
        <div key={todo.id} className='todo-item'>
            <div className='todo-title'>{todo.title}</div>
            <div className='todo-text'>{todo.description}</div>
            <div className='todo-text'>{todo.due_date}</div>
            <div className='todo-text'>{todo.complete ? "Finalizado" : "Não finalizado"}</div>
            <div className="todo-actions">
                <div className='todo-button green' onClick={() => HandleFinishClick(todo)} >{todo.complete ? "Finalizar" : "Recomeçar"}</div>
                <div className='todo-button' >Editar</div>
                <div className='todo-button red' onClick={() => HandleDeleteClick(todo)} >Deletar</div>
            </div>  
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
                    <input type='text' placeholder='Busca' value={search} onChange={(v) => HandleSearchChange(v.target.value)}/>
                </div>
            </div>
            <div className='underline'></div>
        </div> 
        {todosList}
    </div>
  )
}

export default Todos;
