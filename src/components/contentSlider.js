import React, { Component, Fragment, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import './contentSlider.scss'
import * as actions from "../store/actions";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import StarRatings from 'react-star-ratings';
import { getMoviesFromDB } from '../services/movieService';
function ContentSilder(props) {
    const [listMovie, setListMovie] = useState([])
    const [favor, setFavor] = useState(false)
    var settings = {
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false,
        responsive: [
            {
                breakpoint: 1680,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 860,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };
    const { language, typeMovie } = useSelector(state => ({
        typeMovie: state.movie.typeMovie,
        language: state.app.language
    }))
    const fetchMovieList = async () => {
        let movieList = await getMoviesFromDB(typeMovie, props.typeSort, props.page, language, props.year);
        setListMovie(movieList)
    }
    useEffect(() => {
        fetchMovieList()
    }, [language, typeMovie]);
    return (
        <>
            <div className='content-list-main'>
                <div className='name-section-movie'><FormattedMessage id={props.idName} /></div>
                <Slider {...settings}>
                    {listMovie && listMovie.length > 0 &&
                        listMovie.map((item, index) => {
                            if (index < 10)
                                return (
                                    <div>
                                        <div className='section-movie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }} key={index}>
                                            <div className='content-up'>
                                                <div className='name-film'>{item.title || item.name}</div>
                                                <div className='vote-average'>
                                                    <StarRatings
                                                        rating={item.vote_average / 2}
                                                        starDimension="18px"
                                                        starSpacing="2px"
                                                        starRatedColor="#07b8a0"
                                                    />
                                                </div>
                                            </div>
                                            <div className='content-down'>
                                                <div className='favorites-list'>
                                                    {favor === false ?
                                                        <i class="far fa-heart"></i>
                                                        :
                                                        <i class="fas fa-heart"></i>
                                                    }
                                                </div>
                                                <div className='watch-now' onClick={() => props.hanldeWatchMovie(item.id)}>
                                                    <FormattedMessage id='main.banner.btn-watch' />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                        })
                    }
                </Slider>
            </div>
        </>
    )
}

export default ContentSilder;