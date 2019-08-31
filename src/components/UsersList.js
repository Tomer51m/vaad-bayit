import React, { useEffect, useState } from 'react';
import './usersList.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../store/actions';

function UsersList() {    
    const [data, setData] = useState();
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        async function FetchUsers() {
            let response = await fetch('http://localhost:8080/api/users/')
            let data = await response.json()
            console.table(data);
            setData(data);
        }
        FetchUsers();
    // async function dispatchUsers() {
    //     await dispatch(getUsers());
    //     await setData(users);
    //     console.log('this is users', users)
    // }
    // dispatchUsers()

    }, [])

  
    if(data === undefined) {
        return <div>Nothing to display</div>
    } else {
        let users = data.map(user => {
            return (
                <li className='users_item' id={user.id} key={user.id}>
                    <a href={'#' + user.id} class='users_title'>{user.first_name} {user.last_name}</a>
                    <div className='users_subItem'>
                        <p>Apartment: {user.apartment_number}</p>
                        <p>Floor: {user.floor_number}</p>
                        <p>Owner: {user.is_owner ? 'Yes' : 'No'}</p>
                    </div>
                </li>
            )
        })
        return (
            <div className='users'>
                <ul className='users_list'>
                    {users}
                </ul>
            </div>
        )
    }
}

export default UsersList
