import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './SideWatch.scss'
import * as actions from "../../../store/actions";
import HeaderSW from './Header/HeaderSW';
import BodySW from './Body/bodySW';

function SideWatch(props) {
    return (
        <>
            <div className='container-side-left'>
                <div className='csl-body'>
                    <BodySW />
                </div>
            </div >
        </>
    )
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideWatch);