import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Movie/dMoviePage.scss'
import '../../components/input/ToogleBtn.scss'
import * as actions from "../../store/actions";
import StarRatings from 'react-star-ratings';
import HomeFooter from '../HomePage/HomeFooter'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import YouTube from 'react-youtube';
import Slider from 'react-slick';
import ReactModal from 'react-modal';
import HeaderMoviePage from '../Auth/Header/HeaderMoviePage';
import Menu from '../mainWatch/SideInfo/Menu/Menu';
import { getContentMovie } from '../../services/movieService';

function TVPage(props) {
    const [infoMovie, setInfoMovie] = useState({
        creditMovie: [],
        detailMovie: {},
    });
    const [ratingCont, setRatingCont] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [watchVid, setWatchVid] = useState({})
    const { language, detailMovie, videoMovie, creditMovie, side, typeMovie } = useSelector(state => (
        {
            language: state.app.language,
            detailMovie: state.movie.detailsMovie,
            videoMovie: state.movie.videoMovie,
            creditMovie: state.movie.creditMovie,
            side: state.app.side,
            typeMovie: state.movie.typeMovie
        }
    ))
    const dispatch = useDispatch();
    // console.log('check', detailMovie.seasons);
    useEffect(() => {
        document.body.style.overflow = side ? 'hidden' : 'unset';
    }, [side])
    useEffect(() => {
        dispatch(actions.fetchVideoMovie(props.match.params.id, language, 'tv'))
        dispatch(actions.fetchDetailMovie(props.match.params.id, language, 'tv'))
        dispatch(actions.fetchCreditMovie(props.match.params.id, language, 'tv'))
        getRating()
    }, [language])
    const hanldeWatchTVSeason = (id) => {
        dispatch(actions.setSideInfo(false))
        props.history.push(`/tv/${props.match.params.id}/season/${id}`)
        window.scrollTo(0, 0)
    }
    const handleOpenModal = (item) => {
        setShowModal(true);
        setWatchVid(item);
        // document.body.style.overflow = 'hidden';
    }
    const handleCloseModal = () => {
        setShowModal(false)
        // document.body.style.overflow = 'auto';
    }
    const handleBackHome = () => {
        dispatch(actions.setSideInfo(false))
        props.history.push('/home')
    }
    const getRating = async () => {
        const listRating = await getContentMovie(props.match.params.id, 'tv')
        if (listRating !== null) {
            const ratingMovie = listRating.filter((item) => {
                return item.iso_3166_1 == 'US'
            })
            // console.log(ratingMovie[0]);
            if (ratingMovie[0] != null) {
                setRatingCont(ratingMovie[0].rating)
            }
        }
        return ''
    }
    const getYear = (date) => {
        if (date != null) {
            var d = new Date(date).getFullYear()
            return d + ' -'
        }

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
    let year = new Date(detailMovie.first_air_date)
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
                                <div className='btn-watch' onClick={() => hanldeWatchTVSeason(1)}><i className="fas fa-play"></i>
                                    <FormattedMessage id='dMoviePage.watch' />
                                </div>
                            </div>
                            <div className='column-3-4'>
                                <div className='original-title'><h1>{detailMovie.original_name}</h1></div>
                                <div className='sub-title'>{detailMovie.name} (<a href='#'>{year.getFullYear()}</a>)</div>
                                <div className='rating-movie'>
                                    {ratingCont}
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
                                    <dt> <FormattedMessage id='dMoviePage.nation' /></dt>
                                    <dd className='csv'>
                                        <a href='#'>{detailMovie.origin_country}</a>
                                    </dd>
                                    <dt> <FormattedMessage id='dMoviePage.release-date' /></dt>
                                    <dd className='csv'>
                                        <a href='#'>{new Date(detailMovie.first_air_date).toLocaleDateString(language)}</a>
                                    </dd>
                                </dl>
                                <div className='overview'>
                                    {detailMovie.overview}
                                </div>
                                <div className='actor'>
                                    {creditMovie && creditMovie.cast && creditMovie.cast.length > 0 &&
                                        <div className='title-sec'>
                                            <FormattedMessage id='dMoviePage.actor' />
                                        </div>
                                    }
                                    <div className='list'>
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
                                    {videoMovie && videoMovie.length > 0 &&
                                        <div className='title-sec'>
                                            <FormattedMessage id='dMoviePage.trailer' />
                                        </div>
                                    }
                                    <div className='list'>
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
                                <div className='season'>
                                    <div className='title-sec'>
                                        <FormattedMessage id='dMoviePage.season' />
                                    </div>
                                    <div className='list'>
                                        {detailMovie && detailMovie.seasons && detailMovie.seasons.length > 0 &&
                                            detailMovie.seasons.map((item, index) => {
                                                return (
                                                    <div className='container-season'>
                                                        <div className='poster-season' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.poster_path})` }}
                                                            onClick={() => hanldeWatchTVSeason(item.season_number)}
                                                        ></div>
                                                        <div className='content-season'>
                                                            <div className='season-number'><FormattedMessage id='dMoviePage.part' /> {item.season_number}</div>
                                                            <div className='detail-season'> {getYear(item.air_date)}  {item.episode_count} <FormattedMessage id='dMoviePage.ep' /></div>
                                                            {item.air_date == null ?
                                                                <div className='detail-season'><FormattedMessage id='dMoviePage.non-release' /></div>
                                                                :
                                                                <div className='detail-season'> <FormattedMessage id='dMoviePage.part' /> {item.season_number} <FormattedMessage id='dMoviePage.of' /> {detailMovie.name} <FormattedMessage id='dMoviePage.release' /> {item.air_date}</div>
                                                            }

                                                        </div>
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {side === true &&
                    <div className='container-modal' onClick={() => dispatch(actions.setSideInfo(!side))}>
                    </div>
                }
                <div className={side === true ? 'body-modal' : 'body-modal trans'} >
                    <div className='content-up'>
                        <div className='btn-menu col-1' onClick={() => dispatch(actions.setSideInfo(!side))} >
                            <i className="fas fa-bars"></i>
                        </div>
                        <div className='name-brand col-4' onClick={() => handleBackHome()}>
                        </div>
                    </div>
                    <div className='content-down'>
                        <Menu></Menu>
                    </div>
                </div>
            </div >
            <div className='modal'>
                <ReactModal
                    isOpen={showModal}
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
            <HomeFooter />
        </>
    )
}
export default withRouter(TVPage);