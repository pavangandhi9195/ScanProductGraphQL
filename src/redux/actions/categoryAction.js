
import { Alert } from 'react-native';
import { apiRequest } from './index';
import * as URL from './WebApiList';
import * as types from './types';
import { GraphQLClient, gql } from 'graphql-request';

/*========================================================
     * function Name: categoryAction.js
     * function Purpose: method of action
     * function Parameters: url, method, body, onLoadStart, onLoadEnd, onSuccess, onError using api calling
     * function ReturnType: onLoadStart, onLoadEnd, onSuccess, onError
     * function Description: api calling using method of action in categoryAction.js
     *=====================================================*/

export const getCategorySuccess = (payload) => {
    return { type: types.GET_CATEGORY_SUCCESS, payload: payload }
}

export const getCategoryFail = (payload) => {
    return { type: types.GET_CATEGORY_FAIL, payload: payload }
}

export const incrementCategoryLoading = () => {
    return { type: types.GET_CATEGORY_LOADING, payload: true }
}

export const decrementCategoryLoading = () => {
    return { type: types.GET_CATEGORY_LOADING, payload: false }
}
// get category list
export const getCategory = () => {
    return async (dispatch) => {
        dispatch(incrementCategoryLoading());
        const endpoint = 'http://192.168.1.25:3000/graphql';
        const graphQLClient = new GraphQLClient(endpoint, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const query = gql` {
            categories {
                id, title, children {
                  id, title
                }
            }
        }
        `
        const response = await graphQLClient.request(query);
        dispatch(decrementCategoryLoading());
        if (response && response.categories != null && response.categories.length > 0) {
            dispatch(getCategorySuccess(response.categories));
        } else {
            dispatch(getCategoryFail('Category is not found'));
        }
    }
}

export const getSubCategorySuccess = (payload) => {
    return { type: types.GET_SUB_CATEGORY_SUCCESS, payload: payload }
}

export const getSubCategoryFail = (payload) => {
    return { type: types.GET_SUB_CATEGORY_FAIL, payload: payload }
}

export const incrementSubCategoryLoading = () => {
    return { type: types.GET_SUB_CATEGORY_LOADING, payload: true }
}

export const decrementSubCategoryLoading = () => {
    return { type: types.GET_SUB_CATEGORY_LOADING, payload: false }
}
// get sub category list
export const getSubCategory = (subCategoryId) => {
    return apiRequest({
        url: `${URL.SUB_CATEGORY}`,
        method: 'GET',
        onLoadStart: incrementSubCategoryLoading,
        onLoadEnd: decrementSubCategoryLoading,
        onSuccess: payload => {
            return dispatch => {
                dispatch(getSubCategorySuccess(payload.data))
            }
        },
        onError: error => {
            return dispatch => {
                dispatch(decrementSubCategoryLoading());
                dispatch(getSubCategoryFail(error));
            }
        }
    });
}