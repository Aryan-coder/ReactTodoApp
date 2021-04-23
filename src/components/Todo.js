import {useSelector, useDispatch} from 'react-redux'

const Todo=()=>{

    const user = useSelector((state)=>state.user)

    return(<div>
            Todo
    </div>)

}

export default Todo