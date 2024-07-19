import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Menu.scss'
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../untils';
import { FormattedMessage } from 'react-intl';
function Menu(props) {
    return (
        <>
            <div className='menu'>
                <ul className="main-menu ps-4">
                    <li className="title-menu">
                        <FormattedMessage id='sider-info.menu' />
                        <ul className='sub-menu'>
                            <li className='sub-li active'>
                                <div className='icon'>
                                    <i className="fas fa-home"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.home' />
                                </div>
                            </li>
                            <li className='sub-li'>
                                <div className='icon'>
                                    <i className="fab fa-discourse icon"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.discover' />
                                </div>
                            </li>
                            <li className='sub-li'>
                                <div className='icon'>
                                    <i className="fas fa-trophy"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.award' />
                                </div>
                            </li>
                            <li className='sub-li'>
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
                        <FormattedMessage id='sider-info.library' />
                        <ul className='sub-menu'>
                            <li className='sub-li'>
                                <div className="icon"  >
                                    <i className="fas fa-history"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.recent' />
                                </div>
                            </li>
                            <li className='sub-li'>
                                <div className="icon"  >
                                    <i className="fas fa-star"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.top-rated' />
                                </div>
                            </li>
                            <li className='sub-li'>
                                <div className="icon"  >
                                    <i className="fas fa-cloud-download-alt"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.download' />
                                </div>
                            </li>
                            <li className='sub-li'>
                                <div className="icon"  >
                                    <i className="fas fa-heart"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.playlist' />
                                </div>
                            </li>
                            <li className='sub-li'>
                                <div className="icon"  >
                                    <i className="fas fa-plus-square"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.watchlist' />
                                </div>
                            </li>
                            <li className='sub-li'>
                                <div className="icon"  >
                                    <i className="fas fa-check-square"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.completed' />
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className="title-menu">
                        <FormattedMessage id='sider-info.general' />
                        <ul className='sub-menu'>
                            <li className='sub-li'>
                                <div className="icon"  >
                                    <i className="fas fa-cog"></i>
                                </div>
                                <div className='text'>
                                    <FormattedMessage id='sider-info.settings' />
                                </div>
                            </li>
                            <li className='sub-li' onClick={props.processLogout}>
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
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);