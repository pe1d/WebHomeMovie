import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './Main.scss'
import * as actions from "../../../store/actions";
import SideInfo from '../SideInfo/SideInfo';
import ListMain from '../ListMain/ListMain';
import SideWatch from '../SideWatch/SideWatch';
import HeaderMoviePage from '../../Auth/Header/HeaderMoviePage.js';
import DiscoverPage from '../DiscoverPage/DiscoverPage.js';
import ActorPage from '../ActorPage/ActorPage.js';
import NewsPage from '../NewsPage/NewsPage.js';
import { subMenu } from '../SideInfo/Menu/constant/contanst.js';
function Main(props) {
    const { side, language, activeSubMenu } = useSelector(state => (
        {
            side: state.app.side,
            language: state.app.language,
            activeSubMenu: state.app.activeSubMenu,
        }
    ))
    const dispatch = useDispatch();    
    return (
        <>
            <div className='container-main bg-main'>
                <HeaderMoviePage />
                <div className='body-main'>
                    <div className='side1 bg-side' >
                        <SideInfo />
                    </div>
                    <div className='content-main bg-main'>
                        {activeSubMenu === subMenu.MAIN && <ListMain />}
                        {activeSubMenu === subMenu.DISCOVER && <DiscoverPage />}
                        {activeSubMenu === subMenu.NEWS && <NewsPage/>}
                        {activeSubMenu === subMenu.ACTOR && <ActorPage />}
                    </div>
                    <div className='side2 bg-side'>
                        <SideWatch />
                    </div>
                </div>
            </div >
        </>
    )
}


export default Main;