
import { Alert } from 'react-native';
import { apiRequest } from './index';
import * as URL from './WebApiList';
import * as types from './types';
import { GraphQLClient, gql, request } from 'graphql-request';
import Category from '../../container/Category';

/*========================================================
     * function Name: productAction.js
     * function Purpose: method of action
     * function Parameters: url, method, body, onLoadStart, onLoadEnd, onSuccess, onError using api calling
     * function ReturnType: onLoadStart, onLoadEnd, onSuccess, onError
     * function Description: api calling using method of action in productAction.js
     *=====================================================*/

export const getProductSuccess = (payload) => {
  return { type: types.GET_PRODUCT_SUCCESS, payload: payload }
}

export const getProductFail = (payload) => {
  return { type: types.GET_PRODUCT_FAIL, payload: payload }
}

export const incrementProductLoading = () => {
  return { type: types.GET_PRODUCT_LOADING, payload: true }
}

export const decrementProductLoading = () => {
  return { type: types.GET_PRODUCT_LOADING, payload: false }
}
// get product list
export const getProduct = (category) => {
  return async (dispatch) => {
    dispatch(incrementProductLoading());
    dispatch({type: types.CLEAR_PRODUCT_DATA })
    const endpoint = 'http://192.168.1.25:3000/graphql';
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const query = gql`
    {
        products(category: "${category}") {
          id
          name
          image
          quantity
          sku
          qrCode
          isDeleted
          categoryInfo {
            id
            title
            parent {
              id
              title
            }
          }        
      }
    }
    `
    const variables = {
      category
    }
    const response = await request(endpoint, query, variables);
    
    dispatch(decrementProductLoading());
    if (response && response.products != null && response.products.length > 0) {
      dispatch(getProductSuccess(response.products));
    } else {
      dispatch(getProductFail('product is not found'));
    }
  }
}

export const getProductDetailsSuccess = (payload) => {
  return { type: types.GET_PRODUCT_DETAILS_SUCCESS, payload: payload }
}

export const getProductDetailsFail = (payload) => {
  return { type: types.GET_PRODUCT_DETAILS_FAIL, payload: payload }
}

export const incrementProductDetailsLoading = () => {
  return { type: types.GET_PRODUCT_DETAILS_LOADING, payload: true }
}

export const decrementProductDetailsLoading = () => {
  return { type: types.GET_PRODUCT_DETAILS_LOADING, payload: false }
}
// get product details
export const getProductDetails = (type, id) => {
  return async (dispatch) => {
    dispatch(incrementProductDetailsLoading());
    const endpoint = 'http://192.168.1.25:3000/graphql';
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    let query;
    let variables;
    if (type == 'product') {
      query = gql`
      {
          product(id: "${id}") {
            id
            name
            image
            sku
            quantity
            qrCode
            isDeleted
            categoryInfo {
              id
              title
              parent {
                id
                title
              }
            }
          }
      }
      `
      variables = {
        id
      }
    } else {
      query = gql`
      {
          product(sku: "${id}") {
            id
            name
            image
            sku
            quantity
            qrCode
            isDeleted
            categoryInfo {
              id
              title
              parent {
                id
                title
              }
            }
          }
      }
      `
      variables = {
        sku: id
      }
    }

    const response = await graphQLClient.request(query, variables);
    
    dispatch(decrementProductDetailsLoading());
    if (response && response.product != null) {
      dispatch(getProductDetailsSuccess(response.product));
    } else {
      dispatch(getProductDetailsFail('product is not found'));
    }
  }
}
