import {useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import firebase from '../firebaseConfig'

const Todo=()=>{

    const user = useSelector((state)=>state.user)
    const [todos, setTodos] = useState(user.todos)
    const [inputValue, setInputValue] = useState('')

    useEffect(()=>{
       updateTodosInServer()
    },[todos])

    const addTodo=()=>{

        setTodos([
            ...todos,
            {
                id: todos.length+1,
                task: inputValue
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

    return(<div>
            <input type='text' onChange={(e)=>setInputValue(e.target.value)} placholder='enter task' name='task'></input>
            <button onClick={addTodo}> add</button>
            <ul>{renderTodos()}</ul>
    </div>)

}

export default Todo