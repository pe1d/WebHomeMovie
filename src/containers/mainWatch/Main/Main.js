import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import './Main.scss'
import * as actions from "../../../store/actions";
import SideInfo from '../SideInfo/SideInfo';
import ListMain from '../ListMain/ListMain';
import SideWatch from '../SideWatch/SideWatch';
import { Scrollbars } from 'react-custom-scrollbars';
import { LANGUAGES } from '../../../untils';
import { FormattedMessage } from 'react-intl';
import HeaderSW from '../SideWatch/Header/HeaderSW.js';
import HeaderMoviePage from '../../Auth/Header/HeaderMoviePage.js';
function Main(props) {
    const [header, setHeader] = useState('header-main')
    const styleOn = {
        width: '5%'
    }
    const styleOff = {
        width: '10%'
    }
    const handleScroll = () => {
        if (window.scrollY > 80) {
            setHeader('header-main bg-solid')
        } else {
            setHeader('header-main')
        }
    }
    useState(() => {
        window.addEventListener('scroll', handleScroll, true)
        return () => { window.removeEventListener('scroll', handleScroll, true) }
    }, [])
    const { side } = props
    return (
        <>
            <div className='container-main bg-main'>
                <HeaderMoviePage
                />
                <div className='body-main'>
                    <div className={side == false ? 'side1 bg-side' : 'side1 bg-side on-side'} >
                        <SideInfo />
                    </div>
                    <div className={side == false ? 'content-main bg-main' : 'content-main bg-main on-side-main'}>
                        <ListMain />
                    </div>
                    <div className='side2 bg-side'>
                        <SideWatch />
                    </div>
                </div>
            </div >
        </>
    )
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        side: state.app.side
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);