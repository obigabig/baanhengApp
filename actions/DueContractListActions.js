import axios from 'axios';
import { Constants } from 'expo';
import { FETCH_DUE_CONTRACTLIST, DUE_CONTRACTLIST_ERROR } from './types';
import { FETCH_INVESTOR_RATIO, FETCH_INVESTOR_RATIO_ERROR } from './types';
import handlingError from '../utils/handlingError';

const rootUrl = Constants.manifest.extra.server.rootUrl;

/*-----------------------[Dashboard:Due Contract List]-------------------------------*/
export const getDueContractListsAction = (callback) => async dispatch => {
    try {
      const contractList = await axios.get(`${rootUrl}getDueContractLists`);
      dispatch({ type: FETCH_DUE_CONTRACTLIST, payload: contractList.data });
      callback();
    } catch(err) {
      handlingError(err, dispatch)
      dispatch({ type: DUE_CONTRACTLIST_ERROR, payload: 'Can not call getDueContractListsAction.' });
    }
  };
  
  export const markActionAsComplete = (contractId, actionId) => async dispatch => {
    try {
      const contractList = await axios.get(`${rootUrl}markActionAsComplete?contractId=${contractId}&actionId=${actionId}`);
      dispatch({ type: FETCH_DUE_CONTRACTLIST, payload: contractList.data });
    } catch(err) {
      handlingError(err, dispatch)
      dispatch({ type: DUE_CONTRACTLIST_ERROR, payload: 'Can not call markActionAsComplete.' });
    }
    
  }
  
  /*-----------------------[Report]-------------------------------*/
  export const getinvestorRatioAction = (callback) => async dispatch => {
    try {
      const investorRatio = await axios.get(`${rootUrl}getInvestorRatio`);
      dispatch({ type: FETCH_INVESTOR_RATIO, payload: investorRatio.data });
      callback()
    } catch(err) {
      handlingError(err, dispatch)
      dispatch({ type:FETCH_INVESTOR_RATIO_ERROR, payload: err.message });
    }
  };
  