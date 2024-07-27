import React, { Component, Fragment, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './cslTopRated.scss'
import * as actions from "../../../../store/actions";
import StarRatings from 'react-star-ratings';
import { LANGUAGES } from '../../../../untils';
import { getMoviesFromDB } from '../../../../services/movieService';
import { FormattedMessage } from 'react-intl';

function CslTopRated(props) {
    const [dataTopRatedMovie, setDataTopRatedMovie] = useState([])
    const [position, setPosition] = useState(1)
    const { typeMovie, language } = useSelector(state => (
        {
            typeMovie: state.movie.typeMovie,
            language: state.app.language
        }
    ))
    const dispatch = useDispatch()
    const fetchMovieList = async () => {
        let movieList = await getMoviesFromDB(typeMovie, props.typeSort, props.page, language, props.year);
        setDataTopRatedMovie(movieList)
    }
    useEffect(() => {
        fetchMovieList()
    }, [language, typeMovie]);
    return (
        <>
            <div className='csl-top-rated'>
                <div className='title-body'>
                    <div className='p1'>
                        <FormattedMessage id='sider-watch.top-rated' />
                        <i
                            class={position && position === 1 ?
                                "fas fa-chevron-left disable"
                                :
                                "fas fa-chevron-left "
                            }
                            onClick={() => setPosition(position - 1)}
                        >
                        </i>
                        <i class={position && position * 2 - dataTopRatedMovie.length === 0 ?
                            "fas fa-chevron-right disable"
                            :
                            "fas fa-chevron-right "
                        }
                            onClick={() => setPosition(position + 1)}
                        >
                        </i>
                    </div>
                    <div className='p2'>
                        <FormattedMessage id='sider-watch.see-more' />
                        <i className="far fa-eye"></i>
                    </div>
                </div>
                <div className='cont-detail' style={{ left: `${-200 * position + 200}px` }}>
                    {dataTopRatedMovie && dataTopRatedMovie.length > 0 &&
                        dataTopRatedMovie.map((item, index) => {
                            if (index < 10) {
                                return (
                                    <>
                                        <div className='details-m-cont' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }}>
                                            <div className='title-m'>
                                                <div className='name-movie'>
                                                    {item.title || item.name}
                                                </div>
                                                <StarRatings
                                                    rating={5}
                                                    starDimension="16px"
                                                    starSpacing="2px"
                                                    starRatedColor="#07b8a0"
                                                />
                                            </div>
                                            <div className='btn-list'>
                                                <div className='btn-drop'><i className="fas fa-plus"></i></div>
                                                <div className='btn-watch' onClick={() => props.hanldeWatchMovie(item.id)}><FormattedMessage id='sider-watch.watch' /></div>
                                            </div>
                                        </div >
                                    </>
                                )
                            }
                        })
                    }
                </div>
            </div >
        </>
    )
}
export default CslTopRated;