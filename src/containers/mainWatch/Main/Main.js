import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './Main.scss'
import * as actions from "../../../store/actions";
import SideInfo from '../SideInfo/SideInfo';
import ListMain from '../ListMain/ListMain';
import SideWatch from '../SideWatch/SideWatch';
import HeaderMoviePage from '../../Auth/Header/HeaderMoviePage.js';
function Main(props) {
    const { side, language } = useSelector(state => (
        {
            side: state.app.side,
            language: state.app.language,
        }
    ))
    const dispatch = useDispatch()
    useEffect(() => {
        return () => document.documentElement.classList.remove('off-scroll');
    })
    useEffect(() => {
        dispatch(actions.setSideInfo(false))
    }, [])
    return (
        <>
            <div className='container-main bg-main'>
                <HeaderMoviePage />
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


export default Main;