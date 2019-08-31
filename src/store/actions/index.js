export function createUser(obj) {
    return {
        type: 'CREATE_USER',
        payload: obj
    }
}

export function getUsers() {
    return {
        type: 'GET_USERS',
    }
}

export function updateUser(obj) {
    return {
        type: 'UPDATE_USER',
        payload: obj
    }
}

export function deleteUser(id) {
    return {
        type: 'DELETE_USER',
        payload: id
    }    
}