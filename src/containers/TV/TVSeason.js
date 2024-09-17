import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Movie/dMoviePage.scss'
import '../../components/input/ToogleBtn.scss'
import * as actions from "../../store/actions";
import StarRatings from 'react-star-ratings';
import HomeFooter from '../HomePage/HomeFooter'
import { FormattedMessage, useIntl } from 'react-intl';
import { withRouter } from 'react-router';
import Slider from 'react-slick';
import HeaderMoviePage from '../Auth/Header/HeaderMoviePage';
import Menu from '../mainWatch/SideInfo/Menu/Menu';
import { getContentMovie, getSeasonDetail } from '../../services/movieService';
import moment from 'moment/moment';
import { LANGUAGES } from '../../untils';
function TVSeason(props) {
    const [infoMovie, setInfoMovie] = useState({
        creditMovie: [],
        detailSeason: {},
    });
    // const [detailSeason, setDetailSeason] = useState({})
    const [ratingCont, setRatingCont] = useState('')
    const { language, creditMovie, side, typeMovie, detailMovie, detailSeason } = useSelector(state => (
        {
            language: state.app.language,
            creditMovie: state.movie.creditMovie,
            side: state.app.side,
            typeMovie: state.movie.typeMovie,
            detailMovie: state.movie.detailsMovie,
            detailSeason: state.movie.detailSeason
        }
    ))
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchCreditMovie(props.match.params.id, language, 'tv'))
        dispatch(actions.fetchDetailMovie(props.match.params.id, language, 'tv'))
        dispatch(actions.fetchDetailSeason(props.match.params.idSeason, props.match.params.id, language))
        getRating()
    }, [language])
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
            if (ratingMovie[0] != null) {
                setRatingCont(ratingMovie[0].rating)
            }
        }
        return ''
    }
    const hanldeWatchMovie = (idSeason, id) => {
        props.history.push(`${idSeason}/ep/${id}`)
        window.scrollTo(0, 0)
    }
    const checkS = (time) => {
        if (language == LANGUAGES.EN) {
            if (time > 1) {
                return 's'
            }
            else {
                return ''
            }
        } else {
            return ''
        }
    }
    const GetTime = (runtime) => {
        const m = useIntl().formatMessage({ id: 'dMoviePage.minutes' })
        const h = useIntl().formatMessage({ id: 'dMoviePage.hours' })
        if (runtime < 60) {
            return runtime + ' ' + m + checkS(runtime)
        } else {
            let timeHour = moment().startOf('day').add(runtime, 'minutes').format(`hh`);
            let timeMinute = moment().startOf('day').add(runtime, 'minutes').format(`mm`);
            return timeHour + ' ' + h + checkS(timeHour) + " " + timeMinute + " " + m + checkS(timeMinute)
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
    // console.log(detailSeason.vote_average);
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
                                <div className='poster-movie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${detailSeason.poster_path})` }}></div>
                                <div className='btn-watch' onClick={() => hanldeWatchMovie(detailSeason.season_number, 1)}><i className="fas fa-play"></i>
                                    <FormattedMessage id='dMoviePage.watch' />
                                </div>
                            </div>
                            <div className='column-3-4'>
                                <div className='original-title'><h1>{detailMovie.original_name} - {detailSeason.name}</h1></div>
                                <div className='sub-title'>
                                    {detailMovie.name}{' '}
                                    (<FormattedMessage id='dMoviePage.season' /> {detailSeason.season_number})
                                    (<a href='#'>{new Date(detailSeason.air_date).getFullYear()}</a>)
                                </div>
                                <div className='rating-movie'>
                                    {ratingCont}
                                </div>
                                <div className='imdb-movie'>
                                    {detailSeason.vote_average / 2 > 0 ?
                                        <StarRatings
                                            rating={detailSeason.vote_average / 2}
                                            starDimension="30px"
                                            starSpacing="2px"
                                            starRatedColor="#07b8a0"
                                        />
                                        :
                                        <br />
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
                                        {detailSeason && detailSeason.genres && detailSeason.genres.length > 0 &&
                                            detailSeason.genres.map((item, index) => {
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
                                        <a href='#'>{new Date(detailSeason.air_date).toLocaleDateString(language)}</a>
                                    </dd>
                                </dl>
                                <div className='overview'>
                                    {detailSeason.overview}
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
                                <div className='ep'>
                                    <div className='title-sec'>
                                        <FormattedMessage id='dMoviePage.ep' />
                                    </div>
                                    <div className='list'>
                                        {detailSeason && detailSeason.episodes && detailSeason.episodes.length > 0 &&
                                            detailSeason.episodes.map((item, index) => {
                                                if (item.runtime !== null) {
                                                    return (
                                                        <div className='container-ep'>
                                                            <div className='poster-ep' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.still_path})` }}></div>
                                                            <div className='content-ep'>
                                                                <div className='ep-number'><FormattedMessage id='dMoviePage.ep' /> {item.episode_number}: {item.name}</div>
                                                                {item.air_date == null ?
                                                                    <div className='detail-ep'><FormattedMessage id='dMoviePage.non-release' /></div>
                                                                    :
                                                                    <div className='detail-ep'>{new Date(item.air_date).toLocaleDateString(language)}</div>
                                                                }
                                                                <div className='detail-ep'>{GetTime(item.runtime)}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <HomeFooter />
        </>
    )
}
export default withRouter(TVSeason);