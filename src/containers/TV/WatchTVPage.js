import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Movie/watchMoviePage.scss'
import './tv.scss'
import * as actions from "../../store/actions";
import HomeFooter from '../HomePage/HomeFooter'
import { withRouter } from 'react-router';
import ReactPlayer from 'react-player';
import HeaderMoviePage from '../Auth/Header/HeaderMoviePage';
import { getDetailMovieFromDB, getMovieWatch } from '../../services/movieService';
import { FormattedMessage, useIntl } from 'react-intl';
const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
function WatchTVPage(props) {
    const [movie, setMovie] = useState({})
    const [select, setSelect] = useState(false)
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const [played, setPlayed] = useState(2000)
    const [notiCont, setNotiCont] = useState(false)
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );
    const dispatch = useDispatch()
    const playerRefs = useRef();
    const { language, detailMovie, detailSeason } = useSelector(state => ({
        language: state.app.language,
        detailMovie: state.movie.detailsMovie,
        detailSeason: state.movie.detailSeason,
    }))
    const opts = {
        height: windowDimensions.width * 0.8 * 9 / 21,
        width: windowDimensions.width * 0.8,
        playerVars: {
            autoplay: 0,
        },
    };
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        dispatch(actions.fetchVideoMovie(props.match.params.id, language, 'tv'))
        dispatch(actions.fetchDetailMovie(props.match.params.id, language, 'tv'))
        dispatch(actions.fetchDetailSeason(props.match.params.idSeason, props.match.params.id, language))
        watchMovie()
    }, [language])
    useEffect(() => {
        getTimeWhenOut();
    }, [])
    const watchMovie = async () => {
        var slugify = require('slugify')
        const dMovie = await getDetailMovieFromDB(props.match.params.id, 'vi', 'tv')
        const slug = slugify(dMovie.name, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            locale: 'vi'    // language code of the locale to use
        })
        // console.log(slug);
        const moviefetch = await getMovieWatch(slug)
        // console.log(moviefetch.data)
        setMovie(moviefetch.data)
    }
    const getTimeWhenOut = () => {
        if (played > 0) {
            // console.log(played);
            setNotiCont(true)
        }
        if (played == 0) {
            setNotiCont(false)
        }

    }
    const hanldeYesCont = () => {
        playerRefs.current.seekTo(played, 'seconds')
        // playerRefs.current.
        setNotiCont(false)
    }
    const hanldeNoCont = () => {
        setPlayed(0)
        setNotiCont(false)
    }
    const handleEp = (ep) => {
        props.history.push(`/tv/94605/season/1/ep/${ep}`);
    }
    let year = new Date(detailMovie.release_date)
    const minutes = Math.floor(played / 60);
    const seconds = played - minutes * 60;
    // console.log('check movie: ', movie);

    return (
        <>
            <div className='container-watch-movie'>
                <HeaderMoviePage />
                <div className='body-watchMovie' >
                    <div className='movie'>
                        {movie && movie.episodes &&
                            <ReactPlayer
                                ref={playerRefs}
                                url={movie.episodes[0].server_data[props.match.params.ep - 1].link_m3u8}
                                height='auto'
                                width={opts.width}
                                controls={true}
                                autoplay={true}
                                playing={true}
                                onProgress={(progress) => {
                                    //
                                    // setPlayed(progress.playedSeconds.toFixed(0));
                                }}
                            />
                        }
                    </div>
                    <div className='content-down' style={{ width: opts.width }}>
                        <div className='list-ep'>
                            {detailSeason && detailSeason.episodes && detailSeason.episodes.length > 0 &&
                                detailSeason.episodes.map((item, index) => {
                                    return <div className={props.match.params.ep == item.episode_number ? 'btn-ep active' : 'btn-ep'}
                                        onClick={() => handleEp(item.episode_number)}
                                    >
                                        Tập {item.episode_number}
                                    </div>
                                })
                            }
                        </div>
                        <div className='original-title'><h1>{detailMovie.original_name} - {detailSeason.name}</h1></div>
                        <div className='sub-title'>
                            {detailMovie.name}{' '}
                            (<FormattedMessage id='dMoviePage.season' /> {detailSeason.season_number})
                            (<a href='#'>{new Date(detailSeason.air_date).getFullYear()}</a>)</div>
                        <div className='btn-list'>
                            <div className='btn-share'><i className="fab fa-facebook-square"></i>
                                <FormattedMessage id='dMoviePage.share' />
                            </div>
                            <div className='btn-addList'>
                                <i className="fas fa-plus"></i>  <FormattedMessage id='dMoviePage.watchlist' />
                            </div>
                        </div>
                        <div className='overview' style={{ width: opts.width * 0.8 }}>
                            {detailMovie.overview}
                        </div>
                        <div className='sub'>
                            <div className='s-title'><FormattedMessage id='wMovie.subtitle' /></div>
                            {movie && movie.episodes && movie.episodes.length > 0 &&
                                movie.episodes.map((item, index) => {
                                    return (
                                        <div className='s-content' style={{ width: opts.width * 0.4 }}>
                                            <div className='s-left'>
                                                <div className='icon-sub'><i className="far fa-closed-captioning"></i></div>
                                                <div className='s-name'>{item.server_name}</div>
                                            </div>
                                            <div className='s-btn'>
                                                {select === false ?
                                                    <div className='s-b-select btn-s' onClick={() => setSelect(!select)}>Chọn</div>
                                                    :
                                                    <div className='s-b-selected btn-s' onClick={() => setSelect(!select)}><i className="fas fa-check"></i></div>
                                                }
                                                <div className='s-b-like btn-s' onClick={() => { setLike(!like); setDislike(false) }}>
                                                    <i className={like ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
                                                </div>
                                                <div className='s-b-dislike btn-s' onClick={() => { setDislike(!dislike); setLike(false) }}>
                                                    <i className={dislike ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='comment'>
                            <div className='s-title'> <i className="far fa-comments"></i> <FormattedMessage id='wMovie.comment' /></div>
                            <div className='c-content' style={{ width: opts.width }}>
                                <div className='left' style={{ width: opts.width * 0.4 }}>
                                    <textarea placeholder={useIntl().formatMessage({ id: 'wMovie.enter-comment' })}></textarea>
                                    <div className='btn-send'><FormattedMessage id='wMovie.send' /></div>
                                </div>
                                <div className='right' style={{ width: opts.width * 0.55 }}>
                                    <div className='list-c'>
                                        <div className='logo-user'></div>
                                        <div className='c-text'>
                                            <div className='name'>peid</div>
                                            <div className='c-detail'>
                                                A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his
                                                homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.
                                            </div>
                                        </div>
                                    </div>
                                    <div className='list-c'>
                                        <div className='logo-user'></div>
                                        <div className='c-text'>
                                            <div className='name'>peid</div>
                                            <div className='c-detail'>
                                                A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his
                                                homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.
                                            </div>
                                        </div>
                                    </div>
                                    <div className='list-c'>
                                        <div className='logo-user'></div>
                                        <div className='c-text'>
                                            <div className='name'>peid</div>
                                            <div className='c-detail'>
                                                A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his
                                                homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={notiCont === true ? 'box-continue' : 'box-continue none'} >
                    <div className='title-cont'>
                        <FormattedMessage id='wMovie.continue' />{minutes} <FormattedMessage id='wMovie.minute' /> {seconds} <FormattedMessage id='wMovie.second' />!
                        <div className='out' onClick={() => hanldeNoCont()}>X</div>
                    </div>
                    <div className='l-btn'>
                        <div className='cont-yes' onClick={() => hanldeYesCont()}>
                            <FormattedMessage id='wMovie.yes' />
                        </div>
                        <div className='cont-no' onClick={() => hanldeNoCont()}>
                            <FormattedMessage id='wMovie.no' />
                        </div>
                    </div>
                </div>
            </div >
            <HomeFooter />
        </>
    )
}


export default withRouter(WatchTVPage);