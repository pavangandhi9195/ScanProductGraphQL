
import * as types from '../actions/types';

/*========================================================
     * function Name: categoryReducer.js 
     * function Purpose: state management
     * function Parameters: state and action
     * function ReturnType: action type and payload
     * function Description: api calling response action type and set payload of state stored in categoryReducer.js
     *=====================================================*/

const INITIAL_STATE = {
    categoryLoading: false,
    categoryList: [],
    categoryError: null,
    subCategoryLoading: false,
    subCategoryList: [],
    subCategoryError: null
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_CATEGORY_LOADING:
            return { ...state, categoryLoading: action.payload };
        case types.GET_CATEGORY_SUCCESS:
            return { ...state, categoryList: action.payload };
        case types.GET_CATEGORY_FAIL:
            return { ...state, categoryError: action.payload };
        case types.GET_SUB_CATEGORY_LOADING:
            return { ...state, subCategoryLoading: action.payload };
        case types.GET_SUB_CATEGORY_SUCCESS:
            return { ...state, subCategoryList: action.payload };
        case types.GET_SUB_CATEGORY_FAIL:
            return { ...state, subCategoryError: action.payload };
        default:
            return state;
    }
};

