// import axios from "../axios"
import { ApiKey } from '../untils';
//popularity.desc
const getMoviesFromDB = (typeMovie, typeSort, page, language, year) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fetch = require('node-fetch');
            const url = `https://api.themoviedb.org/3/${typeMovie}/${typeSort}?&language=${language}&page=${page}`;
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
const getDetailMovieFromDB = (id, language, typeMovie) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/${typeMovie}/${id}?language=${language}`;
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
const getVideoMovieFromDB = (id, language, typeMovie) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/${typeMovie}/${id}/videos?language=${language}`;
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
const getCreditMovie = (id, language, typeMovie) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/${typeMovie}/${id}/credits?language=${language}`;
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
const getReconmmendMovie = (id, language, typeMovie) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=${language}&page=1`;
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
const getContentMovie = (id, typeMovie) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/tv/${id}/content_ratings`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGM3ODJmNjFhZWViZWFkNTJkOGNiMGZkMDI2YzBmNSIsInN1YiI6IjY2MTdmOWFkZTI5NWI0MDE3ZGFmYTI4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JVW04mo4eC1d8cXUUDD9C_24mRnpbFLUqg0HvViAZ6g'
                }
            };

            fetch(url, options)
                .then(res => res.json())
                .then(json => resolve(json.results))
                .catch(err => console.error('error:' + err));
        } catch (e) {
            reject(e)
        }
    })
}
export {
    getMoviesFromDB, getDetailMovieFromDB,
    getVideoMovieFromDB, getGenresMovie,
    getCreditMovie, getReconmmendMovie,
    getContentMovie
}