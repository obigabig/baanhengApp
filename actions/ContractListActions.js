import axios from 'axios';
import { Constants } from 'expo';
import {
  FETCH_CONTRACTLIST,
  FETCH_MORE_CONTRACTLIST,
  FETCH_CONTRACTLIST_LENGTH,
  CONTRACTLIST_ERROR
} from './types';
import handlingError from '../utils/handlingError';
const rootUrl = Constants.manifest.extra.server.rootUrl;

/*-----------------------[Contract List]-------------------------------*/
const getContractLists = async (
  skip,
  limit,
  sort,
  no,
  title,
  status,
  pact,
  propType,
  value
) => {
  return await axios.get(
    `${rootUrl}ContractLists?sort=${sort.field}&sortType=${sort.type}` +
      `&no=${no}` +
      `&title=${title}` +
      `&status=${status}` +
      `&pact=${pact}` +
      `&propType=${propType}` +
      `&value=${value}` +
      `&skip=${skip}&limit=${limit}`
  );
};

const getContractListsLength = async (
  skip,
  limit,
  sort,
  no,
  title,
  status,
  pact,
  propType,
  value
) => {
  return await axios.get(
    `${rootUrl}getContractListsLength?` +
      `&no=${no}` +
      `&title=${title}` +
      `&status=${status}` +
      `&pact=${pact}` +
      `&propType=${propType}` +
      `&value=${value}`
  );
};

export const getContractListsAction = (
  skip,
  limit,
  sort,
  no,
  title,
  status,
  pact,
  propType,
  value,
  callback
) => async dispatch => {
  try {
    const contractList = await getContractLists(
      skip,
      limit,
      sort,
      no,
      title,
      status,
      pact,
      propType,
      value
    );

    const contractListLength = await getContractListsLength(
      skip,
      limit,
      sort,
      no,
      title,
      status,
      pact,
      propType,
      value
    );

    dispatch({ type: FETCH_CONTRACTLIST, payload: contractList.data });
    dispatch({
      type: FETCH_CONTRACTLIST_LENGTH,
      payload: contractListLength.data
    });
    callback();
  } catch (err) {
    handlingError(err, dispatch);
    dispatch({ type: CONTRACTLIST_ERROR, payload: err });
  }
};

export const loadMoreContractListsAction = (
  skip,
  limit,
  sort,
  no,
  title,
  status,
  pact,
  propType,
  value,
  callback
) => async dispatch => {
  try {
    const contractList = await getContractLists(
      skip,
      limit,
      sort,
      no,
      title,
      status,
      pact,
      propType,
      value
    );

    const contractListLength = await getContractListsLength(
      skip,
      limit,
      sort,
      no,
      title,
      status,
      pact,
      propType,
      value
    );

    dispatch({ type: FETCH_MORE_CONTRACTLIST, payload: contractList.data });
    dispatch({
      type: FETCH_CONTRACTLIST_LENGTH,
      payload: contractListLength.data
    });
    callback(); 
  } catch (err) {
    handlingError(err, dispatch);
    dispatch({ type: CONTRACTLIST_ERROR, payload: err });
  }
};
