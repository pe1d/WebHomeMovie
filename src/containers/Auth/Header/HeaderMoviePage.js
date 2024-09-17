import { connect, useDispatch, useSelector } from 'react-redux';

import './HeaderMoviePage.scss'
import { useEffect, useRef, useState } from 'react';
import { LANGUAGES } from '../../../untils';
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router';
import HeaderSW from '../../mainWatch/SideWatch/Header/HeaderSW';
import { FormattedMessage, useIntl } from 'react-intl';
import Menu from '../../mainWatch/SideInfo/Menu/Menu';
import { getMovieSearch } from '../../../services/movieService';
import StarRatings from 'react-star-ratings';
function HeaderMoviePage(props) {
    const [user, setUser] = useState({
        userName: '',
        avatar: ''
    })
    const [background, setBackground] = useState('headerMoviePage');
    const { side, language, typeMovie } = useSelector(state => (
        {
            side: state.app.side,
            language: state.app.language,
            typeMovie: state.movie.typeMovie
        }
    ))
    const [search, setSearch] = useState("");
    const [searchList, setSearchList] = useState({});
    const dispatch = useDispatch()
    useEffect(() => {
        document.body.style.overflow = side ? 'hidden' : 'scroll';
    }, [side])
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 80) {
                setBackground('headerMoviePage bg-solid')
            } else {
                setBackground('headerMoviePage')
            }
        }
        window.addEventListener('scroll', handleScroll, true)
        return () => window.removeEventListener('scroll', handleScroll, true)
    }, [])
    useEffect(async () => {
        // console.log(search);
        if (search !== "") {
            const searchList = await getMovieSearch(search, language);
            console.log(searchList);
            setSearchList(searchList);
        }
        // console.log(search);
    }, [search])
    const handleBackHome = () => {
        dispatch(actions.setSideInfo(false))
        props.history.push('/home')
    }
    const handleBackHomeAndChangeType = (typeMovieChange) => {
        // console.log(typeMovie);
        dispatch(actions.setTypeMovie(typeMovieChange))
        window.scrollTo(0, 0)
        handleBackHome()
    }
    const getScrollY = () => {
        return window.screenY
    }
    const hanldeWatchMovie = (id, type) => {
        // alert('Movie id: ' + id)
        props.history.push(`/${type}/${id}`)
    }
    return (
        <>
            <div className={background}>
                <div className='content-left'>
                    <div className='btn-menu col-1' onClick={() => dispatch(actions.setSideInfo(!side))} >
                        <i className="fas fa-bars"></i>
                    </div>
                    <div className='name-brand col-4' onClick={() => handleBackHome()}>
                    </div>
                </div>
                <div className='content-center'>
                    <div className='menu-movie'>
                        <div className='name-menu' onClick={() => handleBackHome()}>
                            <FormattedMessage id='main.header.home' />
                        </div>
                        <div className='name-menu'>
                            <FormattedMessage id='main.header.popular-movie' />
                        </div>
                        <div className='name-menu' onClick={() => handleBackHomeAndChangeType('tv')}>
                            <FormattedMessage id='main.header.tv-series' />
                        </div>
                        <div className='name-menu' onClick={() => handleBackHomeAndChangeType('movie')}>
                            <FormattedMessage id='main.header.movie' />
                        </div>
                    </div>
                    <div className='content-2'>
                        <div className='languages' style={{ width: '60px', height: '30px' }}>
                            <div className={language === LANGUAGES.VI ? 'lang-vi active' : 'lang-vi'}>
                                <span onClick={() => dispatch(actions.changeLanguageApp(LANGUAGES.VI))}>VI</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'lang-en active' : 'lang-en'}>
                                <span onClick={() => dispatch(actions.changeLanguageApp(LANGUAGES.EN))}>EN</span>
                            </div>
                        </div>
                        <div className='header-search'>
                            <i class="fa fa-search"></i>
                            <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} className="form-control form-input" placeholder={useIntl().formatMessage({ id: 'main.header.search' })} />
                            <span className="left-pan"><i class="fa fa-microphone"></i></span>
                            <div className={search === "" ? 'box-search none' : 'box-search'}>
                                {searchList && searchList.results && searchList.results.length > 0 &&
                                    searchList.results.map((item, index) => {
                                        const vote_average = item.vote_average / 2;
                                        if (vote_average !== NaN) {
                                            return (
                                                <div className='section-search' onClick={() => hanldeWatchMovie(item.id, item.media_type)}>
                                                    {!item.poster_path ?
                                                        <div className='non-logo'>
                                                            <i className="fas fa-image"></i>
                                                        </div>
                                                        :
                                                        <div className='logo' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }}>
                                                        </div>
                                                    }
                                                    <div className='info-movie'>
                                                        <div className='title-i'>
                                                            {item.title && item.title.length > 38 ? `${item.title.substring(0, 38)}...` : item.title}
                                                            {item.name && item.name.length > 38 ? `${item.name.substring(0, 38)}...` : item.name}
                                                        </div>
                                                        {/* <div className='check'> {vote_average}</div> */}
                                                        {vote_average && vote_average != NaN &&
                                                            <StarRatings
                                                                rating={vote_average}
                                                                starDimension="20px"
                                                                starSpacing="2px"
                                                                starRatedColor="#07b8a0"
                                                            />
                                                        }
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
                <div className='content-right'>
                    <HeaderSW />
                </div>
            </div>
            {
                side === true &&
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
        </>
    )
}

export default withRouter(HeaderMoviePage);