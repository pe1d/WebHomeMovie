import actionTypes from '../actions/actionTypes';

const initialState = {
    started: true,
    language: 'vi',
    side: false,
    systemMenuPath: '/home/watch',
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE:
            return {
                ...state,
                started: true
            }
        case actionTypes.CHANGE_LANGUAGE:
            // console.log(">>>>Check redux: ", action)
            return {
                ...state,
                language: action.language,
            }
        case actionTypes.SET_SIDE:
            return {
                ...state,
                side: action.side,
            }
        default:
            return state;
    }
}

export default appReducer;