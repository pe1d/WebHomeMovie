// import axios from "../axios"
import { ApiKey } from '../untils';
//popularity.desc
const getMoviesFromDB = (typeSort, page, language, year) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false
            &language=${language}&page=${page}&sort_by=${typeSort}&vote_count.gte=1000&year=${year}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${ApiKey.TokenAuth}`
                }
            };

            return await fetch(url, options)
                .then(res => res.json())
                .then(json => resolve(json.results))
                .catch(err => reject('error:' + err));
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailMovieFromDB = (id, language) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/movie/${id}?language=${language}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${ApiKey.TokenAuth}`
                }
            };

            fetch(url, options)
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(err => console.error('error:' + err));
        } catch (e) {
            reject(e)
        }
    })

}
const getVideoMovieFromDB = (id, language) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=${language}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${ApiKey.TokenAuth}`
                }
            };

            fetch(url, options)
                .then(res => res.json())
                .then(json => resolve(json.results))
                .catch(err => reject(err));
        } catch (e) {
            reject(e)
        }
    })
}
const getGenresMovie = (language) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/genre/movie/list?language=${language}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${ApiKey.TokenAuth}`
                }
            };

            fetch(url, options)
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(err => console.error('error:' + err));
        } catch (e) {
            reject(e)
        }
    })
}
const getCreditMovie = (id, language) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=${language}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${ApiKey.TokenAuth}`
                }
            };

            fetch(url, options)
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(err => console.error('error:' + err));
        } catch (e) {
            reject(e)
        }
    })

}
export {
    getMoviesFromDB, getDetailMovieFromDB,
    getVideoMovieFromDB, getGenresMovie,
    getCreditMovie
}