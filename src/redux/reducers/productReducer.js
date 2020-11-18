
import * as types from '../actions/types';

/*========================================================
     * function Name: productReducer.js 
     * function Purpose: state management
     * function Parameters: state and action
     * function ReturnType: action type and payload
     * function Description: api calling response action type and set payload of state stored in productReducer.js
     *=====================================================*/

const INITIAL_STATE = {
    productLoading: false,
    productList: [],
    productError: null,
    productDetailsLoading: false,
    productDetails: null,
    productDetailsError: null
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_PRODUCT_LOADING:
            return { ...state, productLoading: action.payload };
        case types.GET_PRODUCT_SUCCESS:
            return { ...state, productList: action.payload };
        case types.GET_PRODUCT_FAIL:
            return { ...state, productError: action.payload, productList: [] };
        case types.CLEAR_PRODUCT_DATA:
            return { ...state, productList: [] };
        case types.GET_PRODUCT_DETAILS_LOADING:
            return { ...state, productDetailsLoading: action.payload };
        case types.GET_PRODUCT_DETAILS_SUCCESS:
            return { ...state, productDetails: action.payload };
        case types.GET_PRODUCT_DETAILS_FAIL:
            return { ...state, productDetailsError: action.payload };
        default:
            return state;
    }
};

