import React, { Component, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './dMoviePage.scss'
import '../../components/input/ToogleBtn.scss'
import * as actions from "../../store/actions";
import StarRatings from 'react-star-ratings';
import HomeFooter from '../HomePage/HomeFooter'
import { ApiKey, LANGUAGES } from '../../untils'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import YouTube from 'react-youtube';
import Slider from 'react-slick';
import moment from 'moment/moment';
import ReactModal from 'react-modal';
import HeaderMoviePage from '../Auth/Header/HeaderMoviePage';
import Menu from '../mainWatch/SideInfo/Menu/Menu';
function DMoviePage(props) {
    const [infoMovie, setInfoMovie] = useState({
        creditMovie: [],
        detailMovie: {}
    });
    const [showModal, setShowModal] = useState(false)
    const [watchVid, setWatchVid] = useState({})
    const { detailMovie, videoMovie, creditMovie } = props

    useEffect(() => {
        props.fetchVideoMovie(props.match.params.id, props.language)
        props.fetchDetailMovie(props.match.params.id, props.language)
        props.fetchCreditMovie(props.match.params.id, props.language)
        // console.log('check props', props);
    }, [])
    useEffect(() => {
        props.fetchVideoMovie(props.match.params.id, props.language)
        props.fetchDetailMovie(props.match.params.id, props.language)
        props.fetchCreditMovie(props.match.params.id, props.language)
    }, [props.language])

    const hanldeWatchMovie = () => {
        props.history.push(`/wMovie/${props.match.params.id}`)
    }
    const checkS = (hour) => {
        if (props.language === LANGUAGES.EN) {
            if (hour > 1) {
                return 's'
            }
        }
    }
    const searchCredit = (role) => {
        let director = ''
        if (creditMovie && creditMovie.crew && creditMovie.crew.length > 0) {
            director = creditMovie.crew.find((e) => {
                return e.department === role
            })
        }
        return director.name
    }
    const handleOpenModal = (item) => {
        setShowModal(true);
        setWatchVid(item);
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    let settings = {
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: false,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1324,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 932,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };
    let settingsTrailer = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    let opts = {
        height: '585',
        width: '960',
        playerVars: {
            autoplay: 1,
        },
    }
    let year = new Date(detailMovie.release_date)
    let timeHour = moment().startOf('day').add(detailMovie.runtime, 'minutes').format(`hh`);
    let timeMinute = moment().startOf('day').add(detailMovie.runtime, 'minutes').format(`mm`);
    let rating = detailMovie.vote_average / 2;
    return (
        <>
            <div className='container-dMovie'>
                <HeaderMoviePage />
                <div className='body-dMovie'>
                    <div className='banner-dMovie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${detailMovie.backdrop_path})` }}>
                    </div>
                    <div className='section-dMovie'>
                        <div className='container sectionMovie'>
                            <div className='column-1-4'>
                                <div className='poster-movie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${detailMovie.poster_path})` }}></div>
                                <div className='btn-watch' onClick={() => hanldeWatchMovie()}><i className="fas fa-play"></i>
                                    <FormattedMessage id='dMoviePage.watch' />
                                </div>
                            </div>
                            <div className='column-3-4'>
                                <div className='original-title'><h1>{detailMovie.original_title}</h1></div>
                                <div className='sub-title'>{detailMovie.title} (<a href='#'>{year.getFullYear()}</a>)</div>
                                <div className='runtime-movie'>
                                    {timeHour} <FormattedMessage id='dMoviePage.hours' />{checkS(timeHour)} {timeMinute} <FormattedMessage id='dMoviePage.minutes' />
                                </div>
                                <div className='imdb-movie'>
                                    {rating && rating &&
                                        <StarRatings
                                            rating={rating}
                                            starDimension="30px"
                                            starSpacing="2px"
                                            starRatedColor="#07b8a0"
                                        />
                                    }
                                </div>
                                <div className='level-genres'>
                                    <div className='btn-list'>
                                        <div className='btn-share'><i className="fab fa-facebook-square"></i>
                                            <FormattedMessage id='dMoviePage.share' />
                                        </div>
                                        <div className='btn-addList'>
                                            <i className="fas fa-plus"></i>  <FormattedMessage id='dMoviePage.watchlist' />
                                        </div>
                                    </div>
                                    <div className='list-genres'>
                                        {detailMovie && detailMovie.genres && detailMovie.genres.length > 0 &&
                                            detailMovie.genres.map((item, index) => {
                                                return (
                                                    <div className='item-genres'>{item.name}</div>
                                                )
                                            })

                                        }

                                    </div>
                                </div>
                                <dl className='info-movie'>
                                    <dt> <FormattedMessage id='dMoviePage.director' /></dt>
                                    <dd className='csv'>
                                        <a href='#'>{searchCredit("Directing")}</a>
                                    </dd>
                                    <dt> <FormattedMessage id='dMoviePage.writer' /></dt>
                                    <dd className='csv'>
                                        <a href='#'>{searchCredit("Directing")}</a>
                                    </dd>
                                    <dt> <FormattedMessage id='dMoviePage.nation' /></dt>
                                    <dd className='csv'>
                                        <a href='#'>{detailMovie.origin_country}</a>
                                    </dd>
                                    <dt> <FormattedMessage id='dMoviePage.release-date' /></dt>
                                    <dd className='csv'>
                                        <a href='#'>{detailMovie.release_date}</a>
                                    </dd>
                                </dl>
                                <div className='overview'>
                                    {detailMovie.overview}
                                </div>
                                <div className='actor'>
                                    <div className='title-actor'>
                                        <FormattedMessage id='dMoviePage.actor' />
                                    </div>
                                    <div className='cast'>
                                        <Slider {...settings}>
                                            {creditMovie && creditMovie.cast && creditMovie.cast.length > 0 &&
                                                creditMovie.cast.map((item, index) => {
                                                    if (index < 20) {
                                                        if (item.profile_path) {
                                                            return (
                                                                <div className='container-list-actor' key={index}>
                                                                    <div className='img-actor'
                                                                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.profile_path})` }} >
                                                                    </div>
                                                                    <div className='name-actor'>
                                                                        <a href='#'>{item.name}</a>
                                                                    </div>
                                                                    <div className='name-character'>
                                                                        {item.character}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <div className='container-list-actor' key={index}>
                                                                    <div className='img-actor none'>
                                                                        <i class="fas fa-user"></i>
                                                                    </div>
                                                                    <div className='name-actor'>
                                                                        <a href='#'>{item.name}</a>
                                                                    </div>
                                                                    <div className='name-character'>
                                                                        {item.character}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                })
                                            }
                                        </Slider>
                                    </div>
                                </div>
                                <div className='trailer'>
                                    <div className='title-trailer'>
                                        <FormattedMessage id='dMoviePage.trailer' />
                                    </div>
                                    <div className='trailer-list'>
                                        <Slider {...settingsTrailer}>
                                            {videoMovie && videoMovie.length > 0 &&
                                                videoMovie.map((item, index) => {
                                                    if (index < 20) {
                                                        return (
                                                            <div className='container-list-videoM' onClick={() => handleOpenModal(item)}>
                                                                <div className='img-video'
                                                                    style={{ backgroundImage: `url(https://img.youtube.com/vi/${item.key}/mqdefault.jpg)` }}>
                                                                    <div className='play-video'><i className="fas fa-play" /></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='modal-menu'>
                    <Menu></Menu>
                </div> */}
            </div >
            <div className='modal'>
                <ReactModal
                    isOpen={showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <div className='close' onClick={handleCloseModal}><i className="fas fa-times"></i></div>
                    {watchVid && watchVid.key &&
                        <YouTube
                            videoId={watchVid.key}
                            opts={opts}
                        />
                    }
                </ReactModal>
            </div>
            <ReactModal
                isOpen={props.side}
                onRequestClose={() => props.setSide(!props.side)}
                shouldCloseOnOverlayClick={true}
                className="Modal-side"
                overlayClassName="Overlay"
            >
                <Menu></Menu>
            </ReactModal>
            <HomeFooter />
        </>
    )
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailMovie: state.movie.detailsMovie,
        videoMovie: state.movie.videoMovie,
        creditMovie: state.movie.creditMovie,
        side: state.app.side
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        fetchDetailMovie: (id, language) => dispatch(actions.fetchDetailMovie(id, language)),
        fetchVideoMovie: (id, language) => dispatch(actions.fetchVideoMovie(id, language)),
        fetchCreditMovie: (id, language) => dispatch(actions.fetchCreditMovie(id, language)),
        setSide: (side) => dispatch(actions.setSideInfo(side))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DMoviePage));