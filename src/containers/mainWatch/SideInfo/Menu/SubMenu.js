import React, { Component, Fragment } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './Menu.scss'
import './SubMenu.scss'
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../untils';
import { FormattedMessage } from 'react-intl';
import { subMenu } from './constant/contanst';
function SubMenu(props) {
    const menu = [
        {key:subMenu.MAIN ,logo: 'fas fa-home', text: 'sider-info.home' },
        {key:subMenu.DISCOVER, logo: 'fab fa-discourse icon', text: 'sider-info.discover' },
        {key:subMenu.NEWS, logo: 'fas fa-trophy', text: 'sider-info.news' },
        {key:subMenu.ACTOR, logo: 'fas fa-user', text: 'sider-info.celeb' },
    ]
    const { activeSubMenu } = useSelector(state => ({
        activeSubMenu: state.app.activeSubMenu,
    }))
    const dispatch = useDispatch();
    const handleClickSubMenu = (index) => {
        dispatch(actions.setSubActive(index))
    }
    // console.log("check active", activeSubMenu);
    return (
        <>
            <div className='menu'>
                <ul className="main-menu">
                    <li className="title-menu">
                        <ul className='sub-menu'>
                            {menu && menu.length > 0 &&
                                menu.map((item, index) => {
                                    return (
                                        <li className={activeSubMenu === index ? 'sub-li on active' : 'sub-li on'} key={item.key} onClick={() => handleClickSubMenu(item.key)}>
                                            <div className='icon'>
                                                <i className={item.logo}></i>
                                            </div>
                                            <div className='text'>
                                                <FormattedMessage id={item.text} />
                                            </div>
                                        </li>
                                    )

                                })
                            }
                        </ul>
                    </li>
                    <li className="title-menu">
                        {/* <FormattedMessage id='sider-info.general' /> */}
                        <ul className='sub-menu'>
                            <li className='sub-li on'>
                                <div className="icon"  >
                                    <i className="fas fa-cog"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.settings' />
                                </div>
                            </li>
                            <li className='sub-li on' onClick={() => dispatch(actions.processLogout())}>
                                <div className="icon"  >
                                    <i className="fas fa-sign-out-alt"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.logout' />
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    )
}


export default SubMenu;