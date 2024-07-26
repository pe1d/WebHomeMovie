import React, { Component, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './SideInfo.scss'
import * as actions from "../../../store/actions";
import '../../Auth/About.scss'
import Menu from './Menu/Menu';
import SubMenu from './Menu/SubMenu';
function SideInfo(props) {
    return (
        <>
            <div className='container-side-right'>
                {props.side == false ?
                    <SubMenu />
                    :
                    <Menu />
                }
            </div>
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
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideInfo);