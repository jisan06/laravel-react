import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import * as Types from './types'
import setAuthToken from '../../utils/setAuthToken'

export const register = (user,history) => dispatch => {
    Axios.post('/api/users/register', user)
        .then((res) => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error:{}
                }
            })
            history.push('/login')
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const login = (user, history) => dispatch => {
    Axios.post('/api/users/login', user)
        .then(res => {
            let token = res.data.access_token
            localStorage.setItem('auth_token', token)
            setAuthToken(token)
            let decode = jwtDecode(token)

            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decode
                }
            })

            history.push('/category')
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const logout = history => {
    localStorage.removeItem('auth_token')
    history.push('/')
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}