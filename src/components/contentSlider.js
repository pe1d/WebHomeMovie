import React, { Component, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import './contentSlider.scss'
import * as actions from "../store/actions";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import StarRatings from 'react-star-ratings';
import { getMoviesFromDB } from '../services/movieService';
export const useContainerDimensions = myRef => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const getDimensions = () => ({
            width: myRef.current.offsetWidth,
            height: myRef.current.offsetHeight
        })

        const handleResize = () => {
            setDimensions(getDimensions())
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [myRef])

    return dimensions;
};

function ContentSilder(props) {
    const [listMovie, setListMovie] = useState([])
    const [favor, setFavor] = useState(false)
    const container = useRef(null);
    const cSize = useContainerDimensions(container)
    const [settings, setSettings] = useState({
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 5,
        arrows: true,
    })
    const { language, typeMovie } = useSelector(state => ({
        typeMovie: state.movie.typeMovie,
        language: state.app.language
    }))
    const fetchMovieList = useCallback(async () => {
        let movieList = await getMoviesFromDB(typeMovie, props.typeSort, props.page, language, props.year);
        setListMovie(movieList)
    })

    const checkSettings = (width) => {
        let i = 0;
        if (width > 270) {
            console.log("check i", (width / 270).toFixed(0));
            i = (width / 270).toFixed(0);
        }
        setSettings({ ...settings, slidesToShow: parseInt(i), slidesToScroll: parseInt(i), initialSlide: parseInt(i) })
    }
    useEffect(() => {
        let inorge = false;
        fetchMovieList()
        return () => { inorge = true }
    }, [language, typeMovie]);
    const slider = container.current;
    // useEffect(() => {
    //     //console.log(container);
    //     // console.log(slide.offsetWidth);
    //     checkSettings(cSize.width)
    //     console.log("Check size:", cSize.width);
    //     console.log("Check settings: ", settings);

    // }, [cSize.width])

    return (
        <>
            <div className='content-list-main' ref={container}>
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