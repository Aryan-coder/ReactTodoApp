var initState={
    user: {
        uid: '',
        name: '',
        todos: []
    }
}

function reducer(state=initState, action){

    switch(action.type){
        case 'SET': {
            return({user: action.user})
        }
    }
}

export default reducer