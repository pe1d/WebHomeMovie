import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Loading.scss'
import * as actions from "../../store/actions";
import { LANGUAGES } from '../../untils'
import { FormattedMessage } from 'react-intl';
function Loading(props) {
    const { language } = useSelector(state => ({
        language: state.app.language,
    }));
    const dispatch = useDispatch()
    return (
        <>

        </>
    )
}


export default Loading;