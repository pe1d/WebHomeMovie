import React, { Component, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './watchMoviePage.scss'
import * as actions from "../../store/actions";
import HomeFooter from '../HomePage/HomeFooter'
import { withRouter } from 'react-router';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';
import HeaderMoviePage from '../Auth/Header/HeaderMoviePage';
const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
const Player = (vid) => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const opts = {
        height: windowDimensions.width * 0.7 * 9 / 16,
        width: windowDimensions.width * 0.7,
        playerVars: {
            autoplay: 0,
        },
    };
    return (
        <>
            {/* width:{windowDimensions.width} height: {windowDimensions.height} */}
            {vid && vid.key &&
                // <YouTube
                //     videoId={vid.key}
                //     opts={opts}
                // />
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${vid.key}`}
                    height={opts.height}
                    width={opts.width}
                    controls={true}
                    muted={true}
                />
            }
        </>
    )
}
function WatchMoviePage(props) {
    const [vid, setVid] = useState({})
    useEffect(() => {
        props.fetchVideoMovie(props.match.params.id, props.language)
    }, [])
    useEffect(() => {
        props.fetchVideoMovie(props.match.params.id, props.language)
    }, [props.language])
    let { videoMovie } = props;
    const rederTrailer = () => {
        console.log(props);
        if (videoMovie) {
            let trailer = videoMovie.find(vid => vid.name.toLowerCase().includes("trailer") === true)
            return trailer
        }
    }
    useEffect(() => {
        const trailer = rederTrailer()
        setVid(trailer)
    }, [videoMovie])

    return (
        <>
            <div className='container-watch-movie'>
                <HeaderMoviePage />
                <div className='body-watchMovie'>
                    {Player(vid)}
                </div>
                <HomeFooter />
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailMovie: state.movie.detailsMovie,
        videoMovie: state.movie.videoMovie,
        creditMovie: state.movie.creditMovie,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        fetchDetailMovie: (id, language) => dispatch(actions.fetchDetailMovie(id, language)),
        fetchVideoMovie: (id, language) => dispatch(actions.fetchVideoMovie(id, language)),
        fetchCreditMovie: (id, language) => dispatch(actions.fetchCreditMovie(id, language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WatchMoviePage));