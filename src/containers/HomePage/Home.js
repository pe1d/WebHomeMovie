import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function Home(props) {
    const { isLoggedIn } = props;
    let linkToRedirect = isLoggedIn ? '/home' : '/about';
    return (
        <Redirect to={linkToRedirect} />
    );
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);