import React, { Component, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import './contentSlider.scss'
import * as actions from "../store/actions";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import StarRatings from 'react-star-ratings';
import { getMoviesFromDB } from '../services/movieService';
import { useContainerDimensions } from './CustomHook/useContainerDimensions';
import { sizeResponsive } from '../untils';
// export const useContainerDimensions = myRef => {
//     const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

//     useEffect(() => {
//         const getDimensions = () => ({
//             width: myRef.current.offsetWidth,
//             height: myRef.current.offsetHeight
//         })

//         const handleResize = () => {
//             setDimensions(getDimensions())
//         }
//         window.addEventListener("resize", handleResize)
//         return () => {
//             window.removeEventListener("resize", handleResize)
//         }
//     }, [myRef])

//     return dimensions;
// };

function ContentSilder(props) {
    const [listMovie, setListMovie] = useState([])
    const [favor, setFavor] = useState(false)
    const container = useRef(null);
    const cSize = useContainerDimensions()
    const {typeSort, page, year, idName, hanldeWatchMovie}= props;
    const [settings, setSettings] = useState({
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 5,
        arrows: true,
    });
    // let settings = {
    //     speed: 500,
    //     slidesToShow: 5,
    //     slidesToScroll: 5,
    //     initialSlide: 5,
    //     arrows: true,
    // }
    useEffect(()=>{        
        switch(true){
        case (cSize.width >= sizeResponsive.lSize.width):
            console.log('Check: log 1');           
            setSettings({...settings,slidesToShow:5,slidesToScroll:5,initialSlide:5}) 
            break;
        case (cSize.width >= sizeResponsive.smSize.width && cSize.width <= sizeResponsive.lSize.width):
            console.log('Check: log 2');
           setSettings({...settings,slidesToShow:4,slidesToScroll:4,initialSlide:4})
            break;
        case ( cSize.width <= sizeResponsive.smSize.width):
            console.log('Check: log 3');
           setSettings({...settings,slidesToShow:3,slidesToScroll:3,initialSlide:3})
            break;
        default:
            break;
    }
    },[cSize.width])

    
    const { language, typeMovie } = useSelector(state => ({
        typeMovie: state.movie.typeMovie,
        language: state.app.language
    }))
    const fetchMovieList = async () => {
        let movieList = await getMoviesFromDB(typeMovie, typeSort, page, language, year);
        setListMovie(movieList)
    }
    useEffect(() => {
        fetchMovieList()
    }, [language,typeMovie]);

    return (
        <>
            <div className='content-list-main' ref={container}>
                <div className='name-section-movie'><FormattedMessage id={idName} /></div>
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
                                                <div className='watch-now' onClick={() => hanldeWatchMovie(item.id)}>
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