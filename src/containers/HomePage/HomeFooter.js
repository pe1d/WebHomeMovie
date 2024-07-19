import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss'
import { FormattedMessage } from 'react-intl';
function HomeFooter(props) {
    return (
        <>
            <div className='home-footer'>
                <p>&copy;<FormattedMessage id='footer.title' /></p>
                <a target='blank' href='https://github.com/pe1d'>&#8594; <FormattedMessage id='footer.sub' /> &#8592;</a>
            </div>
        </>
    );
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
