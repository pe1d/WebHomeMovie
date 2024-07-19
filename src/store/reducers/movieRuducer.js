import actionTypes from '../actions/actionTypes';

const initialState = {
    movieList: [],
    movieListTopRated: [],
    detailsMovie: {},
    videoMovie: [],
    genresMovie: [],
    creditMovie: []
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIE_SUCCESS:
            return {
                ...state,
                movieList: action.data
            }
        case actionTypes.FETCH_MOVIE_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_MOVIE_TOP_RATED_SUCCESS:
            return {
                ...state,
                movieListTopRated: action.data
            }
        case actionTypes.FETCH_MOVIE_TOP_RATED_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_MOVIE_SUCCESS:
            return {
                ...state,
                detailsMovie: action.data
            }
        case actionTypes.FETCH_DETAIL_MOVIE_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_VIDEO_MOVIE_SUCCESS:
            return {
                ...state,
                videoMovie: action.data
            }
        case actionTypes.FETCH_VIDEO_MOVIE_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENRES_MOVIE_SUCCESS:
            return {
                ...state,
                genresMovie: action.data
            }
        case actionTypes.FETCH_GENRES_MOVIE_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_CREDIT_MOVIE_SUCCESS:
            return {
                ...state,
                creditMovie: action.data
            }
        case actionTypes.FETCH_CREDIT_MOVIE_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default movieReducer;