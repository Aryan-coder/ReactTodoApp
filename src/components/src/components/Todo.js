import {useSelector} from 'react-redux'
import {useState, useEffect, useRef} from 'react'
import firebase from '../firebaseConfig'
import './styles/Todo.css'

const Todo=()=>{

    const user = useSelector((state)=>state.user)
    const [todos, setTodos] = useState(user.todos)
    const inputValue = useRef() 

    useEffect(()=>{
        inputValue.current.value = ''
        updateTodosInServer()
    },[todos])

    const addTodo=()=>{

        const task = inputValue.current.value

        if(task.length==0)return('');

        setTodos([
            ...todos,
            {
                id: todos.length+1,
                task: task
            }
        ])
    }

    const removeTodo=(e)=>{
        setTodos(todos.filter(todo=>todo.id!=e.target.id))
    }

    const updateTodosInServer=()=>{
        firebase.firestore().doc('/users/'+user.uid).set({
            name: user.name,
            todos: todos
        }).then(response=>{
            console.log('updated')
        }).catch(err=>{
            console.log(err)
        })
    }

    const renderTodos=()=>todos.map(todo=><li key={todo.id} id={todo.id} onClick={e=>removeTodo(e)} >{todo.task}</li>)

    return(<div className='container'>
        <h2>TodoApp</h2>
        <div className='input-area'>
            <input type='text' ref={inputValue} placholder='enter task' name='task'></input>
            <i className='fa fa-plus'  onClick={addTodo} ></i>
            </div> 
            <ul>{renderTodos()}</ul>
    </div>)

}

export default Todo