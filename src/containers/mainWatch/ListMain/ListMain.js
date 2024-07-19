import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ListMain.scss'
import * as actions from "../../../store/actions";
import { ApiKey } from '../../../untils';
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
    const fetchMovieList = async () => {
        let movie = await getMoviesFromDB('popularity.desc', 1, props.language, 2024)
        setListMovie(movie)
    }
    useEffect(() => {
        fetchMovieList()
    }, [])
    useEffect(() => {
        fetchMovieList()
    }, [props.language])
    const hanldeWatchMovie = (id) => {
        // alert('Movie id: ' + id)
        props.history.push(`/dMovie/${id}`)
    }
    return (
        <>
            <div className='container-list-main'>
                <div className='header-list-main'>

                </div>
                <div className='banner-list-main'>
                    <Slider {...settings_banner}>
                        {listMovie && listMovie.length > 0 &&
                            listMovie.map((item, index) => {
                                if (index < 3)
                                    return (
                                        <div>
                                            <div className='banner-movie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }} key={index}>
                                                <div className='name-film'>{item.title}</div>
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
                    typeSort='popularity.desc'
                    page='1'
                    year='2024'
                    hanldeWatchMovie={hanldeWatchMovie}
                />
                <ContentSlider
                    idName='main.content.toprated-movies'
                    typeSort='vote_average.desc'
                    page='1'
                    year='2024'
                    hanldeWatchMovie={hanldeWatchMovie}
                />
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        movieList: state.movie.movieList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        fetchMovie: (typeSort, page, language, year) => dispatch(actions.fetchMovie(typeSort, page, language, year)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListMain));