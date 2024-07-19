import React, { Component, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './cslGenres.scss'
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../untils';
import { FormattedMessage } from 'react-intl';

function CslGenres(props) {
    // const [dataGenres, setDataGenres] = useState([])
    const [position, setPosition] = useState(1);
    const genresMovie = props.genresMovie.genres;
    const fetchGenresMovie = () => {
        props.fetchGenresMovie(props.language);
    }
    useEffect(() => {
        fetchGenresMovie()
    }, []);
    useEffect(() => {
        fetchGenresMovie()
    }, [props.language]);
    return (
        <>
            <div className='csl-genres'>
                <div className='title-body'>
                    <div className='p1'>
                        <FormattedMessage id='sider-watch.genres' />
                        <i
                            class={position && position === 1 ?
                                "fas fa-chevron-left disable"
                                :
                                "fas fa-chevron-left "
                            }
                            onClick={() => setPosition(position - 1)}
                        >
                        </i>
                        <i class={position && position - 9 === 0 ?
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
                <div className='genres-detail' style={{ top: '40px', left: `${-200 * position + 200}px` }}>
                    {genresMovie && genresMovie.length > 0 &&
                        genresMovie.slice(0, 9).map((item, index) => {
                            return (
                                <>
                                    <div className='details-genres' style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg)' }}>
                                        <div className='name-genres'>
                                            {item.name}
                                        </div>
                                    </div >
                                </>
                            )
                        })
                    }
                </div>
                <div className='genres-detail' style={{ top: '170px', left: `${-200 * position + 200}px` }}>
                    {genresMovie && genresMovie.length > 0 &&
                        genresMovie.slice(10, 18).map((item, index) => {
                            return (
                                <>
                                    <div className='details-genres' style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg)' }}>
                                        <div className='name-genres'>
                                            {item.name}
                                        </div>
                                    </div >
                                </>
                            )
                        })
                    }
                </div>
            </div >
        </>
    )
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genresMovie: state.movie.genresMovie
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenresMovie: (language) => dispatch(actions.fetchGenresMovie(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CslGenres);