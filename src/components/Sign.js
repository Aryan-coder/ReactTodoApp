import {useState, useRef} from 'react'
import {Redirect} from 'react-router-dom'
import firebase from '../firebaseConfig.js'
import {useDispatch} from 'react-redux'
import './styles/Sign.css'

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
                <h2>Sign in</h2>
                <input type='email' placeholder='email' name='email' />
                <input type='password' placeholder='password' name='password' />
                <button type='submit'>Submit</button>
                <h4>Don't have account ? <span onClick={()=>setRegistered(false)} >click here</span> to create one.</h4>
            </form>
        </div>)
    }

    const  signUp=()=>{
        return(<div>
            <form onSubmit={(e)=>signUpHandler(e)}>
                <h2>Sign up</h2>
                <input type='name' placeholder='username' name='name' />
                <input type='email' placeholder='email' name='email' />
                <input type='password' placeholder='password' name='password' />
                <button type='submit'>Submit</button>
                <h4>Already have account ? <span onClick={()=>setRegistered(true)} >click here</span> to Login.</h4>
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