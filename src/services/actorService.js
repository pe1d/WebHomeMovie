import { lang } from "moment";
import { ApiKey } from "../untils";

const fetchListActor = (lang, page) => {
    return new Promise((resolve, reject) => {
        const fetch = require('node-fetch');

        const url = `https://api.themoviedb.org/3/person/popular?language=${lang}&page=${page}`;
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
const fetchDetailActor = (id, lang) => {
    return new Promise((resolve, reject) => {
        const fetch = require('node-fetch');

        const url = `https://api.themoviedb.org/3/person/${id}?language=${lang}`;
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
    fetchListActor, fetchDetailActor
}