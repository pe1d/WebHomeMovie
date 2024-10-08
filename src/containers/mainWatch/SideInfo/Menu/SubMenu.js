import React, { Component, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import './Menu.scss'
import './SubMenu.scss'
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../untils';
import { FormattedMessage } from 'react-intl';
function SubMenu(props) {
    const dispatch = useDispatch();

    return (
        <>
            <div className='menu'>
                <ul className="main-menu">
                    <li className="title-menu">
                        <ul className='sub-menu'>
                            <li className='sub-li active on'>
                                <div className='icon'>
                                    <i className="fas fa-home"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.home' />
                                </div>
                            </li>
                            <li className='sub-li on'>
                                <div className='icon'>
                                    <i className="fab fa-discourse icon"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.discover' />
                                </div>
                            </li>
                            <li className='sub-li on'>
                                <div className='icon'>
                                    <i className="fas fa-trophy"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.award' />
                                </div>
                            </li>
                            <li className='sub-li on'>
                                <div className='icon'>
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.celeb' />
                                </div>
                            </li>
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