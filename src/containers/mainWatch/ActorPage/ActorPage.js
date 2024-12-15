import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './ActorPage.scss'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { fetchListActor } from '../../../services/actorService'
function ActorPage(props) {
    const [listActor, setListActor] = useState([])
    const dispatch = useDispatch();
    const { language } = useSelector((state) => ({
        language: state.app.language
    }))
    useEffect(async () => {
        const actor = await fetchListActor(language, 1)
        setListActor(actor);
    }, [language])
    console.log(listActor);

    return (
        <>

        </>
    )
}


export default withRouter(ActorPage);