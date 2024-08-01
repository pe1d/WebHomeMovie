import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './ListMain.scss'
import * as actions from "../../../store/actions";
import StarRatings from 'react-star-ratings';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import ContentSlider from '../../../components/contentSlider';
import { getMoviesFromDB } from '../../../services/movieService';
function ListMain(props) {
    var settings_banner = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 10000,
        dots: false,
    };
    const [user, setUser] = useState({
        userName: '',
        password: ''
    })
    const [errMessage, setErrMessage] = useState('')
    const [listMovie, setListMovie] = useState([])
    const [favor, setFavor] = useState(false)
    const { language, typeMovie } = useSelector(state => (
        {
            language: state.app.language,
            typeMovie: state.movie.typeMovie
        }
    ))
    const dispatch = useDispatch()
    const fetchMovieList = async () => {
        let movie = await getMoviesFromDB(typeMovie, `${typeMovie == 'tv' ? "top_rated" : "now_playing"}`, 1, language, 2024)
        setListMovie(movie)
    }
    useEffect(() => {
        fetchMovieList()
    }, [language, typeMovie])
    const hanldeWatchMovie = (id) => {
        dispatch(actions.setSideInfo(false))
        window.scrollTo(0, 0)
        props.history.push(`/${typeMovie}/${id}`)
    }
    return (
        <>
            <div className='container-list-main'>
                <div className='banner-list-main'>
                    <Slider {...settings_banner}>
                        {listMovie && listMovie.length > 0 &&
                            listMovie.map((item, index) => {
                                if (index < 5)
                                    return (
                                        <div>
                                            <div className='banner-movie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }} key={index}>
                                                <div className='name-film'>
                                                    {item.title || item.name}
                                                </div>
                                                <div className='vote-average'>
                                                    <StarRatings
                                                        rating={item.vote_average / 2}
                                                        starDimension="36px"
                                                        starSpacing="2px"
                                                        starRatedColor="#07b8a0"
                                                    />
                                                </div>
                                                <div className='button-watch'>
                                                    <div className='content-left'>
                                                        <div className='watch-list'>
                                                            <i className="fas fa-plus"></i>
                                                            <FormattedMessage id='main.banner.btn-watchlist' />
                                                        </div>
                                                        <div className='favorites-list' onClick={() => setFavor(!favor)}>
                                                            {favor === false ?
                                                                <i class="far fa-heart"></i>
                                                                :
                                                                <i class="fas fa-heart"></i>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='watch' onClick={() => hanldeWatchMovie(item.id)}>
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
                <ContentSlider
                    idName='main.content.popular-movies'
                    typeSort='popular'
                    page='1'
                    year='2024'
                    hanldeWatchMovie={hanldeWatchMovie}
                />
                <ContentSlider
                    idName='main.content.toprated-movies'
                    typeSort='top_rated'
                    page='1'
                    year='2024'
                    hanldeWatchMovie={hanldeWatchMovie}
                />
                <ContentSlider
                    idName='main.content.topwatch-movies'
                    typeSort={`${typeMovie == 'tv' ? "airing_today" : "upcoming"}`}
                    page='1'
                    year='2024'
                    hanldeWatchMovie={hanldeWatchMovie}
                />
            </div>
        </>
    )
}


export default withRouter(ListMain);