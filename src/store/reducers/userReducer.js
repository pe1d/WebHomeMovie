import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: {},
}

const useReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log("check action:", action.userInfo, "check state", state);
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
            }
        case actionTypes.USER_LOGIN_FAIL:
            console.log("check action fail: ");
            return {
                ...state,
                isLoggedIn: false,
                userInfo: {}
            }
        case actionTypes.PROCESS_LOGOUT:
            console.log("check action logout: ");
            return {
                ...state,
                isLoggedIn: false,
                userInfo: {},
            }
        default:
            return state;
    }
}

export default useReducer;