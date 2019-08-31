const usersReducer = (state = {}, action) => {
    switch(action.type) {
        case 'CREATE_USER':
            fetch(`localhost://8080/api/${action.payload.id}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload) 
            })
            .then(response => response.json())
            .then(data => console.log(data))
            break;
        case 'GET_USERS': 
            fetch('http://localhost:8080/api/users')
            .then(response => response.json()
            )
            .then(data => {
                console.log(data)
                Object.assign({}, state, data)
                console.log(state)
            })
            .catch(err => console.error(err));

            return
        default:
            return state;
    }
}

export default usersReducer;
