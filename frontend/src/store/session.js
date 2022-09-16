import { csrfFetch } from './csrf';


const SET_USER = 'session/set_user'
const REMOVE_USER = 'session/remove_user'

export function setUser(user) {
    return {
        type: SET_USER,
        user
    }
}
export function removeUser() {
    return {
        type: REMOVE_USER
    }
}

export const login = (user) => async dispatch => {
    const { credential, password } = user
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    })
    let data = await res.json()
    dispatch(setUser(data))
    return res
}

export const restoreUser = () => async dispatch => {
    console.log('Restoring User')
    const response = await csrfFetch('/api/session');

    const data = await response.json();
    dispatch(setUser(data));
    console.log('Restored User', data)
    return response

};

export const signUp = (user) => async dispatch => {
    const { firstName, lastName, username, email, password } = user
    let res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password
        })
    })
    let data = await res.json()
    console.log('data', data)
    dispatch(setUser(data))
    return res 

}

export const logout = () => async dispatch => {
    let res = await csrfFetch('api/session', {
        method: 'DELETE'
    })
    let data = await res.json()
    dispatch(removeUser())
    return data
}


const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state)
            newState.user = action.user
            return newState
        case REMOVE_USER:
            newState = Object.assign({}, state)
            newState.user = null
            return newState
        default:
            return state
    }

}
