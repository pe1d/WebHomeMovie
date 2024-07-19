import React, { Component, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './contentSlider.scss'
import * as actions from "../store/actions";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import StarRatings from 'react-star-ratings';
import { getMoviesFromDB } from '../services/movieService';
// class contentSilder extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             listMovie: [],
//             favor: false,
//         }
//     }
//     componentDidMount() {
//         this.fetchMovieList()
//     }
//     componentDidUpdate = async (prevProps, prevState, snapshot) => {
//         if (this.props.language !== prevProps.language) {
//             this.fetchMovieList()
//         }
//     }
//     fetchMovieList = async () => {
//         let movieList = await getMoviesFromDB(this.props.typeSort, this.props.page, this.props.language, this.props.year);
//         this.setState({
//             listMovie: movieList
//         })
//     }
//     render() {
//         var settings = {
//             speed: 500,
//             slidesToShow: 5,
//             slidesToScroll: 5,
//             arrows: false,
//             responsive: [
//                 {
//                     breakpoint: 1680,
//                     settings: {
//                         slidesToShow: 4,
//                         slidesToScroll: 4,
//                     }
//                 },
//                 {
//                     breakpoint: 1400,
//                     settings: {
//                         slidesToShow: 3,
//                         slidesToScroll: 3,
//                     }
//                 },
//                 {
//                     breakpoint: 1040,
//                     settings: {
//                         slidesToShow: 2,
//                         slidesToScroll: 2,
//                     }
//                 },
//             ]
//         };
//         let { listMovie, favor } = this.state
//         // console.log(this.state);
//         return (
//             <>
//                 <div className='content-list-main'>
//                     <div className='name-section-movie'><FormattedMessage id={this.props.idName} /></div>
//                     <Slider {...settings}>
//                         {listMovie && listMovie.length > 0 &&
//                             listMovie.map((item, index) => {
//                                 if (index < 10)
//                                     return (
//                                         <div>
//                                             <div className='section-movie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }} key={index}>
//                                                 <div className='content-up'>
//                                                     <div className='name-film'>{item.title}</div>
//                                                     <div className='vote-average'>
//                                                         <StarRatings
//                                                             rating={item.vote_average / 2}
//                                                             starDimension="18px"
//                                                             starSpacing="2px"
//                                                             starRatedColor="#07b8a0"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className='content-down'>
//                                                     <div className='favorites-list'>
//                                                         {favor === false ?
//                                                             <i class="far fa-heart"></i>
//                                                             :
//                                                             <i class="fas fa-heart"></i>
//                                                         }
//                                                     </div>
//                                                     <div className='watch-now' onClick={() => this.props.hanldeWatchMovie(item.id)}>
//                                                         <FormattedMessage id='main.banner.btn-watch' />
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     )
//                             })
//                         }
//                     </Slider>
//                 </div>
//             </>
//         )
//     }
// }
function ContentSilder(props) {
    const [listMovie, setListMovie] = useState([])
    const [favor, setFavor] = useState(false)
    var settings = {
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false,
        responsive: [
            {
                breakpoint: 1680,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1040,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
        ]
    };
    const fetchMovieList = async () => {
        let movieList = await getMoviesFromDB(props.typeSort, props.page, props.language, props.year);
        setListMovie(movieList)
    }
    useEffect(() => {
        fetchMovieList()
    }, []);
    useEffect(() => {
        fetchMovieList()
    }, [props.language]);
    return (
        <>
            <div className='content-list-main'>
                <div className='name-section-movie'><FormattedMessage id={props.idName} /></div>
                <Slider {...settings}>
                    {listMovie && listMovie.length > 0 &&
                        listMovie.map((item, index) => {
                            if (index < 10)
                                return (
                                    <div>
                                        <div className='section-movie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }} key={index}>
                                            <div className='content-up'>
                                                <div className='name-film'>{item.title}</div>
                                                <div className='vote-average'>
                                                    <StarRatings
                                                        rating={item.vote_average / 2}
                                                        starDimension="18px"
                                                        starSpacing="2px"
                                                        starRatedColor="#07b8a0"
                                                    />
                                                </div>
                                            </div>
                                            <div className='content-down'>
                                                <div className='favorites-list'>
                                                    {favor === false ?
                                                        <i class="far fa-heart"></i>
                                                        :
                                                        <i class="fas fa-heart"></i>
                                                    }
                                                </div>
                                                <div className='watch-now' onClick={() => props.hanldeWatchMovie(item.id)}>
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
        </>
    )
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMovie: (typeSort, page, language, year) => dispatch(actions.fetchMovie(typeSort, page, language, year)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentSilder);