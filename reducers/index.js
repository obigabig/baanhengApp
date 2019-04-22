import { combineReducers } from 'redux';
import user from './userReducers';
import auth from './authReducer';
import contract from './contractReducer';
import contractList from './contractListReducer';
import dueContractList from './dueContractListReducer';
import report from './reportReducer';

export default combineReducers({
    user,
    auth,
    contract,
    contractList,
    dueContractList,
    report
})
