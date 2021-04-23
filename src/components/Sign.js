import {useState, useRef} from 'react'
import {Redirect} from 'react-router-dom'
import firebase from '../firebaseConfig.js'
import {useDispatch} from 'react-redux'

const Sign=()=>{

    const [alreadyRegistered, setRegistered] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const dispatch = useDispatch()

    const signUpHandler=(e)=>{
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(e.target.email.value, e.target.email.value)
        .then(responce=>{
            console.log('auth')
            console.log(responce)
            firebase.firestore().doc('/users/'+responce.user.uid).set({
                name: e.target.name.value,
                todos: []
            }).then(resp=>{
                console.log('data')
                console.log(resp)
                setRegistered(true)
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    const signInHandler=(e)=>{
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(e.target.email.value,e.target.password.value)
        .then(responce=>{
            firebase.firestore().doc('/users/'+responce.user.uid).get().then(resp=>{
                if(resp.exists){
                    dispatch({type: 'SET', user: resp.data()})
                    setAuthenticated(true)
                }
                else{
                    console.log('Data not found')
                }
            }).catch(err=>{
                console.log(err)
            })
        })
    }

    const signIn=()=>{

        return(<div>
            <form onSubmit={(e)=>signInHandler(e)}>
                <input type='email' placeholder='email' name='email' />
                <input type='password' placeholder='password' name='password' />
                <button type='submit'>Submit</button>
            </form>
        </div>)
    }

    const  signUp=()=>{
        return(<div>
            <form onSubmit={(e)=>signUpHandler(e)}>
                <input type='name' placeholder='text' name='name' />
                <input type='email' placeholder='email' name='email' />
                <input type='password' placeholder='password' name='password' />
                <button type='submit'>Submit</button>
            </form>
        </div>)
    }

    if(authenticated){
        return(<Redirect to='/todo' />)
    }

    return(<div>
        {alreadyRegistered ? signIn() : signUp()}    
    </div>)

}

export default Sign