// import axios from "../axios"
import axios from 'axios';
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
                    Authorization: `Bearer ${ApiKey.TokenAuth}`
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
const getSeasonDetail = (idSeason, idTV, language) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/tv/${idTV}/season/${idSeason}?language=${language}`;
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
const getMovieWatch = (slug) => {
    return axios.get(`https://ophim1.com/phim/${slug}`)
}
const getMovieSearch = (str, language) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/search/multi?query=${str}&include_adult=true&language=${language}&page=1`;
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
        } catch (error) {
            reject(error)
        }
    })
}
const getCountriesMovie = (lang) => {
    return new Promise((resolve, reject) => {
        try {
            const fetch = require('node-fetch');

            const url = `https://api.themoviedb.org/3/configuration/countries?language=${lang}`;
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
                .catch(err => reject('error:' + err));
        } catch (error) {
            reject(error)
        }
    })
}
const getDiscoverMovie = (typeMovie, genres, nation, year, time, sort, lang, page) => {
    return new Promise((resolve, reject) => {
        const fetch = require('node-fetch');

        const url = `https://api.themoviedb.org/3/discover/${typeMovie}?include_adult=false&include_video=false&language=${lang}&page=${page}&sort_by=${sort}&with_genres=${genres}&with_origin_country=${nation}&with_runtime.gte=${time.GTE}&with_runtime.lte=${time.LTE}&year=${year}`;
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
            .catch(err => reject('error:' + err));
    })
}
export {
    getMoviesFromDB, getDetailMovieFromDB,
    getVideoMovieFromDB, getGenresMovie,
    getCreditMovie, getReconmmendMovie,
    getContentMovie, getSeasonDetail,
    getMovieWatch, getMovieSearch,
    getCountriesMovie, getDiscoverMovie
}