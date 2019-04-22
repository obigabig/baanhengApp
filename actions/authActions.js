import { Constants } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_USER, FETCH_USER_ERROR } from './types';
import handlingError from '../utils/handlingError';

const setAxiosHeader = async () => {
  let authTokenStr = await AsyncStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${authTokenStr}`;
};

const rootUrl = Constants.manifest.extra.server.rootUrl;

export const signInAction = (token, callback, error) => async dispatch => {
  try {
    //Save token to localStorage.
    await AsyncStorage.setItem('token', token);
    //Save Token to Axios Header
    await setAxiosHeader();
    //dispatch AUTH_USER
    dispatch({ type: AUTH_USER, payload: token });

    //Get user profile
    let resUser = await axios.get(rootUrl+'current-user');
    dispatch({ type: FETCH_USER, payload: resUser.data });

    callback();
  } catch (err) {
    handlingError(err,dispatch);
    dispatch({ type: AUTH_ERROR, payload: err });
    error();
  }
};

export const updateAuthTokenAction = (token) => async dispatch => {
  try {
    await AsyncStorage.setItem('token', token);
    dispatch({ type: AUTH_USER, payload: token });
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err });
  }
};

export const signOutAction = callback => async dispatch => {
  try {
    await AsyncStorage.removeItem('token');
    dispatch({ type: AUTH_USER, payload: false });
    dispatch({ type: FETCH_USER, payload: '' });
    callback();
  } catch (err) {
    handlingError(err,dispatch);
    dispatch({ type: AUTH_ERROR, payload: err });
  }
};
