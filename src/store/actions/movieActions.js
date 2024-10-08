import actionTypes from "./actionTypes";
import {
    getMoviesFromDB, getDetailMovieFromDB, getVideoMovieFromDB,
    getGenresMovie, getCreditMovie,
    getReconmmendMovie, getSeasonDetail
} from "../../services/movieService";

export const fetchMovie = (typeSort, page, language, year) => {
    return async (dispatch, getState) => {
        try {
            let res = await getMoviesFromDB(typeSort, page, language, year)
            // console.log("Check res: ", res);
            if (res) {
                dispatch(fetchMovieSuccess(res))
            } else {
                dispatch(fetchMovieFail())
            }
        } catch (e) {
            console.log("fetchMovieFail code error: ", e);
            dispatch(fetchMovieFail())
        }
    }
}
export const fetchMovieSuccess = (data) => ({
    type: actionTypes.FETCH_MOVIE_SUCCESS,
    data: data
})
export const fetchMovieFail = () => ({
    type: actionTypes.FETCH_MOVIE_FAIL,
})
//Video Movie
export const fetchVideoMovie = (id, language, typeMovie) => {
    return async (dispatch, getState) => {
        try {

            let res = await getVideoMovieFromDB(id, language, typeMovie)
            // console.log("check res", res);
            if (res) {
                dispatch(fetchVideoMovieSuccess(res))
            } else {
                dispatch(fetchVideoMovieFail())
            }
        } catch (e) {
            console.log("fetchVideoMovieFail code error: ", e);
            dispatch(fetchVideoMovieFail())
        }
    }
}
export const fetchVideoMovieSuccess = (res) => ({
    type: actionTypes.FETCH_VIDEO_MOVIE_SUCCESS,
    data: res
})

export const fetchVideoMovieFail = () => ({
    type: actionTypes.FETCH_VIDEO_MOVIE_FAIL,
})
//Detail Movie
export const fetchDetailMovie = (id, language, typeMovie) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailMovieFromDB(id, language, typeMovie)
            // console.log("Check res: ", res);
            if (res) {
                dispatch(fetchDetailMovieSuccess(res))
            } else {
                dispatch(fetchDetailMovieFail())
            }
        } catch (e) {
            console.log("fetchDetailMovieFail code error: ", e);
            dispatch(fetchDetailMovieFail())
        }
    }
}
export const fetchDetailMovieSuccess = (res) => ({
    type: actionTypes.FETCH_DETAIL_MOVIE_SUCCESS,
    data: res
})
export const fetchDetailMovieFail = () => ({
    type: actionTypes.FETCH_DETAIL_MOVIE_FAIL,
})
//Genres Movie
export const fetchGenresMovie = (language) => {
    return async (dispatch, getState) => {
        try {
            let res = await getGenresMovie(language)
            // console.log("Check res: ", res);
            if (res) {
                dispatch(fetchGenresMovieSuccess(res))
            } else {
                dispatch(fetchGenresMovieFail())
            }
        } catch (e) {
            console.log("fetchGenresMovieFail code error: ", e);
            dispatch(fetchGenresMovieFail())
        }
    }
}
export const fetchGenresMovieSuccess = (res) => ({
    type: actionTypes.FETCH_GENRES_MOVIE_SUCCESS,
    data: res
})
export const fetchGenresMovieFail = () => ({
    type: actionTypes.FETCH_GENRES_MOVIE_FAIL,
})
//Credit Movie
export const fetchCreditMovie = (id, language, typeMovie) => {
    return async (dispatch, getState) => {
        try {
            let res = await getCreditMovie(id, language, typeMovie)
            // console.log("Check res: ", res);
            if (res) {
                dispatch(fetchCreditMovieSuccess(res))
            } else {
                dispatch(fetchCreditMovieFail())
            }
        } catch (e) {
            console.log("fetchCreditMovieFail code error: ", e);
            dispatch(fetchCreditMovieFail())
        }
    }
}
export const fetchCreditMovieSuccess = (res) => ({
    type: actionTypes.FETCH_CREDIT_MOVIE_SUCCESS,
    data: res
})
export const fetchCreditMovieFail = () => ({
    type: actionTypes.FETCH_CREDIT_MOVIE_FAIL,
})
//recommend movie
export const fetchRecommendMovie = (id, language, typeMovie) => {
    return async (dispatch, getState) => {
        try {
            let res = await getReconmmendMovie(id, language, typeMovie)
            // console.log("Check res: ", res.results);
            if (res) {
                dispatch(fetchRecommendMovieSuccess(res.results))
            } else {
                dispatch(fetchRecommendMovieFail())
            }
        } catch (e) {
            console.log("fetchCreditMovieFail code error: ", e);
            dispatch(fetchCreditMovieFail())
        }
    }
}
export const fetchRecommendMovieSuccess = (res) => ({
    type: actionTypes.FETCH_RECOMMEND_MOVIE_SUCCESS,
    data: res
})
export const fetchRecommendMovieFail = () => ({
    type: actionTypes.FETCH_RECOMMEND_MOVIE_FAIL,
})
//detail season
export const fetchDetailSeason = (idSeason, idTV, language) => {
    return async (dispatch, getState) => {
        try {
            let res = await getSeasonDetail(idSeason, idTV, language)
            console.log("Check res: ", res);
            if (res) {
                dispatch(fetchDetailSeasonSuccess(res))
            } else {
                dispatch(fetchDetailSeasonFail())
            }
        } catch (e) {
            console.log("fetchDetailSeasonFail code error: ", e);
            dispatch(fetchCreditMovieFail())
        }
    }
}
export const fetchDetailSeasonSuccess = (res) => ({
    type: actionTypes.FETCH_DETAIL_TV_SUCCESS,
    data: res
})
export const fetchDetailSeasonFail = () => ({
    type: actionTypes.FETCH_DETAIL_TV_FAIL,
})
//Set Type
export const setTypeMovie = (typeMovie) => ({
    type: actionTypes.CHANGE_MOVIE_TYPE,
    typeMovie: typeMovie
})