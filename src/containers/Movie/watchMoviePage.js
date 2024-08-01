import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './watchMoviePage.scss'
import * as actions from "../../store/actions";
import HomeFooter from '../HomePage/HomeFooter'
import { withRouter } from 'react-router';
import ReactPlayer from 'react-player';
import HeaderMoviePage from '../Auth/Header/HeaderMoviePage';
import { getDetailMovieFromDB, getMovieWatch } from '../../services/movieService';
import { FormattedMessage } from 'react-intl';
const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
function WatchMoviePage(props) {
    const [movie, setMovie] = useState({})
    const [select, setSelect] = useState(false)
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );
    const dispatch = useDispatch()
    const { language, detailMovie } = useSelector(state => ({
        language: state.app.language,
        detailMovie: state.movie.detailsMovie,
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
        dispatch(actions.fetchVideoMovie(props.match.params.id, language, 'movie'))
        dispatch(actions.fetchDetailMovie(props.match.params.id, language, 'movie'))
        watchMovie()
    }, [language])
    const watchMovie = async () => {
        var slugify = require('slugify')
        const dMovie = await getDetailMovieFromDB(props.match.params.id, 'vi', 'movie')
        const slug = slugify(dMovie.title, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            locale: 'vi'    // language code of the locale to use
        })
        console.log(slug);
        const moviefetch = await getMovieWatch(slug)
        console.log(moviefetch.data)
        setMovie(moviefetch.data)
    }
    let year = new Date(detailMovie.release_date)
    return (
        <>
            {console.log(movie)}
            <div className='container-watch-movie'>
                <HeaderMoviePage />
                <div className='body-watchMovie' >
                    <div className='movie'>
                        {movie && movie.episodes &&
                            <ReactPlayer
                                url={movie.episodes[0].server_data[0].link_m3u8}
                                height='auto'
                                width={opts.width}
                                controls={true}
                                autoplay={true}
                                playing={true}
                            />
                        }
                    </div>
                    <div className='content-down' style={{ width: opts.width }}>
                        <div className='original-title'><h1>{detailMovie.original_title}</h1></div>
                        <div className='sub-title'>{detailMovie.title} (<a href='#'>{year.getFullYear()}</a>)</div>
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
                            <div className='s-title'>Phụ đề</div>
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
                            <div className='s-title'> <i className="far fa-comments"></i> Đánh giá phim</div>
                            <div className='c-content' style={{ width: opts.width }}>
                                <div className='left' style={{ width: opts.width * 0.4 }}>
                                    <textarea placeholder='Nhập bình luận .......'></textarea>
                                    <div className='btn-send'>Gửi</div>
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

            </div >
            <HomeFooter />
        </>
    )
}


export default withRouter(WatchMoviePage);