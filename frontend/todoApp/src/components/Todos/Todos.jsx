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
        <div key={todo.id} className='flex flex-col w-full pt-4 gap-4'>
            <div className='text-blue-500 text-2xl font-bold w-9/10 m-auto'>{todo.title}</div>
            <div className='text-black text-2xl w-9/10 m-auto'>{todo.description}</div>
            <div className='text-black text-2xl w-9/10 m-auto'>{todo.due_date}</div>
            <div className='text-black text-2xl w-9/10 m-auto'>{todo.complete ? "Finalizado" : "Não finalizado"}</div>
            <div className="flex flex-wrap justify-center gap-5 m-auto">
                <div
                    className='flex justify-center items-center w-50 h-10 text-white rounded-xl
                    text-lg font-bold cursor-pointer bg-green-700'
                    onClick={() => HandleFinishClick(todo)} >
                    {todo.complete ? "Finalizar" : "Recomeçar"}
                </div>
                <div
                    className='flex justify-center items-center w-50 h-10 text-white rounded-xl
                    text-lg font-bold cursor-pointer bg-blue-500' >
                    Editar
                </div>
                <div
                    className='flex justify-center items-center w-50 h-10 text-white rounded-xl
                    text-lg font-bold cursor-pointer bg-red-600'
                    onClick={() => HandleDeleteClick(todo)} >
                    Deletar
                </div>
            </div>  
            <div className='self-center w-9/10 h-1.5 rounded-md bg-blue-500 '></div>
        </div>  
    );

    return (
    <div className='flex flex-col mt-25 m-auto bg-white pb-8 w-7/10 rounded-xl'>
        <div className='flex flex-col items-center gap-4 w-full mt-8'>
            <div className='text-blue-500 text-5xl font-bold'>Lista de Tarefas</div>
            <div className='bg-blue-500 w-9/10 h-1.5 rounded-md'></div>
            <div className='flex flex-col w-7/10'>
                <div className='input-todos'>
                    <img src={user_icon} alt='' />
                    <input type='text' placeholder='Busca' value={search} onChange={(v) => HandleSearchChange(v.target.value)}/>
                </div>
            </div>
            <div className='bg-blue-500 w-9/10 h-1.5 rounded-md'></div>
        </div> 
        {todosList}
    </div>
  )
}

export default Todos;
