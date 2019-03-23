import axios from 'axios';
import {AUTH_USER, AUTH_ERROR} from './types';

export const signup = (formData, callback) => dispatch => {
    axios.post('http://localhost:3090/signup', formData)
    .then((resp) => {
        dispatch({
            type: AUTH_USER,
            payload: resp.data.token
        });
        localStorage.setItem('token', resp.data.token);
        callback();
    })
    .catch((error) => {

        dispatch({
            type: AUTH_ERROR,
            payload: 'email in use'
        })
    })
}

export const signout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_USER,
        payload: ''
    }
}

export const signin = (formData, callback) => dispatch => {
    axios.post('http://localhost:3090/signin', formData)
    .then((resp) => {
        dispatch({
            type: AUTH_USER,
            payload: resp.data.token
        });
        localStorage.setItem('token', resp.data.token);
        callback();
    })
    .catch((error) => {

        dispatch({
            type: AUTH_ERROR,
            payload: 'Invalid login credintial'
        })
    })
}