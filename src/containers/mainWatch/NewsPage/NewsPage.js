import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
function NewsPage(props) {
    const [listNews, setListNews] = useState([])
    const dispatch = useDispatch();
    const { language } = useSelector((state) => ({
        language: state.app.language
    }))
    return (
        <>
            <div style={{color:'white',width:300}}>List News Movie</div>
        </>
    )
}


export default withRouter(NewsPage);